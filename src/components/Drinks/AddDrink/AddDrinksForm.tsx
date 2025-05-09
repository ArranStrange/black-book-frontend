import React from "react";
import { useAddDrink } from "../../../hooks/useAddDrink";
import MessageModal from "../../message/MessageModal";
import "./add-drinks.css";

interface AddDrinkFormProps {
  toggleAddDrinkForm: () => void;
}

const AddDrinkForm: React.FC<AddDrinkFormProps> = ({ toggleAddDrinkForm }) => {
  const {
    formData,
    handleChange,
    handleSubmit,
    modalTitle,
    modalMessage,
    handleCloseModal,
  } = useAddDrink(toggleAddDrinkForm);

  return (
    <>
      <form
        className="add-drinks-form"
        onSubmit={
          handleSubmit
          // on submit triggers the function in useAddDrink
        }
      >
        <label>
          Drink Name:
          <input
            type="text"
            name="drinkName"
            data-testid="drink-name"
            // name is passed to the useAddDrink, handleChange function
            value={
              formData.drinkName
              // each input value is one of formData in the useAddDrink hook
              // onSubmit the form state is updated with the corresponding inputs data
            }
            onChange={
              handleChange
              //handle change function in the useAddDrink hook
            }
            required
          />
        </label>

        <label>
          Category:
          <select
            name="Category"
            value={formData.Category}
            onChange={handleChange}
            data-testid="drink-category"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="cobbler">Cobbler</option>
            <option value="collins">Collins</option>
            <option value="daisy">Daisy</option>
            <option value="flip">Flip</option>
            <option value="frozen">Frozen</option>
            <option value="highball">Highball</option>
            <option value="julep">Julep</option>
            <option value="martini">Martini</option>
            <option value="punch">Punch</option>
            <option value="sling">Sling</option>
            <option value="sour">Sour</option>
            <option value="tiki">Tiki</option>
            <option value="toddy">Toddy</option>
            <option value="spritz">Spritz</option>
            <option value="fizz">Fizz</option>
          </select>
        </label>

        <label>
          Glass Type:
          <select
            name="Glass"
            value={formData.Glass}
            onChange={handleChange}
            data-testid="drink-glass"
            required
          >
            <option value="" disabled>
              Select Glass Type
            </option>
            <option value="highball">Highball</option>
            <option value="coup">Coup</option>
            <option value="hurricane">Hurricane</option>
            <option value="old fashioned">Old Fashioned</option>
            <option value="julep tin">Julep Tin</option>
            <option value="wine">Wine Glass</option>
            <option value="flute">Flute</option>
          </select>
        </label>

        <label>
          Ice Type:
          <select
            name="Ice"
            value={formData.Ice}
            onChange={handleChange}
            data-testid="drink-ice"
          >
            <option value="" disabled>
              Select Ice Type
            </option>
            <option value="cubed">Cubed</option>
            <option value="crushed">Crushed</option>
            <option value="block">Block</option>
            <option value="shaved">Shaved</option>
            <option value="straight">Straight Up</option>
          </select>
        </label>

        <label>
          Ingredient 1:
          <input
            type="text"
            name="Ingredient1"
            value={formData.Ingredient1}
            onChange={handleChange}
            data-testid="ingredient-1"
            required
          />
        </label>

        <div className="measurements">
          <label>
            Measure 1:
            <input
              type="number"
              name="Measure1"
              value={formData.Measure1}
              onChange={handleChange}
              data-testid="measure-1"
              required
            />
          </label>
          ml
        </div>

        <label>
          Ingredient 2:
          <input
            type="text"
            name="Ingredient2"
            data-testid="ingredient-2"
            value={formData.Ingredient2}
            onChange={handleChange}
          />
        </label>
        <div className="measurements">
          <label>
            Measure 2:
            <input
              type="number"
              name="Measure2"
              data-testid="measure-2"
              value={formData.Measure2}
              onChange={handleChange}
            />
          </label>
          ml
        </div>

        <label>
          Ingredient 3:
          <input
            type="text"
            name="Ingredient3"
            data-testid="ingredient-3"
            value={formData.Ingredient3}
            onChange={handleChange}
          />
        </label>
        <div className="measurements">
          <label>
            Measure 3:
            <input
              type="number"
              name="Measure3"
              data-testid="measure-3"
              value={formData.Measure3}
              onChange={handleChange}
            />
          </label>
          ml
        </div>

        <label>
          Ingredient 4:
          <input
            type="text"
            name="Ingredient4"
            value={formData.Ingredient4}
            onChange={handleChange}
          />
        </label>
        <div className="measurements">
          <label>
            Measure 4:
            <input
              type="number"
              name="Measure4"
              value={formData.Measure4}
              onChange={handleChange}
            />
          </label>
          ml
        </div>

        <label>
          Ingredient 5:
          <input
            type="text"
            name="Ingredient5"
            value={formData.Ingredient5}
            onChange={handleChange}
          />
        </label>
        <div className="measurements">
          <label>
            Measure 5:
            <input
              type="number"
              name="Measure5"
              value={formData.Measure5}
              onChange={handleChange}
            />
          </label>
          ml
        </div>

        <label>
          Ingredient 6:
          <input
            type="text"
            name="Ingredient6"
            value={formData.Ingredient6}
            onChange={handleChange}
          />
        </label>
        <div className="measurements">
          <label>
            Measure 6:
            <input
              type="number"
              name="Measure6"
              value={formData.Measure6}
              onChange={handleChange}
            />
          </label>
          ml
        </div>

        <label>
          Drink Thumbnail URL:
          <input
            type="text"
            name="DrinkThumb"
            data-testid="drink-thumb"
            value={formData.DrinkThumb}
            onChange={handleChange}
          />
        </label>

        <label>
          Rating (0-10):
          <input
            type="number"
            name="Rating"
            value={formData.Rating}
            onChange={handleChange}
            data-testid="drink-rating"
            required
            min="0"
            max="10"
          />
        </label>

        <label>
          Instructions:
          <textarea
            name="Instructions"
            id="instructions"
            value={formData.Instructions}
            onChange={handleChange}
            data-testid="drink-instructions"
            required
          />
        </label>

        <button type="submit" data-testid="drink-submit-button">
          Add Drink
        </button>
      </form>

      {modalMessage && modalTitle && (
        <MessageModal
          message={modalMessage}
          title={modalTitle}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default AddDrinkForm;
