"use client";
import React, { useEffect, useState } from "react";
import useStore from "../../zustand/books";
import { Book } from "../../types/book_type";
import Navbar from "../../components/navbar";
import { getAll } from "../../utils/api";

export default function BooksCatalog() {
  const bookStore = useStore();
  const [data, setData] = useState<Book[]>([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await getAll();
      setData(response);
      bookStore.setAllBooks(response);
    };
    if (bookStore.toRead.length === 0) {
      fetchBooks();
      return;
    }
    setData(bookStore.books);
  }, [bookStore.toRead]);
  return (
    <>
      <Navbar />
      <div>
        <table className="min-w-full border border-gray-300 mx-5">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((book) => (
              <tr key={book.id}>
                <td className="border border-gray-300 p-2">{book.id}</td>
                <td className="border border-gray-300 p-2">{book.title}</td>
                <td className="border border-gray-300 p-2">{book.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
