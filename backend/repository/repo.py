from sqlalchemy.orm import Session
from model.book import Book
from config.db import create_table_if_not_exists


class BookRepository:
    def __init__(self, db_session: Session):
        self.db_session = db_session
        create_table_if_not_exists(self.db_session.get_bind())

    def create_book(self, title: str, status: str):
        new_book = Book(title=title, status=status)
        self.db_session.add(new_book)
        self.db_session.commit()
        self.db_session.refresh(new_book)
        return Book(
            id = new_book.id, 
            title = new_book.title, 
            status = new_book.status
        )

    def get_books(self):
        return self.db_session.query(Book).all()

    def get_book(self, book_id: int):
        return self.db_session.query(Book).filter_by(id=book_id).first()

    def update_book(self, book_id: int, title: str, status: str):
        book = self.get_book(book_id)
        if book:
            book.title = title
            book.status = status
            self.db_session.commit()
            self.db_session.refresh(book)
        return book

    def delete_book(self, book_id: int):
        book = self.get_book(book_id)
        if book:
            self.db_session.delete(book)
            self.db_session.commit()
        return book
