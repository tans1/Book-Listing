from dataclasses import dataclass
from dataclasses import dataclass
from sqlalchemy import Column, String, create_engine, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


@dataclass
class BookData:
    id : int
    title: str
    status: str
    
Base = declarative_base()
class Book(Base, BookData):
    __tablename__ = 'books'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    status = Column(String)