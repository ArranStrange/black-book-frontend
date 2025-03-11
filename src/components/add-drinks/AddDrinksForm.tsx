import React, { useState } from "react";
import { API_URL } from "../../utils/config";
import MessageModal from "../message/MessageModal";
import axios from "axios";
import "./add-drinks.css";

interface AddDrinkFormProps {
  toggleAddDrinkForm: () => void;
}

const AddDrinkForm: React.FC<AddDrinkFormProps> = ({ toggleAddDrinkForm }) => {
  const [formData, setFormData] = useState({
    idDrink: Date.now().toString(),
    drinkName: "",
    shortDescription: "",
    Category: "",
    Glass: "",
    Ice: "",
    Ingredient1: "",
    Ingredient2: "",
    Ingredient3: "",
    Ingredient4: "",
    Ingredient5: "",
    Ingredient6: "",
    Measure1: 0,
    Measure2: 0,
    Measure3: 0,
    Measure4: 0,
    Measure5: 0,
    Measure6: 0,
    DrinkThumb: "",
    Rating: 0,
    Instructions: "",
  });

  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/api/drinks`, formData);
      setModalMessage("Drink added successfully!");
      setModalTitle("success");

      setFormData({
        idDrink: Date.now().toString(),
        drinkName: "",
        shortDescription: "",
        Category: "",
        Glass: "",
        Ice: "",
        Ingredient1: "",
        Ingredient2: "",
        Ingredient3: "",
        Ingredient4: "",
        Ingredient5: "",
        Ingredient6: "",
        Measure1: 0,
        Measure2: 0,
        Measure3: 0,
        Measure4: 0,
        Measure5: 0,
        Measure6: 0,
        DrinkThumb: "",
        Rating: 10,
        Instructions: "",
      });
    } catch (error) {
      console.error("Error adding drink:", error);
      setModalTitle("error");
      setModalMessage("Failed to add drink.");
    }
  };

  const handleCloseModal = () => {
    setModalMessage(null);
    setModalTitle(null);

    if (modalTitle === "success") {
      toggleAddDrinkForm();
    }
  };

  return (
    <>
      <form className="add-drinks-form" onSubmit={handleSubmit}>
        <label>
          Drink Name:
          <input
            type="text"
            name="drinkName"
            value={formData.drinkName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category:
          <select
            name="Category"
            value={formData.Category}
            onChange={handleChange}
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
            required
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
            required
          />
        </label>

        <button type="submit">Add Drink</button>
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
