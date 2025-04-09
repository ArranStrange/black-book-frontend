import { render, screen, fireEvent } from "@testing-library/react";
import Nav from "./nav";

describe("Nav component", () => {
  it("renders 26 letters and an empty string for Current Letter", () => {
    const mockOnSelectLetter = jest.fn();
    window.scrollTo = jest.fn();
    render(<Nav onSelectLetter={mockOnSelectLetter} />);

    const alphabet = screen.getAllByRole("listitem");
    expect(alphabet).toHaveLength(26);
    expect(alphabet[0]).toHaveTextContent("A");
    expect(alphabet[25]).toHaveTextContent("Z");

    const seletedLetter = screen.getByRole("heading");
    expect(seletedLetter.textContent).toBe("");
    expect(mockOnSelectLetter).toHaveBeenCalledWith("");
  });

  it("calls onSelectLetter with the clicked letter and updates the Selected Letter H1", () => {
    const mockOnSelectLetter = jest.fn();
    render(<Nav onSelectLetter={mockOnSelectLetter} />);

    const letterElement = screen.getByText("Z");
    fireEvent.click(letterElement);

    expect(mockOnSelectLetter).toHaveBeenCalledWith("Z");

    const selectedLetter = screen.getByRole("heading");
    expect(selectedLetter.textContent).toBe("Z");
  });
});
