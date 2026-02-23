from fastapi import APIRouter, Depends, HTTPException
from app.auth import get_current_user, db
from firebase_admin import firestore
from datetime import datetime
from uuid import uuid4

router = APIRouter()

@router.post("/")
async def create_job(job: dict, user=Depends(get_current_user)):
    title = job.get("title", "").strip()
    company = job.get("company", "").strip()

    if not title or not company:
        raise HTTPException(status_code=400, detail="Job title and company are required")

    # 🔍 Check if job already exists globally (by title + company)
    existing_query = (
        db.collection("jobs")
        .where("title", "==", title)
        .where("company", "==", company)
        .limit(1)
        .get()
    )

    existing_job = existing_query[0] if existing_query else None

    if existing_job:
        job_id = existing_job.id
        job_data = existing_job.to_dict()
    else:
        # 🆕 Create a new global job document
        job_id = str(uuid4())
        job_data = {
            "id": job_id,
            "title": title,
            "company": company,
            "link": job.get("link", ""),
            "tags": job.get("tags", []),
            "description": job.get("description", ""),
            "createdAt": datetime.utcnow().isoformat(),
            "createdBy": user["uid"],
            "trackerCount": 0,
        }
        db.collection("jobs").document(job_id).set(job_data)

    # 🔄 Check if user already has this job saved
    user_jobs_ref = db.collection("users").document(user["uid"]).collection("jobs")
    existing_user_jobs = user_jobs_ref.where("jobId", "==", job_id).limit(1).get()

    if existing_user_jobs:
        doc = existing_user_jobs[0]
        return {
            **job_data,
            **doc.to_dict(),
            "userJobDocId": doc.id
        }

    # 🗂 Create a new user-specific job reference
    user_job_data = {
        "jobId": job_id,
        "status": job.get("status", "saved"),
        "notes": job.get("notes", ""),
        "appliedDate": job.get("appliedDate", None),
        "createdAt": datetime.utcnow().isoformat(),
        "updatedAt": datetime.utcnow().isoformat(),
    }

    new_user_job_ref = user_jobs_ref.document()
    new_user_job_ref.set(user_job_data)

    db.collection("jobs").document(job_id).update({
    "trackerCount": firestore.Increment(1)
    })

    return {
        **job_data,
        **user_job_data,
        "userJobDocId": new_user_job_ref.id
    }

@router.get("/")
async def list_jobs(user=Depends(get_current_user)):
    # Get all user's job references
    user_jobs_ref = db.collection("users").document(user["uid"]).collection("jobs").stream()
    user_jobs_list = [(doc.id, doc.to_dict()) for doc in user_jobs_ref]
    
    if not user_jobs_list:
        return []
    
    # Fetch all corresponding job details
    jobs_data = []
    
    for doc_id, user_job_info in user_jobs_list:
        job_id = user_job_info.get("jobId")
        if not job_id:
            continue
            
        job_ref = db.collection("jobs").document(job_id).get()
        if job_ref.exists:
            job_details = job_ref.to_dict()
            jobs_data.append({
                **job_details, 
                **user_job_info,
                "userJobDocId": doc_id  # Include this for updates/deletes
            })
    
    return jobs_data


@router.patch("/{user_job_doc_id}")
async def update_job(user_job_doc_id: str, updates: dict, user=Depends(get_current_user)):
    user_ref = db.collection("users").document(user["uid"]).collection("jobs").document(user_job_doc_id)
    user_doc = user_ref.get()

    if not user_doc.exists:
        raise HTTPException(status_code=404, detail="Job not found")

    user_job_data = user_doc.to_dict()
    job_id = user_job_data.get("jobId")

    if not job_id:
        raise HTTPException(status_code=400, detail="Invalid job reference")

    # -------- Split updates --------
    user_allowed = {"status", "notes", "appliedDate"}
    job_allowed = {"description"}

    user_updates = {k: v for k, v in updates.items() if k in user_allowed}
    job_updates = {k: v for k, v in updates.items() if k in job_allowed}

    # -------- Update user fields --------
    if user_updates:
        user_updates["updatedAt"] = datetime.utcnow().isoformat()
        user_ref.update(user_updates)

    # -------- Update global job fields --------
    if job_updates:
        db.collection("jobs").document(job_id).update(job_updates)

    # -------- Return merged data --------
    updated_user_data = user_ref.get().to_dict()
    job_ref = db.collection("jobs").document(job_id).get()

    if job_ref.exists:
        return {
            **job_ref.to_dict(),
            **updated_user_data,
            "userJobDocId": user_job_doc_id
        }

    return {
        **updated_user_data,
        "userJobDocId": user_job_doc_id
    }
@router.delete("/{user_job_doc_id}")
async def delete_job(user_job_doc_id: str, user=Depends(get_current_user)):
    user_job_ref = db.collection("users").document(user["uid"]).collection("jobs").document(user_job_doc_id)
    doc = user_job_ref.get()

    if not doc.exists:
        raise HTTPException(status_code=404, detail="Job not found")

    job_id = doc.to_dict().get("jobId")

    # Delete user reference
    user_job_ref.delete()

    # Decrement tracker count
    if job_id :
        db.collection("jobs").document(job_id).update({
            "trackerCount": firestore.Increment(-1)
        })

    return {"success": True}

@router.get("/browse")
async def browse_jobs(user=Depends(get_current_user)):
    """
    Returns all global jobs in the database.
    Does NOT include user-specific status.
    """

    jobs_ref = db.collection("jobs").stream()

    jobs = []

    for doc in jobs_ref:
        job_data = doc.to_dict()
        jobs.append(job_data)

    return jobs

@router.get("/{job_id}")
async def get_job_details(job_id: str, user=Depends(get_current_user)):
    job_ref = db.collection("jobs").document(job_id).get()

    if not job_ref.exists:
        raise HTTPException(status_code=404, detail="Job not found")

    job_data = job_ref.to_dict()

    # Check if current user has this job tracked
    user_jobs_ref = (
        db.collection("users")
        .document(user["uid"])
        .collection("jobs")
        .where("jobId", "==", job_id)
        .limit(1)
        .get()
    )

    if user_jobs_ref:
        user_job_doc = user_jobs_ref[0]
        return {
            **job_data,
            **user_job_doc.to_dict(),
            "userJobDocId": user_job_doc.id
        }

    return job_data