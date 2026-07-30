from fastapi import FastAPI
from app.api.github_clone import router as clone_router
from app.api.repositories import router as repository_router
from app.api.github import router as github_router
from app.core.config import settings
from app.api.analyze import router as analyze_router
from app.models.analysis import Analysis
from app.database.base import Base
from app.database.connection import engine
from fastapi.middleware.cors import CORSMiddleware
from app.api.dashboard import router as dashboard_router


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def root():
    return {
        "message": f"{settings.app_name} API is running 🚀"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.app_name,
        "version": settings.app_version
    }



app.include_router(github_router)
app.include_router(repository_router)
app.include_router(clone_router)
app.include_router(analyze_router)
app.include_router(dashboard_router)