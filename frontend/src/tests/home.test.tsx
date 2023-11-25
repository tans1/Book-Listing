import { render, fireEvent } from "@testing-library/react";
import Home from "../app/page";
import "@testing-library/jest-dom";

describe("Home page", () => {
  it('should have a button with text "Add New Book"', () => {
    const { getByText } = render(<Home />);
    expect(getByText("Add New Book")).toBeInTheDocument();
  });

  it('should render "To Read" section', () => {
    const { getByText } = render(<Home />);
    expect(getByText("To Read")).toBeInTheDocument();
  });

  it('should render "Reading" section', () => {
    const { getByText } = render(<Home />);
    expect(getByText("Reading")).toBeInTheDocument();
  });

  it('should render "Completed" section', () => {
    const { container, getByText } = render(<Home />);
    expect(getByText("completed")).toBeInTheDocument();
  });

  it("should render three buttons in the navigation", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Reading Track")).toBeInTheDocument();
    expect(getByText("Books Catalog")).toBeInTheDocument();
    expect(getByText("Add New Book")).toBeInTheDocument();
  });
});
