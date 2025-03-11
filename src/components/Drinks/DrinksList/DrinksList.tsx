import React, { useState } from "react";
import { useDrinks } from "../../../hooks/useDrinks";
import { useFilterDrinks } from "../../../hooks/useFilterDrinks";
import { Drink } from "../../types/types";
import "./drinks-list.css";
import EditDrinkModal from "../EditDrinksModal/EditDrinksModal";
import Shaker from "../../assets/shaker.png";
import Spill from "../../assets/spil.png";
import SelectedDrinkModal from "../SelectedDrinkModal/selectedDrinkModal";

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
  const { drinks, loading, error, handleSaveEdit, handleDelete } = useDrinks();
  const filteredDrinks = useFilterDrinks(drinks, selectedLetter, searchQuery);
  const isGuest = localStorage.getItem("authToken") === "guest";
  const [showDrinkModal, setShowDrinkModal] = useState<boolean>(false);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  // Handle opening drink modal
  const handleDrinkClick = (drink: Drink) => {
    setSelectedDrink(drink);
    setShowDrinkModal(true);
  };

  // Handle closing drink modal
  const handleCloseDrinkModal = () => {
    setShowDrinkModal(false);
    setSelectedDrink(null);
  };

  // Handle opening edit modal
  const handleEditClick = () => {
    if (!selectedDrink) return;
    setShowDrinkModal(false);
    setShowEditModal(true);
  };

  // Handle closing edit modal
  const cancelEdit = () => {
    setShowEditModal(false);
    setSelectedDrink(null);
  };

  if (loading) {
    return (
      <div className="fetch-messages">
        <div className="loading-message">
          <img src={Shaker} className="loading-shaker" alt="loading shaker" />
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fetch-messages">
        <div className="loading-message">
          <img
            src={Spill}
            className="network-error"
            alt="network error shaker"
          />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="drinks-list">
      {/*Drinks Map */}
      <div className="drinks-container">
        {drinks.map((drink) => (
          <div
            key={drink._id}
            className="drink-card"
            onClick={() => handleDrinkClick(drink)}
          >
            <img
              src={
                drink.DrinkThumb ||
                "https://png.pngtree.com/png-vector/20190603/ourmid/pngtree-cocktail-icon-png-image_1376820.jpg"
              }
              alt={drink.drinkName}
              className="drink-thumbnail"
            />
            <div className="drink-details">
              <h2 className="drink-name">{drink.drinkName}</h2>
              <p className="drink-short-description">
                {drink.shortDescription || "No description set."}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Drink Modal */}
      {showDrinkModal && selectedDrink && (
        <SelectedDrinkModal
          drink={selectedDrink}
          onClose={handleCloseDrinkModal}
          onEdit={handleEditClick}
          isGuest={isGuest}
        />
      )}

      {showEditModal && selectedDrink && (
        <EditDrinkModal
          drink={selectedDrink}
          onSave={handleSaveEdit}
          setShowEditModal={setShowEditModal}
          onCancel={cancelEdit}
          onDelete={() => handleDelete(selectedDrink._id)}
        />
      )}
    </div>
  );
};

export default DrinksList;
