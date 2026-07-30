from app.database.base import Base
from app.database.connection import engine

# Import every model
from app.models.repository import Repository

Base.metadata.create_all(bind=engine)

print("✅ Tables created successfully!")