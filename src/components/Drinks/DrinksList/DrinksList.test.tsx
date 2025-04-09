import { render, screen, fireEvent } from "@testing-library/react";
import DrinksList from "./DrinksList";
import { Drink } from "../../types/types";

const testData: Drink[] = [
  {
    _id: "1",
    drinkName: "Drink 1",
    DrinkThumb: "picture.png",
    shortDescription: "Short Description",
    Category: "Test",
    Glass: "Flute",
    Ice: "Straight Up",
    Ingredient1: "vodka",
    Ingredient2: "",
    Ingredient3: "",
    Ingredient4: "",
    Ingredient5: "",
    Ingredient6: "",
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
    Ingredient1: "gin",
    Ingredient2: "",
    Ingredient3: "",
    Ingredient4: "",
    Ingredient5: "",
    Ingredient6: "",
    Instructions: "",
  },
];

jest.mock("../../../hooks/useDrinks", () => ({
  useDrinks: () => ({
    drinks: testData,
    loading: false,
    error: null,
    handleSaveEdit: jest.fn(),
    handleDelete: jest.fn(),
  }),
}));

jest.mock("../../../hooks/useFilterDrinks", () => ({
  useFilterDrinks: (drinks: Drink[]) => drinks,
}));

const Props = {
  selectedLetter: "",
  searchQuery: {},
};

describe("DrinksList Component", () => {
  it("renders drink cards based on filtered drinks", () => {
    render(<DrinksList {...Props} />);
    expect(screen.getByText("Drink 1")).toBeInTheDocument();
    expect(screen.getByText("Drink 2")).toBeInTheDocument();
  });

  it("opens drinks modal when a drink card is clicked", () => {
    render(<DrinksList {...Props} />);

    const drinkCard = screen.getByText("Drink 1");
    expect(drinkCard).toBeInTheDocument();

    fireEvent.click(drinkCard);
    const modal = screen.getByTestId("selected-drink-modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent("Drink 1");
  });
});
