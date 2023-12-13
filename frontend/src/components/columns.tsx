import React, { useEffect, useState } from "react";
import { Book } from "../types/book_type";
import useStore from "../zustand/books";
import { changeCategory, deleteBook, updateTitle } from "../utils/api";

type Prop = {
  data: Book[];
};

export default function BuildColumn({ data }: Prop) {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [editable, setEditable] = useState<boolean>(false);
  const bookStore = useStore();
  const categories = ["to-read", "reading", "completed"];

  const handleDropdownClick = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };
  const handleEdit = (event: any, id: number) => {
    // newT;
    const formData = new FormData(event.target);
    console.log("the handle edit is called", formData.get("id"));
    // updateTitle(item.id, newTitle, item);
  };
  const handleDelete = (item: Book, index: number) => {
    try {
      bookStore.removeBook(item);
      deleteBook(item.id);
    } catch (e) {
      console.log(e);
    }
    handleDropdownClick(index);
  };
  const handleCategoryChange = (
    item: Book,
    newCategory: string,
    index: number
  ) => {
    try {
      bookStore.updateBook(item, newCategory);
      bookStore.removeBook(item);
      changeCategory(item.id, newCategory, item);
    } catch (e) {
      console.log(e);
    }
    handleDropdownClick(index);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-2 md:p-5">
      {data.map((item, index) => (
        <div
          key={index}
          className="relative border border-gray-300 rounded p-4 mb-2 w-full bg-white text-gray-800">
          <div className="flex justify-between items-center">
            <span>{index + 1}</span>
            <form onSubmit={(event) => handleEdit(event, item.id)}>
              <input defaultValue={item.title} name={item.id.toString()} />
              <input type="submit" />
            </form>

            <div
              className="cursor-pointer"
              onClick={() => handleDropdownClick(index)}>
              ...
            </div>
          </div>
          {expandedItem === index && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded text-gray-800 z-30">
              {categories.map(
                (category) =>
                  category !== item.status && (
                    <p
                      key={category}
                      className="hover:bg-gray-300 pl-2 py-1 hover:cursor-pointer"
                      onClick={() =>
                        handleCategoryChange(item, category, index)
                      }>
                      move to {category}
                    </p>
                  )
              )}
              <p
                className="hover:bg-red-200 pl-2 py-1 hover:cursor-pointer"
                onClick={() => handleDelete(item, index)}>
                delete
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
