from fastapi.testclient import TestClient
from sqlalchemy import create_engine
import pytest
from sqlalchemy.orm import sessionmaker
from main import app
from config.db import Base


DATABASE_URL = "mysql+mysqlconnector://root:12345678@localhost/books"
engine = create_engine(DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[override_get_db] = override_get_db

@pytest.fixture(scope="module")
def test_app():
    Base.metadata.create_all(bind=engine)
    return TestClient(app)


def test_create_book(test_app):
    response = test_app.post(
        "/books",
        json={"title": "Test Book", "status": "to-read"}
    )
    assert response.status_code == 200
    assert response.json()["title"] == "Test Book"
    assert response.json()["status"] == "to-read"

def test_get_books(test_app):
    response = test_app.get("/books")
    assert response.status_code == 200
    test_app.post("/books", json={"title": "Test Book", "status": "to-read"})
    response = test_app.get("/books")
    assert response.status_code == 200

def test_update_book(test_app):
    # Creating a test book
    create_response = test_app.post("/books", json={"title": "Test Book", "status": "to-read"})
    book_id = create_response.json()["id"]

    # Updating the created book
    update_response = test_app.put(f"/books/{book_id}", json={"id" : book_id, "title": "Updated Book", "status": "reading"})
    assert update_response.status_code == 200
    assert update_response.json()["title"] == "Updated Book"
    assert update_response.json()["status"] == "reading"

def test_delete_book(test_app):
    # Creating a test book
    create_response = test_app.post("/books", json={"title": "Test Book", "status": "to-read"})
    book_id = create_response.json()["id"]

    # Deleting the created book
    delete_response = test_app.delete(f"/books/{book_id}")
    assert delete_response.status_code == 200

    # Fetching books after deletion
    response = test_app.get("/books")
    assert response.status_code == 200
