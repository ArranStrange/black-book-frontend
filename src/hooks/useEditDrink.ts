import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  closeEditDrinkModal,
  deleteDrinkFromStore,
  updateDrink,
} from "../redux/slices/drinksSlice";
import * as drinkServices from "../services/drinksServices";
import { Drink } from "../components/types/types";

export const useEditDrink = (initialDrink: Drink) => {
  const dispatch = useAppDispatch();

  const [editedDrink, setEditedDrink] = useState<Drink>(initialDrink);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedDrink((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    try {
      const updatedDrink = await drinkServices.editDrink(editedDrink);
      dispatch(updateDrink(updatedDrink));
      dispatch(closeEditDrinkModal());
    } catch (err: any) {
      setError(err.message || "Failed to update drink.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleIngredientChange = (
    index: number,
    field: "name" | "measure",
    value: string | number
  ) => {
    setEditedDrink((prev) => {
      const updated = [...prev.Ingredients];
      updated[index] = {
        ...updated[index],
        [field]: field === "measure" ? Number(value) : value,
      };
      return { ...prev, Ingredients: updated };
    });
  };

  const addIngredientField = () => {
    setEditedDrink((prev) => ({
      ...prev,
      Ingredients: [...prev.Ingredients, { name: "", measure: 0 }],
    }));
  };

  const removeIngredientField = (index: number) => {
    setEditedDrink((prev) => ({
      ...prev,
      Ingredients: prev.Ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    setError(null);

    if (!editedDrink._id) {
      setError("Missing drink ID");
      return;
    }

    try {
      await drinkServices.deleteDrink(editedDrink._id);
      dispatch(deleteDrinkFromStore(editedDrink._id));
      dispatch(closeEditDrinkModal());
    } catch (err: any) {
      setError(err.message || "Failed to delete drink.");
    }
  };

  return {
    editedDrink,
    handleChange,
    addIngredientField,
    removeIngredientField,
    handleIngredientChange,
    handleSave,
    handleDeleteClick,
    handleConfirmDelete,
    showConfirmDelete,
    setShowConfirmDelete,
    isSaving,
    error,
  };
};
