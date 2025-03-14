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
  //
  //
  //handles the change of an input field
  const handleChange = (
    // takes the input event - typescript ensuring the types are correct
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    // deconstructing the event from the input element
    // takes the input elements name and it's new value
    const { name, value } = e.target;
    // initialises setEditedDrink, takes its previous state - ensuring the most recent state is used
    setEditedDrink((prevDrink) => ({
      // creates a light copy and spreads the data
      ...prevDrink,
      //then sets the object field and its value
      [name]: value,
      //e.g. if name == "drinkName" and value == "Mojito", this will set the property "drinkName": "Mojito" in the new object.
    }));
  };
  //
  //
  //
  // when the form data is submitted
  const handleSave = async (e: React.FormEvent) => {
    //prevents the page from rerender
    e.preventDefault();
    //executes onSave from useDrinks with the form data
    await onSave(editedDrink);
    //closes the edit modal
    setShowEditModal(false);
  };
  //
  //
  //shows the confirm delete modal when the delete button is pressed
  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };
  //
  //
  // used when the user confirms the delete in the ConfirmDeleteModal
  const handleConfirmDelete = () => {
    //passes the drink id to handleDelete in useDrinks
    onDelete(drink._id);
    //closes the modals
    setShowConfirmDelete(false);
    setShowEditModal(false);
  };
  //
  //
  //
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
