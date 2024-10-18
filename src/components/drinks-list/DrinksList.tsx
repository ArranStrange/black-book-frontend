import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import axios from "axios";
import "./drinks-list.css";

interface Drink {
  _id: string;
  idDrink: string;
  drinkName: string;
  Category: string;
  Glass: string;
  Ice: string;
  Ingredient1: string;
  Ingredient2: string;
  Ingredient3: string;
  Ingredient4: string;
  Ingredient5: string;
  Ingredient6: string;
  Measure1: number;
  Measure2: number;
  Measure3: number;
  Measure4: number;
  Measure5: string;
  Measure6: number;
  DrinkThumb: string;
  Rating: number;
  Instructions: string;
}

interface DrinksListProps {
  selectedLetter: string;
  searchQuery: string;
}

const DrinksList: React.FC<DrinksListProps> = ({
  selectedLetter,
  searchQuery,
}) => {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const isGuest = localStorage.getItem("authToken") === "guest";

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
    if (confirmDelete === id) {
      // If already confirmed, delete the drink
      console.log(`Deleting drink with ID: ${id}`);
      try {
        await axios.delete(`http://localhost:8080/drinks/${id}`);
        setDrinks(drinks.filter((drink) => drink._id !== id));
        setConfirmDelete(null);
      } catch (error) {
        console.error("Error deleting drink:", error);
        setError("Error deleting drink: " + (error as Error).message);
      }
    } else {
      setConfirmDelete(id);
    }
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const filteredDrinks = drinks.filter((drink) => {
    const matchesLetter = selectedLetter
      ? drink.drinkName.toUpperCase().startsWith(selectedLetter.toUpperCase())
      : true;

    const matchesSearch = searchQuery
      ? drink.drinkName.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesLetter && matchesSearch;
  });
  const sortedDrinks = [...filteredDrinks].sort((a, b) =>
    a.drinkName.localeCompare(b.drinkName)
  );

  return (
    <div className="drinks-list">
      <table>
        <tbody>
          {sortedDrinks.map((drink) => (
            <tr key={drink._id} className="drinks-container">
              <td className="drinks-info">
                <h1 className="drinks-name">{drink.drinkName}</h1>
                <h3 className="drinks-glass">{drink.Glass}</h3>
                <p className="drinks-instructions">{drink.Instructions}</p>
              </td>
              <div className="table-right">
                <img
                  src={drink.DrinkThumb}
                  alt={drink.drinkName}
                  className="drinks-image"
                />
                <div className="measure-ingredient-list">
                  <td className="measure-ingredient-col">
                    <p>{drink.Measure1}</p>
                    <p>{drink.Measure2}</p>
                    <p>{drink.Measure3}</p>
                    <p>{drink.Measure4}</p>
                    <p>{drink.Measure5}</p>
                    <p>{drink.Measure6}</p>
                  </td>
                  <td className="measure-ingredient-col">
                    <p>{drink.Ingredient1}</p>
                    <p>{drink.Ingredient2}</p>
                    <p>{drink.Ingredient3}</p>
                    <p>{drink.Ingredient4}</p>
                    <p>{drink.Ingredient5}</p>
                    <p>{drink.Ingredient6}</p>
                  </td>
                </div>
                <td>
                  {!isGuest && confirmDelete !== drink._id && (
                    <button
                      className="bin-icon"
                      onClick={() => handleDelete(drink._id)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  )}
                  {confirmDelete === drink._id && (
                    <div className="confirmation-message">
                      <p>Confirm Delete</p>
                      <button
                        style={{ fontSize: "2rem" }}
                        onClick={() => handleDelete(drink._id)}
                      >
                        <GiConfirmed />
                      </button>
                      <button
                        style={{ fontSize: "2.2rem" }}
                        onClick={cancelDelete}
                      >
                        <MdCancel />
                      </button>
                    </div>
                  )}
                </td>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DrinksList;
