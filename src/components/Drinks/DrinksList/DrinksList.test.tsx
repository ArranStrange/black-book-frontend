import { render, screen, fireEvent } from "@testing-library/react";
import DrinksList from "./DrinksList";
import { Drink } from "../../types/types";

import { useAppSelector } from "../../../redux/hooks";

jest.mock("../../../redux/hooks", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: () => jest.fn(),
}));

jest.mock("../../../redux/slices/drinksSlice", () => ({
  selectDrink: jest.fn((drink) => ({ type: "SELECT_DRINK", payload: drink })),
}));

jest.mock("../../../hooks/useFilterDrinks", () => ({
  useFilterDrinks: () => testData,
}));

jest.mock("../SelectedDrinkModal/selectedDrinkModal", () => () => (
  <div data-testid="selected-drink-modal">Drink 1</div>
));

jest.mock("../EditDrinksModal/EditDrinksModal", () => () => (
  <div data-testid="edit-drink-modal">Edit Modal</div>
));

const testData: Drink[] = [
  {
    _id: "1",
    drinkName: "Drink 1",
    DrinkThumb: "picture.png",
    shortDescription: "Short Description",
    Category: "Test",
    Glass: "Flute",
    Ice: "Straight Up",
    Ingredients: [{ name: "vodka", measure: 0 }],
    Instructions: "",
  },
  {
    _id: "2",
    drinkName: "Drink 2",
    DrinkThumb: "picture2.png",
    shortDescription: "Short Description 2",
    Category: "test",
    Glass: "martini",
    Ice: "cubed",
    Ingredients: [{ name: "gin", measure: 0 }],
    Instructions: "",
  },
];

const TestProps = {
  selectedLetter: "",
  searchQuery: {},
};

describe("DrinksList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        drinks: {
          loading: false,
          error: null,
          showDrinkModal: true,
          showEditModal: false,
        },
        auth: {
          isGuest: false,
        },
      })
    );
  });

  it("renders drink cards based on filtered drinks", () => {
    render(<DrinksList {...TestProps} />);
    const headings = screen.getAllByRole("heading", { level: 4 });
    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent("Drink 1");
    expect(headings[1]).toHaveTextContent("Drink 2");
  });

  it("opens drinks modal when a drink card is clicked", () => {
    render(<DrinksList {...TestProps} />);
    const drinkCard = screen.getAllByRole("heading", { level: 4 })[0];
    fireEvent.click(drinkCard);
    expect(screen.getByTestId("selected-drink-modal")).toBeInTheDocument();
    expect(screen.getByTestId("selected-drink-modal")).toHaveTextContent(
      "Drink 1"
    );
  });
});
