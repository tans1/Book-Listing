from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = "mysql+mysqlconnector://root:12345678@3366/books"
Base = declarative_base()


engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def create_table_if_not_exists(engine):
    create_table_command = """
    CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        status VARCHAR(255)
    );
    """
    with engine.connect() as connection:
        connection.execute(text(create_table_command))