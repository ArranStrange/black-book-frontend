import React, { useEffect, useState } from "react";
import axios from "axios";
import AddDrinkForm from "./components/AddDrinksForm";
import "./App.css";

interface Drink {
  _id: string; // MongoDB unique identifier
  idDrink: string; // Unique ID for the drink
  drinkName: string; // Name of the drink
  Catagory: string; // Category of the drink
  Glass: string; // Type of glass for the drink
  Ice: string; // Ice type (e.g., Crushed)
  Ingredient1: string; // First ingredient
  Ingredient2: string; // Second ingredient
  Ingredient3: string; // Third ingredient
  Ingredient4: string; // Fourth ingredient
  Ingredient5: string; // Fifth ingredient
  Ingredient6: string; // Sixth ingredient (if any)
  Measure1: number; // Measurement for the first ingredient
  Measure2: number; // Measurement for the second ingredient
  Measure3: number; // Measurement for the third ingredient
  Measure4: number; // Measurement for the fourth ingredient
  Measure5: string; // Measurement for the fifth ingredient
  Measure6: number; // Measurement for the sixth ingredient
  DrinkThumb: string; // URL or path to the drink thumbnail
  Rating: number; // Rating of the drink
  Instructions: string; // Instructions for making the drink
}

const App: React.FC = () => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/drinks");
        setDrinks(response.data);
      } catch (error) {
        setError("Error fetching drinks: " + (error as Error).message);
        console.error("Error fetching drinks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  const handleDelete = async (id: string) => {
    console.log(`Deleting drink with ID: ${id}`); // Log the ID to check
    try {
      await axios.delete(`http://localhost:8080/drinks/${id}`);
      setDrinks(drinks.filter((drink) => drink._id !== id));
    } catch (error) {
      console.error("Error deleting drink:", error);
      setError("Error deleting drink: " + (error as Error).message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Drinks</h1>
      <AddDrinkForm />
      <ul>
        {drinks.map((drink) => (
          <li key={drink._id}>
            <h2>{drink.drinkName}</h2>
            <p>
              <strong>Category:</strong> {drink.Catagory}
            </p>
            <p>
              <strong>Glass:</strong> {drink.Glass}
            </p>
            <p>
              <strong>Ice:</strong> {drink.Ice}
            </p>
            <p>
              <strong>Ingredients:</strong> {drink.Ingredient1},{" "}
              {drink.Ingredient2}, {drink.Ingredient3}, {drink.Ingredient4},{" "}
              {drink.Ingredient5}, {drink.Ingredient6}
            </p>
            <p>
              <strong>Measurements:</strong> {drink.Measure1}, {drink.Measure2},{" "}
              {drink.Measure3}, {drink.Measure4}, {drink.Measure5},{" "}
              {drink.Measure6}
            </p>
            <p>
              <strong>Rating:</strong> {drink.Rating}
            </p>
            <p>
              <strong>Instructions:</strong> {drink.Instructions}
            </p>
            {/* Add delete button */}
            <button onClick={() => handleDelete(drink._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
