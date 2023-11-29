import os
from fastapi import APIRouter, HTTPException , Depends
from repository.repo import BookRepository
from schema.schema import BookCreate, BookUpdate
from typing import List
from model.book import Book  
from dotenv import load_dotenv
from config.db import SessionLocal

load_dotenv()
db_user = os.getenv("db_user")
db_pass = os.getenv("db_pass")
db_host = os.getenv("db_host")
db_port = os.getenv("db_port")
db_database = os.getenv("db_database")

router = APIRouter()
def get_db():
    connection = SessionLocal()
    try:
        yield connection
    finally:
        connection.close()

@router.get("/books", response_model=List[Book])
def read_all_books(db = Depends(get_db)):
    book_repo = BookRepository(db)
    return book_repo.get_books()

@router.get("/books/{book_id}", response_model=Book)
def read_book_endpoint(book_id: int,db = Depends(get_db)):
    book_repo = BookRepository(db)
    book = book_repo.get_book(book_id=book_id)
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@router.post("/books", response_model= Book)
def create_book_endpoint(book: BookCreate,db = Depends(get_db)):
    book_repo = BookRepository(db)
    return book_repo.create_book(title = book.title, status = book.status)

@router.put("/books/{book_id}", response_model=Book)
def update_book_endpoint(book_id: int, book: BookUpdate,db = Depends(get_db)):
    book_repo = BookRepository(db)
    updated_book = book_repo.update_book(book_id=book_id, title=book.title, status=book.status)
    if updated_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return updated_book


@router.delete("/books/{book_id}", response_model=dict)
def delete_book_endpoint(book_id: int,db = Depends(get_db)):
    book_repo = BookRepository(db)
    deleted_book = book_repo.delete_book(book_id=book_id)
    if deleted_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return {"message": "Book deleted successfully"}


