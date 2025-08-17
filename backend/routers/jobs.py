from fastapi import APIRouter, HTTPException
import requests
from bs4 import BeautifulSoup

router = APIRouter()

@router.get("/fetch-job")
def fetch_job(url: str):
    try:
        # Check if LinkedIn or Indeed
        if "linkedin.com/jobs" not in url :
            raise HTTPException(
                status_code=400,
                detail="Only LinkedIn and Indeed job links are supported."
            )
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        }
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Could not fetch the page")

        soup = BeautifulSoup(response.text, "html.parser")

        job_data = {"url": url}

        # ----------------------------
        # LINKEDIN PARSER
        # ----------------------------
        if "linkedin.com/jobs" in url:
            job_data["site"] = "LinkedIn"

            title = soup.find("h1")
            company = soup.find("a", class_="topcard__org-name-link")
            location = soup.find("span", class_="topcard__flavor topcard__flavor--bullet")
            description = soup.find("div", class_="description__text")
            posted = soup.find("span", class_="posted-time-ago__text")

            job_data["title"] = title.get_text(strip=True) if title else "Unknown"
            job_data["company"] = company.get_text(strip=True) if company else "Unknown"
            job_data["location"] = location.get_text(strip=True) if location else "Unknown"
            job_data["description"] = description.get_text(strip=True) if description else "No description"
            job_data["posted"] = posted.get_text(strip=True) if posted else "Unknown"

        return job_data

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
