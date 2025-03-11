import React from "react";
import "./selected-drink-modal.css";
import { IoMdClose } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { Drink } from "../../types/types";

interface SelectedDrinkModalProps {
  drink: Drink;
  onClose: () => void;
  onEdit: () => void;
  isGuest: boolean;
}

const SelectedDrinkModal: React.FC<SelectedDrinkModalProps> = ({
  drink,
  onClose,
  onEdit,
  isGuest,
}) => {
  return (
    <div className="drink-modal">
      <div className="modal-content">
        <div className="modal-header">
          <button className="close-drink-modal" onClick={onClose}>
            <IoMdClose />
          </button>
          {!isGuest && (
            <button className="edit-button" onClick={onEdit}>
              <FaEdit />
            </button>
          )}
        </div>
        <div className="drink-modal-info">
          <div className="table-left">
            <label htmlFor="define-category">Category:</label>
            <h3 id="define-category" className="drinks-category">
              {drink.Category || "Category Not Found"}
            </h3>
            <h2 className="selectedDrinks-name">{drink.drinkName}</h2>
            <label htmlFor="define-glass">Glassware:</label>
            <h3 id="define-glass" className="selectedDrinks-glass">
              {drink.Glass}
            </h3>
            <p className="selectedDrinks-instructions">{drink.Instructions}</p>
          </div>
          <div className="table-right">
            <div className="selectedDrink-image-container">
              <img
                src={
                  drink.DrinkThumb ||
                  "https://www.creativefabrica.com/wp-content/uploads/2021/07/01/Cocktail-icon-Graphics-14120200-1-1-580x387.jpg"
                }
                alt={drink.drinkName}
                className="selectedDrinks-image"
              />
              <div className="measure-ingredient-list">
                <div className="measure-ingredient-col">
                  {[1, 2, 3, 4, 5, 6].map((index) => {
                    const ingredient =
                      drink[`Ingredient${index}` as keyof Drink];
                    return ingredient ? <p key={index}>{ingredient}</p> : null;
                  })}
                </div>
                <div className="measure-ingredient-col">
                  {[1, 2, 3, 4, 5, 6].map((index) => {
                    const measure = drink[`Measure${index}` as keyof Drink];
                    return measure ? <p key={index}>{measure}ml</p> : null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedDrinkModal;
