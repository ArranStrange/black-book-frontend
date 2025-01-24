import React, { useEffect, useMemo, useState } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import "./drinks-list.css";
import EditDrinkModal from "./EditDrinksModal";

interface Drink {
  _id: string;
  idDrink?: string;
  drinkName: string;
  Category: string;
  Glass: string;
  Ice?: string;
  Ingredient1?: string;
  Ingredient2?: string;
  Ingredient3?: string;
  Ingredient4?: string;
  Ingredient5?: string;
  Ingredient6?: string;
  Measure1?: string | number;
  Measure2?: string | number;
  Measure3?: string | number;
  Measure4?: string | number;
  Measure5?: string | number;
  Measure6?: string | number;
  DrinkThumb?: string;
  Rating?: number;
  Instructions: string;
}

interface DrinksListProps {
  selectedLetter: string;
  searchQuery: {
    drinkName?: string;
    category?: string;
    glass?: string;
    ice?: string;
  };
}

const DrinksList: React.FC<DrinksListProps> = ({
  selectedLetter,
  searchQuery,
}) => {
  const isGuest = localStorage.getItem("authToken") === "guest";
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingDrinkId, setEditingDrinkId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  // const API_URL = process.env.API_BASE_URL;
  const API_URL = "https://black-book-backend.onrender.com";
  // const API_URL = "http://localhost:1000";

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await axios.get(`${API_URL}/drinks`);
        console.log(response);
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
    setConfirmDelete(id);
    if (confirmDelete === id) {
      console.log(`Deleting drink with ID: ${id}`);
      try {
        await axios.delete(`${API_URL}/drinks/${id}`);
        setDrinks(drinks.filter((drink) => drink._id !== id));
        setConfirmDelete(null);
      } catch (error) {
        console.error("Error deleting drink:", error);
        setError("Error deleting drink: " + (error as Error).message);
      }
    }
    window.location.reload();
  };

  const handleEditClick = (drink: Drink) => {
    setEditingDrinkId(drink._id);
    setSelectedDrink(drink);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (updatedDrink: Drink) => {
    try {
      console.log("this is the", updatedDrink);
      const response = await axios.put(
        `${API_URL}/drinks/${updatedDrink._id}`,
        updatedDrink
      );
      console.log("this is the response", response);
      setDrinks((prevDrinks) =>
        prevDrinks.map((drink) =>
          drink._id === updatedDrink._id ? response.data : drink
        )
      );
      setShowEditModal(false);
      setEditingDrinkId(null);
      setSelectedDrink(null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response:", error.response.data); // Log error response
        setError("Error updating drink: " + error.response.data.message);
      } else {
        console.error("Error updating drink:", error);
        setError("Error updating drink: " + (error as Error).message);
      }
    }
  };

  const cancelEdit = () => {
    setShowEditModal(false);
    setEditingDrinkId(null);
    setSelectedDrink(null);
  };

  const filteredDrinks = useMemo(() => {
    // if (
    //   !searchQuery.drinkName &&
    //   !searchQuery.category &&
    //   !searchQuery.glass &&
    //   !searchQuery.ice
    // ) {
    //   return drinks;
    // }

    return drinks.filter((drink) => {
      const matchesLetter = selectedLetter
        ? drink.drinkName.startsWith(selectedLetter.toUpperCase().trim())
        : true;

      const matchesSearch = searchQuery.drinkName
        ? drink.drinkName
            .toLowerCase()
            .includes(searchQuery.drinkName.toLowerCase().trim())
        : true;

      const matchesCategory = searchQuery.category?.trim()
        ? drink.Category &&
          drink.Category.toLowerCase().includes(
            searchQuery.category.toLowerCase().trim()
          )
        : true;

      const matchesGlass = searchQuery.glass?.trim()
        ? drink.Glass &&
          drink.Glass.toLowerCase().includes(
            searchQuery.glass.toLowerCase().trim()
          )
        : true;

      const matchesIce = searchQuery.ice?.trim()
        ? drink.Ice &&
          drink.Ice.toLowerCase().includes(searchQuery.ice.toLowerCase().trim())
        : true;

      return (
        (matchesSearch && (matchesLetter || searchQuery.drinkName)) ||
        (matchesCategory && searchQuery.category) ||
        (matchesGlass && searchQuery.glass) ||
        (matchesIce && searchQuery.ice)
      );
    });
  }, [drinks, selectedLetter, searchQuery]);

  const sortedDrinks = useMemo(() => {
    return [...filteredDrinks].sort((a, b) =>
      a.drinkName.localeCompare(b.drinkName)
    );
  }, [filteredDrinks]);

  if (loading) {
    return <div className="fetch-messages">Loading...</div>;
  }

  if (error) {
    return <div className="fetch-messages">{error}</div>;
  }

  return (
    <div className="drinks-list">
      <div className="drinks-container">
        {sortedDrinks.map((drink) => (
          <div key={drink._id} className="drink-info">
            <div className="drinks-info">
              <div className="table-left">
                <label htmlFor="define-category">Category:</label>
                <h3 id="define-category" className="drinks-category">
                  {drink.Category || "Category Not Found"}
                </h3>
                <h1 className="drinks-name">{drink.drinkName}</h1>
                <label htmlFor="define-glass">Glassware:</label>
                <h3 id="define-glass" className="drinks-glass">
                  {drink.Glass}
                </h3>
                <p className="drinks-instructions">{drink.Instructions}</p>
              </div>
              <div className="table-right">
                <div className="drink-image-container">
                  <img
                    src={drink.DrinkThumb}
                    alt={drink.drinkName}
                    className="drinks-image"
                  />
                  <div className="measure-ingredient-list">
                    <div className="measure-ingredient-col">
                      <p>{drink.Ingredient1}</p>
                      <p>{drink.Ingredient2}</p>
                      <p>{drink.Ingredient3}</p>
                      <p>{drink.Ingredient4}</p>
                      <p>{drink.Ingredient5}</p>
                      <p>{drink.Ingredient6}</p>
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
                {!showEditModal && !isGuest && (
                  <button
                    className="edit-icon"
                    onClick={() => handleEditClick(drink)}
                  >
                    <FaEdit />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showEditModal && selectedDrink && (
        <EditDrinkModal
          drink={selectedDrink}
          onSave={handleSaveEdit}
          onCancel={cancelEdit}
          onDelete={handleDelete}
          setConfirmDelete={setConfirmDelete}
        />
      )}
    </div>
  );
};

export default DrinksList;
