from fastapi import FastAPI
from app.routers import jobs, scraper
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # restrict later to your frontend domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(jobs.router, prefix="/jobs", tags=["Jobs"])
app.include_router(scraper.router, prefix="/scraper", tags=["Scraper"])

