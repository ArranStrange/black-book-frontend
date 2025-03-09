import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import "/Users/arranstrange/Documents/Coding/black-book/black-book/src/components/drinks-list/edit-drinks-modal.css";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { Drink } from "../types/types";

interface EditDrinkModalProps {
  drink: Drink;
  onSave: (updatedDrink: Drink) => void;
  setShowEditModal: (value: boolean) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
  setConfirmDelete: (id: string) => void;
}

const EditDrinkModal: React.FC<EditDrinkModalProps> = ({
  drink,
  onSave,
  setShowEditModal,
  onCancel,
  onDelete,
  setConfirmDelete,
}) => {
  const [editedDrink, setEditedDrink] = useState<Drink>(drink);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const handleSave = async () => {
    await onSave(editedDrink);
    setShowEditModal(false);
    // window.location.reload();
  };

  const handleDeleteClick = () => {
    setConfirmDelete(drink._id);
    setShowConfirmDelete(true);
  };

  return (
    <div className="edit-drink-modal">
      <div className="edit-drink-modal-content">
        <label htmlFor="drinkName">Drink Name</label>
        <input
          className="edit-input define-name"
          name="drinkName"
          value={editedDrink.drinkName}
          onChange={(e) =>
            setEditedDrink({ ...editedDrink, drinkName: e.target.value })
          }
        />
        <div className="category-glass-edit-field">
          <div>
            <label htmlFor="drinkCategory">Category</label>
            <input
              id="define-category"
              name="drinkCategory"
              className="edit-input define-category"
              value={editedDrink.Category}
              onChange={(e) =>
                setEditedDrink({ ...editedDrink, Category: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="drinkGlass">Glass Type</label>
            <input
              className="edit-input define-glass"
              name="drinkGlass"
              id="define-glass"
              value={editedDrink.Glass}
              onChange={(e) =>
                setEditedDrink({ ...editedDrink, Glass: e.target.value })
              }
            />
          </div>
        </div>
        <label htmlFor="drinkInstructions">Instructions</label>
        <textarea
          id="instructions"
          name="drinkInstructions"
          className="edit-input define-instructions"
          value={editedDrink.Instructions}
          onChange={(e) =>
            setEditedDrink({ ...editedDrink, Instructions: e.target.value })
          }
        />
        <label htmlFor="shortDescription">Description</label>
        <textarea
          id="shortDescription"
          name="drinkShortDescription"
          className="edit-input define-description"
          value={editedDrink.shortDescription}
          onChange={(e) =>
            setEditedDrink({ ...editedDrink, shortDescription: e.target.value })
          }
        />

        <div className="ingredients-section">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="measure-input-table">
              <input
                value={editedDrink[`Ingredient${index}` as keyof Drink] || ""}
                onChange={(e) =>
                  setEditedDrink({
                    ...editedDrink,
                    [`Ingredient${index}` as keyof Drink]: e.target.value || "",
                  })
                }
                placeholder={`Ingredient ${index}`}
                className="ingredient-section-input"
              />
              <input
                value={editedDrink[`Measure${index}` as keyof Drink] || ""}
                onChange={(e) =>
                  setEditedDrink({
                    ...editedDrink,
                    [`Measure${index}` as keyof Drink]: e.target.value || "",
                  })
                }
                placeholder={`Measure ${index}`}
                className="ingredient-section-input"
              />
              ml
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button className="save-icon" onClick={handleSave}>
            <GiConfirmed />
          </button>
          <button className="cancel-icon" onClick={onCancel}>
            <MdCancel />
          </button>
          <button className="bin-icon" onClick={handleDeleteClick}>
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>

      {showConfirmDelete && (
        <ConfirmDeleteModal
          drinkName={drink.drinkName}
          onConfirm={() => onDelete(drink._id)}
          onCancel={() => setShowConfirmDelete(false)}
        />
      )}
    </div>
  );
};

export default EditDrinkModal;
