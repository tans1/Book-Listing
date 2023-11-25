"use client";

import Navbar from "../components/navbar";
import { useEffect } from "react";
import { getAll } from "../utils/api";
import { Book } from "../types/book_type";
import ReadingTracker from "../components/reading_tracker";
import useStore from "../zustand/books";

export default function Home() {
  const bookStore = useStore();

  useEffect(() => {
    const fetchData = async () => {
      const response: Book[] = await getAll();
      const completed = response.filter((book) => book.status === "completed");
      const reading = response.filter((book) => book.status === "reading");
      const toRead = response.filter((book) => book.status === "to-read");

      bookStore.setAllBooks(response);
      bookStore.setCompleted(completed);
      bookStore.setReading(reading);
      bookStore.setToRead(toRead);
    };

    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <ReadingTracker />
    </>
  );
}
