import { useMemo } from "react";
import { Drink } from "../components/types/types";

export const useFilterDrinks = (
  drinks: Drink[],
  selectedLetter: string,
  searchQuery: any
) => {
  return useMemo(() => {
    return drinks.filter((drink) => {
      // Match by first letter
      const matchesLetter = selectedLetter
        ? drink.drinkName.startsWith(selectedLetter.toUpperCase().trim())
        : true;

      // Match by search query (partial match)
      const matchesSearch = searchQuery.drinkName
        ? drink.drinkName
            .toLowerCase()
            .includes(searchQuery.drinkName.toLowerCase().trim())
        : true;

      // Normalize fields to avoid case sensitivity & trailing spaces
      const drinkCategory = drink.Category?.toLowerCase().trim();
      const drinkGlass = drink.Glass?.toLowerCase().trim();
      const drinkIce = drink.Ice?.toLowerCase().trim();

      const queryCategory = searchQuery.category?.toLowerCase().trim();
      const queryGlass = searchQuery.glass?.toLowerCase().trim();
      const queryIce = searchQuery.ice?.toLowerCase().trim();

      // Ensure filtering properly applies (STRICT MATCH)
      const matchesCategory = queryCategory
        ? drinkCategory === queryCategory
        : true;
      const matchesGlass = queryGlass ? drinkGlass === queryGlass : true;
      const matchesIce = queryIce ? drinkIce === queryIce : true;

      // Match ingredients (partial match)
      const matchesIngredient = (ingredient: string | undefined) =>
        ingredient
          ? ingredient
              .toLowerCase()
              .includes(searchQuery.drinkName?.toLowerCase().trim() || "")
          : false;

      const matchesIngredients =
        matchesIngredient(drink.Ingredient1) ||
        matchesIngredient(drink.Ingredient2) ||
        matchesIngredient(drink.Ingredient3) ||
        matchesIngredient(drink.Ingredient4) ||
        matchesIngredient(drink.Ingredient5) ||
        matchesIngredient(drink.Ingredient6);

      return (
        (matchesSearch || matchesIngredients) &&
        matchesLetter &&
        matchesCategory &&
        matchesGlass &&
        matchesIce
      );
    });
  }, [drinks, selectedLetter, searchQuery]);
};
