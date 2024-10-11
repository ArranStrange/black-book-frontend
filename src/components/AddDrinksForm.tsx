// src/components/AddDrinkForm.tsx

import React, { useState } from "react";
import axios from "axios";

const AddDrinkForm: React.FC = () => {
  const [formData, setFormData] = useState({
    idDrink: Date.now().toString(), // Automatically generate a unique ID
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

  const [error, setError] = useState<string | null>(null); // State for error messages
  const [success, setSuccess] = useState<string | null>(null); // State for success messages

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
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post(
        "http://localhost:8080/drinks",
        formData
      );
      console.log("Drink added:", response.data);
      setSuccess("Drink added successfully!"); // Success message

      // Optionally reset the form
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
        Rating: 0,
        Instructions: "",
      });
      setError(null); // Clear error message
    } catch (error) {
      console.error("Error adding drink:", error);
      setError("Failed to add drink. Please try again."); // Set error message
      setSuccess(null); // Clear success message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Drink</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
      {success && <p style={{ color: "green" }}>{success}</p>}{" "}
      {/* Display success message */}
      <input
        type="text"
        name="drinkName"
        placeholder="Drink Name"
        value={formData.drinkName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="Catagory"
        placeholder="Category"
        value={formData.Catagory}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="Glass"
        placeholder="Glass Type"
        value={formData.Glass}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="Ice"
        placeholder="Ice Type"
        value={formData.Ice}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="Ingredient1"
        placeholder="Ingredient 1"
        value={formData.Ingredient1}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="Ingredient2"
        placeholder="Ingredient 2"
        value={formData.Ingredient2}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Ingredient3"
        placeholder="Ingredient 3"
        value={formData.Ingredient3}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Ingredient4"
        placeholder="Ingredient 4"
        value={formData.Ingredient4}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Ingredient5"
        placeholder="Ingredient 5"
        value={formData.Ingredient5}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Ingredient6"
        placeholder="Ingredient 6"
        value={formData.Ingredient6}
        onChange={handleChange}
      />
      <input
        type="number"
        name="Measure1"
        placeholder="Measure 1"
        value={formData.Measure1}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="Measure2"
        placeholder="Measure 2"
        value={formData.Measure2}
        onChange={handleChange}
      />
      <input
        type="number"
        name="Measure3"
        placeholder="Measure 3"
        value={formData.Measure3}
        onChange={handleChange}
      />
      <input
        type="number"
        name="Measure4"
        placeholder="Measure 4"
        value={formData.Measure4}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Measure5"
        placeholder="Measure 5"
        value={formData.Measure5}
        onChange={handleChange}
      />
      <input
        type="number"
        name="Measure6"
        placeholder="Measure 6"
        value={formData.Measure6}
        onChange={handleChange}
      />
      <input
        type="text"
        name="DrinkThumb"
        placeholder="Drink Thumbnail URL"
        value={formData.DrinkThumb}
        onChange={handleChange}
      />
      <input
        type="number"
        name="Rating"
        placeholder="Rating (0-10)"
        value={formData.Rating}
        onChange={handleChange}
        required
      />
      <textarea
        name="Instructions"
        placeholder="Instructions"
        value={formData.Instructions}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Drink</button>
    </form>
  );
};

export default AddDrinkForm;
