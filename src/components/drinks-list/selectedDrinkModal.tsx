import React from "react";
import "./selected-drink-modal.css";
import { IoMdClose } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { Drink } from "../types/types";

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
  const toTitleCase = (str?: string) =>
    str
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

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
              {toTitleCase(drink.Category || "Category Not Found")}
            </h3>
            <h2 className="selectedDrinks-name">{drink.drinkName}</h2>
            <label htmlFor="define-glass">Glassware:</label>
            <h3 id="define-glass" className="selectedDrinks-glass">
              {toTitleCase(drink.Glass)}
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
                  <p>{toTitleCase(drink.Ingredient1)}</p>
                  <p>{toTitleCase(drink.Ingredient2)}</p>
                  <p>{toTitleCase(drink.Ingredient3)}</p>
                  <p>{toTitleCase(drink.Ingredient4)}</p>
                  <p>{toTitleCase(drink.Ingredient5)}</p>
                  <p>{toTitleCase(drink.Ingredient6)}</p>
                </div>
                <div className="measure-ingredient-col">
                  {drink.Measure1 && <p>{drink.Measure1}ml</p>}
                  {drink.Measure2 && <p>{drink.Measure2}ml</p>}
                  {drink.Measure3 && <p>{drink.Measure3}ml</p>}
                  {drink.Measure4 && <p>{drink.Measure4}ml</p>}
                  {drink.Measure5 && <p>{drink.Measure5}ml</p>}
                  {drink.Measure6 && <p>{drink.Measure6}ml</p>}
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
