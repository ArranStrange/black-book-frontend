import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./drinks-list.css";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

// Drink interface
interface Drink {
  _id: string;
  idDrink?: string;
  drinkName: string;
  Category: string;
  Glass: string;
  Instructions: string;
  Ingredient1?: string;
  Ingredient2?: string;
  Ingredient3?: string;
  Ingredient4?: string;
  Ingredient5?: string;
  Ingredient6?: string;
  Measure1?: string | number;
  Measure2?: string | number;
  Measure3?: string | number;
  Measure4?: string | number;
  Measure5?: string | number;
  Measure6?: string | number;
  DrinkThumb?: string;
  Rating?: number;
  Ice?: string;
}

interface EditDrinkModalProps {
  drink: Drink;
  onSave: (updatedDrink: Drink) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
  setConfirmDelete: (id: string) => void;
}

const EditDrinkModal: React.FC<EditDrinkModalProps> = ({
  drink,
  onSave,
  onCancel,
  onDelete,
  setConfirmDelete,
}) => {
  const [editedDrink, setEditedDrink] = useState<Drink>(drink);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

  const handleSave = () => {
    onSave(editedDrink);
    window.location.reload();
  };

  const handleDeleteClick = () => {
    setConfirmDelete(drink._id);
    setShowConfirmDelete(true);
  };

  return (
    <div className="modal">
      <input
        className="edit-input define-name"
        value={editedDrink.drinkName}
        onChange={(e) =>
          setEditedDrink({ ...editedDrink, drinkName: e.target.value })
        }
      />
      <input
        id="define-category"
        className="edit-input define-category"
        value={editedDrink.Category}
        onChange={(e) =>
          setEditedDrink({ ...editedDrink, Category: e.target.value })
        }
      />
      <input
        className="edit-input define-glass"
        id="define-glass"
        value={editedDrink.Glass}
        onChange={(e) =>
          setEditedDrink({ ...editedDrink, Glass: e.target.value })
        }
      />
      <textarea
        id="instructions"
        className="edit-input define-instructions"
        value={editedDrink.Instructions}
        onChange={(e) =>
          setEditedDrink({ ...editedDrink, Instructions: e.target.value })
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
