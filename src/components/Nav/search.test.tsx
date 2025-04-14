import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./search";

describe("Search Component", () => {
  const onMockSearch = jest.fn();
  const onMockShowAll = jest.fn();
  const onMockAddDrinkFrom = jest.fn();

  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  it("renders the search input and clears all filters", () => {
    render(
      <Search
        onSearch={onMockSearch}
        onShowAll={onMockShowAll}
        toggleAddDrinkForm={onMockAddDrinkFrom}
      />
    );
    // expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });

  it("make the search", () => {
    render(
      <Search
        onSearch={onMockSearch}
        onShowAll={onMockShowAll}
        toggleAddDrinkForm={onMockAddDrinkFrom}
      />
    );

    const input = screen.getByPlaceholderText("Search");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "Margarita" } });
    expect(input).toHaveValue("Margarita");

    const searchButton = screen.getByTestId("submit-search-button");
    fireEvent.change(screen.getByTestId("category-selection"), {
      target: { value: "highball" },
    });
    fireEvent.change(screen.getByTestId("glass-selection"), {
      target: { value: "coup" },
    });
    fireEvent.change(screen.getByTestId("ice-selection"), {
      target: { value: "crushed" },
    });
    fireEvent.click(searchButton);

    expect(onMockSearch).toBeCalledWith({
      drinkName: "Margarita",
      category: "highball",
      glass: "coup",
      ice: "crushed",
    });
  });
  it("removes focus from the search", () => {
    render(
      <Search
        onSearch={onMockSearch}
        onShowAll={onMockShowAll}
        toggleAddDrinkForm={onMockAddDrinkFrom}
      />
    );
    const input = screen.getByPlaceholderText("Search");
    fireEvent.focus(input);
    expect(screen.getByLabelText("Category:")).toBeInTheDocument();
  });
});
