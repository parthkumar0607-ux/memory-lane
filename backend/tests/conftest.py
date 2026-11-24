import os

# Must be set before the app is imported: tests run on a throwaway SQLite file.
os.environ["DATABASE_URL"] = "sqlite:///./test.db"
os.environ["JWT_SECRET"] = "test-secret"

import pytest
from fastapi.testclient import TestClient

from app.database.session import Base, engine
from app.main import app


@pytest.fixture()
def client():
    Base.metadata.drop_all(bind=engine)
    with TestClient(app) as c:  # runs lifespan -> creates tables
        yield c
    Base.metadata.drop_all(bind=engine)
