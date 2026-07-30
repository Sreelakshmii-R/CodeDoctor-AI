from pydantic import BaseModel, HttpUrl


class RepositoryCreate(BaseModel):
    name: str
    github_url: HttpUrl
    language: str


class RepositoryResponse(BaseModel):
    id: int
    name: str
    github_url: HttpUrl
    language: str

    model_config = {
        "from_attributes": True
    }