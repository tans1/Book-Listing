import React, { useEffect, useState } from "react";
import Link from "next/link";
import useStore from "../zustand/books";
import { Book } from "../types/book_type";
import { createBook } from "../utils/api";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBookName, setNewBookName] = useState("");
  const bookStore = useStore();

  const handleAddNewBook = async () => {
    const newBook = await createBook(newBookName);
    if (newBook != null) {
      bookStore.addNewBook(newBook);
    }
    setIsModalOpen(false);
    setNewBookName("");
  };

  return (
    <>
      <p className=" text-black text-center font-bold text-4xl my-4">
        Book Tracking Exercise
      </p>
      <nav className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="left-items">
            <Link href="/" className="mr-5">
              <button className="  px-4 py-2 rounded focus:outline-none outline outline-1 hover:outline-red-600 hover:outline-2">
                Reading Track
              </button>
            </Link>
            <Link href="/books-catalog" className="mr-5">
              <button className="  px-4 py-2 rounded focus:outline-none outline outline-1 hover:outline-red-600 hover:outline-2">
                Books Catalog
              </button>
            </Link>
            <button
              className="bg-blue-500  px-4 py-2 rounded focus:outline-none hover:bg-blue-600 text-white"
              onClick={() => setIsModalOpen(true)}>
              Add New Book
            </button>
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Add New Book</h2>
            <input
              type="text"
              value={newBookName}
              onChange={(e) => setNewBookName(e.target.value)}
              placeholder="Enter book name"
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleAddNewBook}>
                Submit
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
