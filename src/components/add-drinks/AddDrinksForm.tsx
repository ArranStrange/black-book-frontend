import React, { useState } from "react";
import axios from "axios";
import "./add-drinks.css";

const AddDrinkForm: React.FC = () => {
  const [formData, setFormData] = useState({
    idDrink: Date.now().toString(), //UID
    drinkName: "",
    Catagory: "",
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
    Measure5: "",
    Measure6: 0,
    DrinkThumb: "",
    Rating: 0,
    Instructions: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const API_URL = "https://black-book-backend.onrender.com";

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
      const response = await axios.post(`${API_URL}/drinks`, formData);
      console.log("Drink added:", response.data);
      setSuccess("Drink added successfully!");

      setFormData({
        idDrink: Date.now().toString(),
        drinkName: "",
        Catagory: "",
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
        Measure5: "",
        Measure6: 0,
        DrinkThumb: "",
        Rating: 10,
        Instructions: "",
      });
      setError(null);
    } catch (error) {
      console.error("Error adding drink:", error);
      setError("Failed to add drink. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <>
      <form className="add-drinks-form" onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <label>
          Drink Name:
          <input
            type="text"
            name="drinkName"
            // placeholder="Drink Name"
            value={formData.drinkName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Catagory:
          <select
            name="Catagory"
            value={formData.Catagory}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Catagory
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
            // placeholder="Ingredient 1"
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
              // placeholder="Measure 1"
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
            // placeholder="Ingredient 2"
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
              // placeholder="Measure 2"
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
            // placeholder="Ingredient 3"
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
              // placeholder="Measure 3"
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
            // placeholder="Ingredient 4"
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
              // placeholder="Measure 4"
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
            // placeholder="Ingredient 5"
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
              // placeholder="Measure 5"
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
            // placeholder="Ingredient 6"
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
              // placeholder="Measure 6"
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
            // placeholder="Drink Thumbnail URL"
            value={formData.DrinkThumb}
            onChange={handleChange}
          />
        </label>

        <label>
          Rating (0-10):
          <input
            type="number"
            name="Rating"
            // placeholder="Rating (0-10)"
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
            // placeholder="Instructions"
            value={formData.Instructions}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Add Drink</button>
      </form>
    </>
  );
};

export default AddDrinkForm;
