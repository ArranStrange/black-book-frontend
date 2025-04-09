import { render, screen, fireEvent } from "@testing-library/react";
import { Drink } from "../../types/types";
import SelectedDrinkModal from "./selectedDrinkModal";

const testDrinkData: Drink = {
  _id: "1",
  drinkName: "Test Drink",
  DrinkThumb: "testthumbnail.png",
  shortDescription: "Test Description",
  Category: "Test Category",
  Glass: "Test Glass",
  Ice: "Test Ice",
  Ingredient1: "Test Ingredient 1",
  Ingredient2: "Test Ingredient 2",
  Ingredient3: "",
  Ingredient4: "",
  Ingredient5: "",
  Ingredient6: "",
  Measure1: 10,
  Measure2: 20,
  Measure3: undefined,
  Measure4: undefined,
  Measure5: undefined,
  Measure6: undefined,
  Instructions: "Test instructions",
};

describe("selectedDrinksModal Component", () => {
  test("ensure the modal renders with the correct details", () => {
    const mockOnClose = jest.fn();
    const mockOnEdit = jest.fn();
    render(
      <SelectedDrinkModal
        drink={testDrinkData}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
        isGuest={false}
      />
    );
    const modalContainer = screen.getByTestId("selected-drink-modal");
    expect(modalContainer).toBeInTheDocument();

    expect(screen.getByText(testDrinkData.drinkName)).toBeInTheDocument();
    expect(screen.getByText(testDrinkData.Category)).toBeInTheDocument();
    expect(screen.getByText(testDrinkData.Instructions)).toBeInTheDocument();
    expect(screen.getByText(testDrinkData.Ingredient1!)).toBeInTheDocument();
  });
});
