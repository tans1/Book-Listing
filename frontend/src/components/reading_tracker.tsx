import { useEffect, useState } from "react";
import { Book } from "../types/book_type";
import BuildColumn from "./columns";
import useStore from "../zustand/books";

export default function ReadingTracker() {
  const bookStore = useStore();
  const [toRead, setToRead] = useState(bookStore.toRead);
  const [completed, setCompleted] = useState(bookStore.completed);
  const [reading, setReading] = useState(bookStore.reading);

  useEffect(() => {
    setToRead(bookStore.toRead);
    setCompleted(bookStore.completed);
    setReading(bookStore.reading);
  }, [bookStore]);

  return (
    <div className="container mx-auto mt-8 flex justify-center items-center bg-white ml-16 h-[70vh] w-[90vw]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#caf0f8] p-4 rounded-md text-gray-800 min-w-[400px]">
          <h2 className="text-lg font-semibold mb-4 text-center">To Read</h2>
          <BuildColumn data={toRead} />
        </div>

        <div className="bg-[#caf0f8] p-4 rounded-md text-gray-800 min-w-[400px]">
          <h2 className="text-lg font-semibold mb-4  text-center">Reading</h2>
          <BuildColumn data={reading} />
        </div>

        <div className="bg-[#caf0f8] p-4 rounded-md text-gray-800 min-w-[400px]">
          <h2 className="text-lg font-semibold mb-4  text-center">completed</h2>
          <BuildColumn data={completed} />
        </div>
      </div>
    </div>
  );
}
