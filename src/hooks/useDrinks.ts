import { useState, useEffect } from "react";
import {
  fetchDrinks,
  editDrink,
  deleteDrink,
} from "../services/drinksServices";
import { Drink } from "../components/types/types";
//
//
//
// Sorting Drinks list into alphabetical order and saving in the sortDrink variable
// takes the Drink[] array
const sortDrinks = (drinksList: Drink[]) =>
  // creates a shallow copy by spreading and uses the .sort() method
  // takes two drinks a & b from the array and compares A's name with localeCompare against B
  // localeCompare returns a negative if A comes before B, a positve if it comes after and a 0 if they are equal
  // sort then arranges the return
  [...drinksList].sort((a, b) => a.drinkName.localeCompare(b.drinkName));
//
//
//
export const useDrinks = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //
  //
  //
  //UseEffect to fetch the data from the drinksServices
  useEffect(() => {
    const getDrinks = async () => {
      try {
        //fetch the data
        const data = await fetchDrinks();
        //passes the data through sortDrinks
        const sortedDrinks = sortDrinks(data);
        //sets the Drinks state to the value of sortedDrinks
        setDrinks(sortedDrinks);
        //error handling
      } catch (err) {
        setError((err as Error).message);
        //finish by setting the loading value to false so the loading "spinner" isn't rendered
      } finally {
        setLoading(false);
      }
    };
    //runs the code inside the function getDrinks
    getDrinks();
  }, []);
  //
  //
  //
  // Handles Editted drinks save
  // takes the updatedDrink data from the editDrinksModal
  const handleSaveEdit = async (updatedDrink: Drink) => {
    try {
      //sends updated drink the editDrink in drinkServices for the API call
      const updated = await editDrink(updatedDrink);
      // updates the drinks array state with the new data
      setDrinks((prev) =>
        //maps over the prev array, for each iteration, it checks the id against the updated drink id
        prev.map((drink) =>
          // if a match is found it updated the prev drink object with the new
          drink._id === updated._id
            ? // if no match the drink is left unchanged
              updated
            : drink
        )
      );
      // catches any errors and returns the error message
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    // takes the drink id from useEditDrink onDelete call
    try {
      // sends the id to drinksServices deleteDrink
      await deleteDrink(id);
      //sets the drink array without the drink that has been deleted so there is no need for rerender
      setDrinks((prev) => prev.filter((drink) => drink._id !== id));
      //catches any errors
    } catch (error: any) {
      setError(error.message);
    }
  };

  return {
    drinks,
    loading,
    error,
    handleSaveEdit,
    handleDelete,
  };
};
