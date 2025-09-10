# backend/app/routers/jobs.py
from fastapi import APIRouter, Depends, HTTPException
from app.auth import get_current_user, db
from datetime import datetime
from uuid import uuid4

router = APIRouter()

@router.post("/")
async def create_job(job: dict, user=Depends(get_current_user)):
    job_id = str(uuid4())

    # Global job details
    job_data = {
        "id": job_id,
        "title": job.get("title", ""),
        "company": job.get("company", ""),
        "link": job.get("link", ""),
        "tags": job.get("tags", []),
        "createdAt": datetime.utcnow().isoformat(),
        "createdBy": user["uid"],
    }
    db.collection("jobs").document(job_id).set(job_data)

    # User-specific job entry
    user_job_data = {
        "jobId": job_id,
        "status": job.get("status", "saved"),
        "notes": job.get("notes", ""),
        "appliedDate": job.get("appliedDate", None),
        "createdAt": datetime.utcnow().isoformat(),
        "updatedAt": datetime.utcnow().isoformat(),
    }
    db.collection("users").document(user["uid"]).collection("jobs").document(job_id).set(user_job_data)
    return {**job_data, **user_job_data}



@router.get("/")
async def list_jobs(user=Depends(get_current_user)):
    user_jobs_ref = db.collection("users").document(user["uid"]).collection("jobs").stream()
    user_jobs = [doc.to_dict() for doc in user_jobs_ref]

    jobs_data = []
    for uj in user_jobs:
        job_ref = db.collection("jobs").document(uj["jobId"]).get()
        if job_ref.exists:
            jobs_data.append({**job_ref.to_dict(), **uj})

    return jobs_data


@router.patch("/{job_id}")
async def update_job(job_id: str, updates: dict, user=Depends(get_current_user)):
    ref = db.collection("users").document(user["uid"]).collection("jobs").document(job_id)
    doc = ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Job not found")

    updates["updatedAt"] = datetime.utcnow().isoformat()
    ref.update(updates)
    return ref.get().to_dict()



@router.delete("/{job_id}")
async def delete_job(job_id: str, user=Depends(get_current_user)):
    ref = db.collection("users").document(user["uid"]).collection("jobs").document(job_id)
    doc = ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Job not found")

    ref.delete()
    return {"success": True}
