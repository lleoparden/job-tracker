from fastapi import FastAPI
from routers import jobs

app = FastAPI()

# include the router correctly
app.include_router(jobs.router, prefix="/jobs", tags=["Jobs"])
