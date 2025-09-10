from fastapi import FastAPI
from app.routers import jobs, scraper


app = FastAPI()

app.include_router(jobs.router, prefix="/jobs", tags=["Jobs"])
app.include_router(scraper.router, prefix="/scraper", tags=["Scraper"])

@app.get("/")
async def root():
    return {"message": "Job Tracker API running 🚀"}
