import { useState, useEffect } from "react";
import {
  fetchDrinks,
  editDrink,
  deleteDrink,
} from "../services/drinksServices";
import { Drink } from "../components/types/types";

const sortDrinks = (drinksList: Drink[]) => {
  return [...drinksList].sort((a, b) => a.drinkName.localeCompare(b.drinkName));
};

export const useDrinks = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDrinks = async () => {
      try {
        const data = await fetchDrinks();
        const sortedDrinks = sortDrinks(data);
        setDrinks(sortedDrinks);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    getDrinks();
  }, []);

  const handleSaveEdit = async (updatedDrink: Drink) => {
    try {
      const updated = await editDrink(updatedDrink);
      setDrinks((prev) =>
        prev.map((drink) => (drink._id === updated._id ? updated : drink))
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDrink(id);
      setDrinks((prev) => prev.filter((drink) => drink._id !== id));
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
