import React from "react";
import "./selected-drink-modal.css";
import { IoMdClose } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { Drink } from "../../types/types";
//
//
//typescript defining the props
interface SelectedDrinkModalProps {
  drink: Drink;
  onClose: () => void;
  onEdit: () => void;
  isGuest: boolean;
}
//
//
const SelectedDrinkModal: React.FC<SelectedDrinkModalProps> = ({
  drink, // selected drink object recieved through props
  onClose, // handle close modal function passed from drinksList
  onEdit, // on edit passed from drinks list
  isGuest, // isGuest state passed from drinks list
}) => {
  return (
    <div data-testid="selected-drink-modal" className="drink-modal">
      <div className="modal-content">
        <div className="modal-header">
          <button className="close-drink-modal" onClick={onClose}>
            <IoMdClose />
          </button>
          {!isGuest && (
            //edit modal only displayed if the localstorage token isn't guest
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
                  {
                    //maps over a fixed range of the ingredients allowing 6 properties only
                    // for each iteration i stores the current number
                    [1, 2, 3, 4, 5, 6].map((i) => {
                      //stores the drink ingredient name and index (as keyof Drink - typescript type checking)
                      const ingredient = drink[`Ingredient${i}` as keyof Drink];
                      //if ingredient is truthy, returns the <p> with the ingredient name stored
                      //key used to help react identify each element uniquly using  i
                      return ingredient ? <p key={i}>{ingredient}</p> : null;
                      //if ingredient is falsy will return null
                    })
                  }
                </div>
                <div className="measure-ingredient-col">
                  {
                    // maps over a fixed range of the measurement allowing 6 properties only
                    // for each iteration i stores the current number
                    [1, 2, 3, 4, 5, 6].map((i) => {
                      //stores the drink measurement and index (as keyof Drink - typescript type checking)
                      const measure = drink[`Measure${i}` as keyof Drink];
                      //if measurement is truthy, return the <p> element, if falsy return null
                      return measure ? <p key={i}>{measure}ml</p> : null;
                    })
                  }
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
