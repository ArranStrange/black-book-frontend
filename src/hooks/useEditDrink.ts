import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import {
  closeEditDrinkModal,
  deleteDrink as deleteDrinkFromStore,
  updateDrink as updateDrinkInStore,
} from "../redux/slices/drinksSlice";
import * as drinkServices from "../services/drinksServices";
import { Drink } from "../components/types/types";

export const useEditDrink = (initialDrink: Drink | null) => {
  if (!initialDrink) throw new Error("initialDrink is null");
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
      dispatch(updateDrinkInStore(updatedDrink));
      dispatch(closeEditDrinkModal());
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    setError(null);

    const id = editedDrink._id;
    if (!id) {
      setError("Cannot delete drink: missing ID.");
      return;
    }

    try {
      await drinkServices.deleteDrink(id);
      dispatch(deleteDrinkFromStore(id));
      dispatch(closeEditDrinkModal());
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to delete drink.");
    }
  };

  return {
    editedDrink,
    handleChange,
    handleSave,
    handleDeleteClick,
    handleConfirmDelete,
    showConfirmDelete,
    setShowConfirmDelete,
    isSaving,
    error,
  };
};
