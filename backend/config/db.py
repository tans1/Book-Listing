import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
from sqlalchemy import create_engine, text, MetaData
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

load_dotenv()

db_user = os.getenv("user")
db_port = os.getenv("port")
db_host = os.getenv("host")
db_database = os.getenv("database")
db_password = os.getenv("password")

DATABASE_URL = f"mysql+mysqlconnector://{db_user}:{db_password}@{db_host}:{db_port}"
Base = declarative_base()
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(engine)


def create_database(connection):
    connection.execute(text(f"CREATE DATABASE IF NOT EXISTS {db_database};")) 
    connection.execute(text(f"USE {db_database};")) 
    connection.commit()
            
def create_table_if_not_exists(connection):
    create_table_command = """
    CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        status VARCHAR(255)
    );
    """
    connection.execute(text(create_table_command))
    connection.commit()
