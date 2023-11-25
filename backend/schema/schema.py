from pydantic import BaseModel

class BookBase(BaseModel):
    title: str
    status: str

class BookCreate(BookBase):
    pass

class BookUpdate(BookBase):
    id : int
