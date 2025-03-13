import React, { useRef } from "react";
import { useEditDrink } from "../../../hooks/useEditDrink";
import { MdCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmDeleteModal from "./ConfirmDeleteModal/ConfirmDeleteModal";
import { Drink } from "../../types/types";
import "./edit-drinks-modal.css";

interface EditDrinkFormProps {
  drink: Drink;
  onSave: (updatedDrink: Drink) => void;
  setShowEditModal: (value: boolean) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}

const EditDrinkForm: React.FC<EditDrinkFormProps> = ({
  drink,
  onSave,
  setShowEditModal,
  onCancel,
  onDelete,
}) => {
  const {
    editedDrink,
    handleChange,
    handleSave,
    handleDeleteClick,
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
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="measure-input-table">
              <input
                name={`Ingredient${index}`}
                value={editedDrink[`Ingredient${index}` as keyof Drink] || ""}
                onChange={handleChange}
                placeholder={`Ingredient ${index}`}
                className="ingredient-section-input"
              />
              <input
                name={`Measure${index}`}
                value={editedDrink[`Measure${index}` as keyof Drink] || ""}
                onChange={handleChange}
                placeholder={`Measure ${index}`}
                className="ingredient-section-input"
              />
              ml
            </div>
          ))}
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
