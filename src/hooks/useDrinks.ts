import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setDrinks, setLoading, setError } from "../redux/slices/drinksSlice";
import { fetchDrinks } from "../services/drinksServices";
import { Drink } from "../components/types/types";

const sortDrinks = (drinksList: Drink[]) =>
  [...drinksList].sort((a, b) =>
    (a.drinkName ?? "").localeCompare(b.drinkName ?? "")
  );

export const useDrinks = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getDrinks = async () => {
      dispatch(setLoading(true));
      try {
        const drinks = await fetchDrinks();
        const sorted = sortDrinks(drinks);
        dispatch(setDrinks(sorted));
      } catch (err) {
        dispatch(setError((err as Error).message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    getDrinks();
  }, [dispatch]);
};
