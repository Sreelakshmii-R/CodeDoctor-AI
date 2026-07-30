from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.services.analysis_service import analyze_repository
from app.database.dependencies import get_db

from app.models.repository import Repository
from app.models.analysis import Analysis

from app.schemas.repository import RepositoryCreate, RepositoryResponse
from app.schemas.analysis import AnalysisResponse

from app.services.git_clone import clone_repository


router = APIRouter(
    prefix="/repositories",
    tags=["Repositories"]
)


# Create Repository
@router.post("/", response_model=RepositoryResponse)
def create_repository(
    repository: RepositoryCreate,
    db: Session = Depends(get_db)
):

    existing_repository = (
        db.query(Repository)
        .filter(Repository.github_url == str(repository.github_url))
        .first()
    )

    if existing_repository:
        raise HTTPException(
            status_code=400,
            detail="Repository already exists."
        )


    # Create repository record
    new_repository = Repository(
        name=repository.name,
        github_url=str(repository.github_url),
        language=repository.language,
    )


    db.add(new_repository)
    db.commit()
    db.refresh(new_repository)


    # Automatically clone GitHub repository
    try:

        clone_path = clone_repository(
            new_repository.github_url
        )

        new_repository.local_path = clone_path

        db.commit()
        db.refresh(new_repository)


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Repository cloning failed: {str(e)}"
        )


    return new_repository


# Get all repositories
@router.get("/", response_model=list[RepositoryResponse])
def get_repositories(
    db: Session = Depends(get_db)
):

    repositories = (
        db.query(Repository)
        .all()
    )

    return repositories



# Get single repository
@router.get("/{repository_id}", response_model=RepositoryResponse)
def get_repository(
    repository_id: int,
    db: Session = Depends(get_db)
):

    repository = (
        db.query(Repository)
        .filter(
            Repository.id == repository_id
        )
        .first()
    )


    if repository is None:
        raise HTTPException(
            status_code=404,
            detail="Repository not found"
        )


    return repository



# Analyze repository
@router.post("/{repository_id}/analyze")
def analyze_repository_endpoint(
    repository_id: int,
    db: Session = Depends(get_db)
):

    repository = (
        db.query(Repository)
        .filter(
            Repository.id == repository_id
        )
        .first()
    )


    if repository is None:
        raise HTTPException(
            status_code=404,
            detail="Repository not found"
        )


    if not repository.local_path:
        raise HTTPException(
            status_code=400,
            detail="Repository has not been cloned yet"
        )


    result = analyze_repository(
        repository,
        db
    )


    return result



# Analysis history
@router.get(
    "/{repository_id}/analyses",
    response_model=list[AnalysisResponse]
)
def get_analysis_history(
    repository_id: int,
    db: Session = Depends(get_db)
):

    analyses = (
        db.query(Analysis)
        .filter(
            Analysis.repository_id == repository_id
        )
        .order_by(
            Analysis.created_at.desc()
        )
        .all()
    )


    return analyses



# Latest analysis
@router.get(
    "/{repository_id}/latest-analysis",
    response_model=AnalysisResponse
)
def get_latest_analysis(
    repository_id: int,
    db: Session = Depends(get_db)
):

    analysis = (
        db.query(Analysis)
        .filter(
            Analysis.repository_id == repository_id
        )
        .order_by(
            Analysis.created_at.desc()
        )
        .first()
    )


    if analysis is None:
        raise HTTPException(
            status_code=404,
            detail="No analysis found for this repository"
        )


    return analysis


import os
import shutil

@router.delete("/{repository_id}")
def delete_repository(
    repository_id: int,
    db: Session = Depends(get_db)
):

    repository = (
        db.query(Repository)
        .filter(Repository.id == repository_id)
        .first()
    )

    if repository is None:
        raise HTTPException(
            status_code=404,
            detail="Repository not found"
        )

    # Delete all analyses
    db.query(Analysis).filter(
        Analysis.repository_id == repository.id
    ).delete()

    db.commit()

    # Delete cloned folder
    if repository.local_path and os.path.exists(repository.local_path):
        shutil.rmtree(repository.local_path)

    # Delete repository
    db.delete(repository)
    db.commit()

    return {
        "message": "Repository deleted successfully."
    }