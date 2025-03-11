// import React, { useState } from "react";
// import { MdCancel } from "react-icons/md";
// import { GiConfirmed } from "react-icons/gi";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import "./edit-drinks-modal.css";
// import ConfirmDeleteModal from "./ConfirmDeleteModal";
// import { Drink } from "../types/types";

// interface EditDrinkModalProps {
//   drink: Drink;
//   onSave: (updatedDrink: Drink) => void;
//   setShowEditModal: (value: boolean) => void;
//   onCancel: () => void;
//   onDelete: (id: string) => void;
//   setConfirmDelete: (id: string) => void;
// }

// const EditDrinkModal: React.FC<EditDrinkModalProps> = ({
//   drink,
//   onSave,
//   setShowEditModal,
//   onCancel,
//   onDelete,
//   setConfirmDelete,
// }) => {
//   const [editedDrink, setEditedDrink] = useState<Drink>(drink);
//   const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);

//   const handleSave = async () => {
//     await onSave(editedDrink);
//     setShowEditModal(false);
//     // window.location.reload();
//   };

//   const handleDeleteClick = () => {
//     setConfirmDelete(drink._id);
//     setShowConfirmDelete(true);
//   };

//   return (
//     <form className="edit-drink-modal" onSubmit={handleSave}>
//       <div className="edit-drink-modal-content">
//         <label htmlFor="drinkName">
//           Drink Name
//           <input
//             className="edit-input define-name"
//             name="drinkName"
//             value={editedDrink.drinkName}
//             onChange={(e) =>
//               setEditedDrink({ ...editedDrink, drinkName: e.target.value })
//             }
//           />
//         </label>
//         <div className="category-glass-edit-field">
//           <div>
//             <label htmlFor="drinkCategory">Category</label>
//             <input
//               id="define-category"
//               name="drinkCategory"
//               className="edit-input define-category"
//               value={editedDrink.Category}
//               onChange={(e) =>
//                 setEditedDrink({ ...editedDrink, Category: e.target.value })
//               }
//             />
//           </div>
//           <div>
//             <label htmlFor="drinkGlass">Glass Type</label>
//             <input
//               className="edit-input define-glass"
//               name="drinkGlass"
//               id="define-glass"
//               value={editedDrink.Glass}
//               onChange={(e) =>
//                 setEditedDrink({ ...editedDrink, Glass: e.target.value })
//               }
//             />
//           </div>
//         </div>
//         <label htmlFor="drinkInstructions">Instructions</label>
//         <textarea
//           id="instructions"
//           name="drinkInstructions"
//           className="edit-input define-instructions"
//           value={editedDrink.Instructions}
//           onChange={(e) =>
//             setEditedDrink({ ...editedDrink, Instructions: e.target.value })
//           }
//         />
//         <label htmlFor="shortDescription">Description</label>
//         <textarea
//           id="shortDescription"
//           name="drinkShortDescription"
//           className="edit-input define-description"
//           value={editedDrink.shortDescription}
//           onChange={(e) =>
//             setEditedDrink({ ...editedDrink, shortDescription: e.target.value })
//           }
//         />

//         <div className="ingredients-section">
//           {[1, 2, 3, 4, 5, 6].map((index) => (
//             <div key={index} className="measure-input-table">
//               <input
//                 value={editedDrink[`Ingredient${index}` as keyof Drink] || ""}
//                 onChange={(e) =>
//                   setEditedDrink({
//                     ...editedDrink,
//                     [`Ingredient${index}` as keyof Drink]: e.target.value || "",
//                   })
//                 }
//                 placeholder={`Ingredient ${index}`}
//                 className="ingredient-section-input"
//               />
//               <input
//                 value={editedDrink[`Measure${index}` as keyof Drink] || ""}
//                 onChange={(e) =>
//                   setEditedDrink({
//                     ...editedDrink,
//                     [`Measure${index}` as keyof Drink]: e.target.value || "",
//                   })
//                 }
//                 placeholder={`Measure ${index}`}
//                 className="ingredient-section-input"
//               />
//               ml
//             </div>
//           ))}
//         </div>

//         <div className="modal-actions">
//           <button className="save-icon" type="submit">
//             <GiConfirmed />
//           </button>
//           <button className="cancel-icon" type="button" onClick={onCancel}>
//             <MdCancel />
//           </button>
//           <button
//             className="bin-icon"
//             type="button"
//             onClick={handleDeleteClick}
//           >
//             <RiDeleteBin6Line />
//           </button>
//         </div>
//       </div>

//       {showConfirmDelete && (
//         <ConfirmDeleteModal
//           drinkName={drink.drinkName}
//           onConfirm={() => {
//             onDelete(drink._id);
//             setShowConfirmDelete(false);
//             setShowEditModal(false);
//           }}
//           onCancel={() => setShowConfirmDelete(false)}
//         />
//       )}
//     </form>
//   );
// };

// export default EditDrinkModal;

import React from "react";
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
