import { render, screen, fireEvent, within } from "@testing-library/react";
import Search from "./search";

describe("Search Component", () => {
  const onMockSearch = jest.fn();
  const onMockShowAll = jest.fn();
  const onMockAddDrinkForm = jest.fn();

  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();

    render(
      <Search
        onSearch={onMockSearch}
        onShowAll={onMockShowAll}
        toggleAddDrinkForm={onMockAddDrinkForm}
      />
    );

    fireEvent.click(screen.getAllByRole("button")[0]);
  });

  it("renders the search input", () => {
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });

  // it("submits the search with filters", async () => {
  //   fireEvent.change(screen.getByPlaceholderText("Search"), {
  //     target: { value: "Margarita" },
  //   });

  //   fireEvent.click(screen.getByTestId("filters-toggle-button"));

  //   // Category dropdown
  //   fireEvent.mouseDown(screen.getByTestId("category-selection"));
  //   const categoryListbox = await screen.findByRole("listbox");
  //   fireEvent.click(within(categoryListbox).getByText("Highball"));

  //   // Glass dropdown
  //   fireEvent.mouseDown(screen.getByTestId("glass-selection"));
  //   const glassListbox = await screen.findByRole("listbox");
  //   fireEvent.click(within(glassListbox).getByText("Coup"));

  //   // Ice dropdown
  //   fireEvent.mouseDown(screen.getByTestId("ice-selection"));
  //   const iceListbox = await screen.findByRole("listbox");
  //   fireEvent.click(within(iceListbox).getByText("Crushed"));

  //   fireEvent.click(screen.getByTestId("submit-search-button"));

  //   expect(onMockSearch).toHaveBeenCalledWith({
  //     drinkName: "Margarita",
  //     category: "Highball",
  //     glass: "Coup",
  //     ice: "Crushed",
  //   });
  // });

  it("clears filters and calls onShowAll", () => {
    fireEvent.click(screen.getByTestId("filters-toggle-button"));
    expect(screen.getByText("Category")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Clear"));

    expect(onMockShowAll).toHaveBeenCalled();
  });
});
