import { useState } from "react";
import { Drink } from "../components/types/types";

export const useEditDrink = (
  drink: Drink,
  onSave: (updatedDrink: Drink) => void,
  setShowEditModal: (value: boolean) => void,
  onDelete: (id: string) => void
) => {
  const [editedDrink, setEditedDrink] = useState<Drink>(drink);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedDrink((prevDrink) => ({
      ...prevDrink,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(editedDrink);
    setShowEditModal(false);
  };

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    onDelete(drink._id);
    setShowConfirmDelete(false);
    setShowEditModal(false);
  };

  return {
    editedDrink,
    handleChange,
    handleSave,
    handleDeleteClick,
    handleConfirmDelete,
    showConfirmDelete,
    setShowConfirmDelete,
  };
};
