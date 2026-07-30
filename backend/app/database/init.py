from app.database.base import Base
from app.database.connection import engine

# Import models so SQLAlchemy registers the tables
from app.models.repository import Repository
from app.models.analysis import Analysis


def init_db():
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    init_db()