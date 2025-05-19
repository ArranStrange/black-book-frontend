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
    Ingredients: [{ name: "", measure: 0 }],
    DrinkThumb: "",
    Rating: 0,
    Instructions: "",
  });

  const dispatch = useAppDispatch();

  const handleIngredientChange = (
    index: number,
    field: "name" | "measure",
    value: string | number
  ) => {
    setFormData((prev) => {
      const updatedIngredients = [...prev.Ingredients];
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [field]: field === "measure" ? Number(value) : value,
      };
      return {
        ...prev,
        Ingredients: updatedIngredients,
      };
    });
  };

  const addIngredientField = () => {
    setFormData((prev) => ({
      ...prev,
      Ingredients: [...prev.Ingredients, { name: "", measure: 0 }],
    }));
  };

  const removeIngredientField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      Ingredients: prev.Ingredients.filter((_, i) => i !== index),
    }));
  };

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
    handleIngredientChange,
    addIngredientField,
    removeIngredientField,
    handleChange,
    handleSubmit,
  };
};
