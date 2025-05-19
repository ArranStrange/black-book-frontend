import { useMemo } from "react";
import { useAppSelector } from "../redux/hooks";
//
//
//
export const useFilterDrinks = (selectedLetter: string, searchQuery: any) => {
  const drinks = useAppSelector((state) => state.drinks.list);
  console.log("Drinks in Redux:", drinks);

  // useMemo to only recalculate when a change is made
  return useMemo(() => {
    //
    //
    //
    // uses the filter() method to iterate over every element of the drinks array
    // and decifers based on the following conditions if it should be included in the return
    return drinks.filter((drink) => {
      // Match by first letter
      const matchesLetter = selectedLetter
        ? //if a selected letter, run the below code
          //trims and toUppercase's the selected letter for consistency
          // uses the startsWith() method to check the selectedLetter against the drinks array .drinkName
          (drink.drinkName ?? "").startsWith(
            selectedLetter.toUpperCase().trim()
          )
        : // if no selected letter, assume all drinks match, showing all drinks in the drinks array
          true;
      //
      //
      // SEARCH BAR (partial match)
      const matchesSearch = searchQuery.drinkName
        ? // of there is a search query run the below code
          (drink.drinkName ?? "")
            // take the drinks name and convert to lowercase
            // use the includes() method to allow partial matches
            // convers the searchquery to lowercase
            .toLowerCase()
            .includes(searchQuery.drinkName.toLowerCase().trim())
        : //if nothing provided match all drinks and return the whole array
          true;
      //
      //
      //
      // CATEGORY, ICE & GLASS
      // Before comparing the categories, ice and glass convert all to lowercase and trim white sapce
      // ?. is used to handle cases where the drink may not have a perticular property
      // will skip the toLowercase / trim and return undefined
      const drinkCategory = drink.Category?.toLowerCase().trim();
      const drinkGlass = drink.Glass?.toLowerCase().trim();
      const drinkIce = drink.Ice?.toLowerCase().trim();
      const queryCategory = searchQuery.category?.toLowerCase().trim();
      const queryGlass = searchQuery.glass?.toLowerCase().trim();
      const queryIce = searchQuery.ice?.toLowerCase().trim();
      //
      //
      // Ensure filtering properly applies (STRICT MATCH)

      /// takes the query and checks if it matched exactly to the drinkCategory defined above
      const matchesCategory = queryCategory
        ? drinkCategory === queryCategory
        : //if no match defined, return true showing all categories
          true;
      /// takes the query and checks if it matched exactly to the drinkGlass defined above
      const matchesGlass = queryGlass ? drinkGlass === queryGlass : true;
      /// takes the query and checks if it matched exactly to the drinkIce defined above
      const matchesIce = queryIce ? drinkIce === queryIce : true;
      //
      //
      //
      // Match ingredients (partial match)
      // takes a string from the search input or undefined (incase nothing is inputted)
      const matchesIngredient = (ingredient: string | undefined) =>
        //checks if the drink has ingredient if falsy then skips the .includes() method
        ingredient
          ? // if true will convert the ingredient to lowercase and use the includes() method to check against the search query
            // search query.drinkName used as that is what the search bar is set to
            ingredient
              .toLowerCase()
              // includes() the search query of an empty string
              .includes(searchQuery.drinkName?.toLowerCase().trim() || "")
          : // else if falsy e.g. null or undifined then return false. e.g. do nothing
            false;
      //
      //
      //matches ingredients ensure that every ingredient field of the object is checked
      const matchesIngredients =
        // if any of these checks return true then the drink will be added to the array
        matchesIngredient(drink.Ingredient1) ||
        matchesIngredient(drink.Ingredient2) ||
        matchesIngredient(drink.Ingredient3) ||
        matchesIngredient(drink.Ingredient4) ||
        matchesIngredient(drink.Ingredient5) ||
        matchesIngredient(drink.Ingredient6);
      //
      //
      //

      return (
        // Ensures that the drink is included if either the drink's name is contained in the search query
        // or at least one of its ingredients does.
        (matchesSearch || matchesIngredients) &&
        // the drink must also meet the below conditions, if provided
        matchesLetter &&
        matchesCategory &&
        matchesGlass &&
        matchesIce
      );
    });
    //dependant on drinks, selectLetter and searchQuery, will rerun if any of these change
  }, [drinks, selectedLetter, searchQuery]);
};
