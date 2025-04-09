import React from "react";
import { useEditDrink } from "../../../hooks/useEditDrink";
import { MdCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmDeleteModal from "./ConfirmDeleteModal/ConfirmDeleteModal";
import { Drink } from "../../types/types";
import "./edit-drinks-modal.css";

//typescript drfining props
//Props from DrinksList.tsx
interface EditDrinkFormProps {
  drink: Drink;
  onSave: (updatedDrink: Drink) => void;
  setShowEditModal: (value: boolean) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}

const EditDrinkForm: React.FC<EditDrinkFormProps> = ({
  drink, // selected drinks object recieved through props
  onSave, // a callback function that receives the updated drink on submition
  setShowEditModal, // toggle for the edit modal
  onCancel, // on cancel delete function
  onDelete, // on delete function
}) => {
  // initiating the useEditDrink hook
  const {
    editedDrink, // state representing the drink being edited
    handleChange, // the function to updated editedDrink on change
    handleSave, // on submittion of the form triggers the onSave callback
    handleDeleteClick, // handles the delete modal open
    handleConfirmDelete,
    showConfirmDelete,
    setShowConfirmDelete,
  } = useEditDrink(drink, onSave, setShowEditModal, onDelete);

  return (
    <form className="edit-drink-modal" onSubmit={(e) => handleSave(e)}>
      <div className="edit-drink-modal-content">
        <label>
          Drink Name
          <input
            className="edit-input define-name"
            name="drinkName"
            value={editedDrink.drinkName}
            onChange={handleChange}
          />
        </label>

        <div className="category-glass-edit-field">
          <label>
            Category
            <input
              className="edit-input define-category"
              name="Category"
              value={editedDrink.Category}
              onChange={handleChange}
            />
          </label>
          <label>
            Glass Type
            <input
              className="edit-input define-glass"
              name="Glass"
              value={editedDrink.Glass}
              onChange={handleChange}
            />
          </label>
        </div>

        <label>
          Instructions
          <textarea
            className="edit-input define-instructions"
            name="Instructions"
            value={editedDrink.Instructions}
            onChange={handleChange}
          />
        </label>

        <label>
          Description
          <textarea
            className="edit-input define-description"
            name="shortDescription"
            value={editedDrink.shortDescription}
            onChange={handleChange}
          />
        </label>

        <div className="ingredients-section">
          {
            //maps over a fixed range of the ingredients allowing 6 properties only
            // for each iteration i stores the current number
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="measure-input-table">
                <input
                  name={`Ingredient${i}`}
                  // stores the drink ingredient index (as keyof Drink - typescript type checking)
                  // accesses the corresponding property from editedDrink
                  value={editedDrink[`Ingredient${i}` as keyof Drink] || ""}
                  onChange={handleChange}
                  placeholder={`Ingredient ${i}`}
                  // sets the place holder to Ingredient + the i value
                  className="ingredient-section-input"
                />
                <input
                  name={`Measure${i}`}
                  // stores the drink measurement index (as keyof Drink - typescript type checking)
                  value={editedDrink[`Measure${i}` as keyof Drink] || ""}
                  onChange={handleChange}
                  placeholder={`Measure ${i}`}
                  className="ingredient-section-input"
                />
                ml
              </div>
            ))
          }
        </div>

        <div className="modal-actions">
          <button type="submit" className="save-icon">
            <GiConfirmed />
          </button>
          <button type="button" className="cancel-icon" onClick={onCancel}>
            <MdCancel />
          </button>
          <button
            type="button"
            className="bin-icon"
            onClick={handleDeleteClick}
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>

      {showConfirmDelete && (
        <ConfirmDeleteModal
          drinkName={drink.drinkName}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirmDelete(false)}
        />
      )}
    </form>
  );
};

export default EditDrinkForm;
