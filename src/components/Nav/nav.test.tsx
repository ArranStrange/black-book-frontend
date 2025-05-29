import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Nav from "./nav";

describe("Nav component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.scrollTo = jest.fn();
  });

  it("renders 26 letter buttons and sets default heading", async () => {
    const mockOnSelectLetter = jest.fn();
    render(<Nav onSelectLetter={mockOnSelectLetter} />);

    await waitFor(() => {
      expect(mockOnSelectLetter).toHaveBeenCalledWith("");
    });

    const letterButtons = screen.getAllByTestId("letters");
    expect(letterButtons).toHaveLength(26);
    expect(letterButtons[0]).toHaveTextContent("A");
    expect(letterButtons[25]).toHaveTextContent("Z");
  });

  it("calls onSelectLetter with clicked letter and updates button style", async () => {
    const mockOnSelectLetter = jest.fn();
    render(<Nav onSelectLetter={mockOnSelectLetter} />);

    const zButton = screen
      .getAllByTestId("letters")
      .find((btn) => btn.textContent === "Z");

    expect(zButton).toBeDefined();
    if (!zButton) throw new Error("Z button not found");

    fireEvent.click(zButton);

    expect(mockOnSelectLetter).toHaveBeenCalledWith("Z");
    expect(zButton).toHaveClass("MuiButton-contained");
  });

  it("clears filter when clear button is clicked", async () => {
    const mockOnSelectLetter = jest.fn();
    render(<Nav onSelectLetter={mockOnSelectLetter} />);

    const clearButton = screen.getByRole("button", { name: /clear/i });
    fireEvent.click(clearButton);

    expect(mockOnSelectLetter).toHaveBeenCalledWith("");
  });
});
