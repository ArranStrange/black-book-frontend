import { render, screen, fireEvent } from "@testing-library/react";
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
