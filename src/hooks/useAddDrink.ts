import { useState } from "react";
import { addDrink } from "../services/drinksServices";
import { useAppDispatch } from "../redux/hooks";
import { addDrink as addDrinkToStore } from "../redux/slices/drinksSlice";
import { setModal } from "../redux/slices/uiSlice";

export const useAddDrink = (toggleAddDrinkForm: () => void) => {
  const [formData, setFormData] = useState({
    idDrink: Date.now().toString(),
    drinkName: "",
    shortDescription: "",
    Category: "",
    Glass: "",
    Ice: "",
    Ingredient1: "",
    Ingredient2: "",
    Ingredient3: "",
    Ingredient4: "",
    Ingredient5: "",
    Ingredient6: "",
    Measure1: 0,
    Measure2: 0,
    Measure3: 0,
    Measure4: 0,
    Measure5: 0,
    Measure6: 0,
    DrinkThumb: "",
    Rating: 0,
    Instructions: "",
  });

  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const createdDrink = await addDrink(formData);
      dispatch(addDrinkToStore(createdDrink));
      dispatch(
        setModal({ message: "Drink added successfully", title: "Success" })
      );
      toggleAddDrinkForm();
    } catch (error) {
      dispatch(setModal({ message: "Failed to add drink", title: "Error" }));
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
  };
};
