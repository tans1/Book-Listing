import { Book } from "../types/book_type";
import axios from "axios";
import { toast } from "react-hot-toast";

const BASE_URL = "http://localhost:8000/books";

export async function getAll(): Promise<Book[]> {
  try {
    const response = await axios.get<Book[]>(BASE_URL);
    return response.data;
  } catch (error) {
    toast.error("Error occurred while fetching data", {
      icon: "❌",
      duration: 3000
    });
    return [];
  }
}

export async function createBook(newBookName: string): Promise<Book | null> {
  try {
    const response = await axios.post<Book>(BASE_URL, {
      title: newBookName,
      status: "to-read"
    });
    toast.success("Book is created successfully", {
      icon: "✔",
      duration: 3000
    });
    return response.data;
  } catch (error) {
    toast.error("Error occurred while creating data", {
      icon: "❌",
      duration: 3000
    });
    return null;
  }
}

export async function deleteBook(id: number): Promise<void> {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    toast.success("Deleted successfully", {
      icon: "✔",
      duration: 3000
    });
  } catch (error) {
    toast.error("Error occurred while deleting data", {
      icon: "❌",
      duration: 3000
    });
  }
}

export async function changeCategory(
  id: number,
  newCategory: string,
  book: Book
) {
  try {
    await axios.put(`${BASE_URL}/${id}`, {
      id: id,
      title: book.title,
      status: newCategory
    });
    toast.success("Updated successfully", {
      icon: "✔",
      duration: 3000
    });
  } catch (error) {
    toast.error("Error occurred while deleting data", {
      icon: "❌",
      duration: 3000
    });
  }
}

export async function updateTitle(
  id: number,
  newTitle : string,
  book: Book 
) {
  try {
    await axios.put(`${BASE_URL}/${id}`, {
      id: id,
      title: newTitle,
      status: book.status
    });
    toast.success("Updated successfully", {
      icon: "✔",
      duration: 3000
    });
  }
  catch (error){
    toast.error("Error occurred while editing data", {
      icon: "❌",
      duration: 3000
    });
  }
}