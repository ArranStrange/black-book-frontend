import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DrinksList from "./DrinksList";
import { Drink } from "../../types/types";

const testData: Drink[] = [
  {
    _id: "1",
    drinkName: "Test Drink 1",
    DrinkThumb: "testthumb1.png",
    shortDescription: "Test description 1",
    Category: "test",
    Glass: "highball",
    Ice: "crushed",
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
    drinkName: "Test Drink 2",
    DrinkThumb: "testthumb2.png",
    shortDescription: "Test description 2",
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

const testProps = {
  selectedLetter: "",
  searchQuery: {},
};

describe("DrinksList Component", () => {
  test("renders drink cards based on filtered drinks", () => {
    render(<DrinksList {...testProps} />);
    expect(screen.getByText("Test Drink 1")).toBeInTheDocument();
    expect(screen.getByText("Test Drink 2")).toBeInTheDocument();
  });

  test("opens drinks modal when a drink card is clicked", () => {
    render(<DrinksList {...testProps} />);
    const drinkCard = screen.getByText("Test Drink 1");
    expect(drinkCard).toBeInTheDocument();
    fireEvent.click(drinkCard);
    const modal = screen.getByTestId("selected-drink-modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent("Test Drink 1");
  });
});
