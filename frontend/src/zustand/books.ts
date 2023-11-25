import { Book } from "./../types/book_type";
import { create } from "zustand";

type BookStore = {
  toRead: Book[];
  reading: Book[];
  completed: Book[];
  books: Book[];
  setAllBooks: (data: Book[]) => void;
  setToRead: (data: Book[]) => void;
  setReading: (data: Book[]) => void;
  setCompleted: (data: Book[]) => void;

  updateBook: (data: Book, category: string) => void;
  removeBook: (data: Book) => void;
  addNewBook: (data: Book) => void;
};

const useStore = create<BookStore>((set) => ({
  toRead: [],
  reading: [],
  completed: [],
  books: [],
  setAllBooks: (data: Book[]) => set({ books: data }),
  setToRead: (data: Book[]) => set({ toRead: data }),
  setReading: (data: Book[]) => set({ reading: data }),
  setCompleted: (data: Book[]) => set({ completed: data }),
  updateBook: (data: Book, category: string) => {
    if (category === "to-read") {
      set((state) => ({ toRead: [...state.toRead, data] }));
    } else if (category === "reading") {
      set((state) => ({ reading: [...state.reading, data] }));
    } else if (category === "completed") {
      set((state) => ({ completed: [...state.completed, data] }));
    }
  },
  removeBook: (data: Book) => {
    if (data.status === "to-read") {
      set((state) => ({
        toRead: state.toRead.filter((book) => book.id !== data.id)
      }));
    } else if (data.status === "reading") {
      set((state) => ({
        reading: state.reading.filter((book) => book.id !== data.id)
      }));
    } else if (data.status === "completed") {
      set((state) => ({
        completed: state.completed.filter((book) => book.id !== data.id)
      }));
    }
  },

  addNewBook: (data: Book) =>
    set((state) => ({
      toRead: [data, ...state.toRead],
      books: [data, ...state.books]
    }))
}));

export default useStore;
