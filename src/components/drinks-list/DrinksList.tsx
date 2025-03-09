import React, { useState } from "react";
import { useDrinks } from "../../hooks/useDrinks";
import { Drink } from "../types/types";
import "./drinks-list.css";
import EditDrinkModal from "./EditDrinksModal";
import Shaker from "../assets/shaker.png";
import Spill from "../assets/spil.png";
import SelectedDrinkModal from "./selectedDrinkModal";

interface DrinksListProps {
  selectedLetter: string;
  searchQuery: {
    drinkName?: string;
    category?: string;
    glass?: string;
    ice?: string;
  };
}
// Sorting logic for drinks
const sortDrinks = (drinksList: Drink[]) => {
  return [...drinksList].sort((a, b) => a.drinkName.localeCompare(b.drinkName));
};

const DrinksList: React.FC<DrinksListProps> = ({
  selectedLetter,
  searchQuery,
}) => {
  const { drinks, loading, error, handleSaveEdit, handleDelete } = useDrinks(
    selectedLetter,
    searchQuery
  );

  const isGuest = localStorage.getItem("authToken") === "guest";

  // Modal states
  const [showDrinkModal, setShowDrinkModal] = useState<boolean>(false);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  // typescript throw an error because state isn't used within this component but passed to editModal
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const sortedDrinks = sortDrinks(drinks);

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
      <div className="drinks-container">
        {sortedDrinks.map((drink) => (
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

      {/* Edit Modal */}
      {showEditModal && selectedDrink && (
        <EditDrinkModal
          drink={selectedDrink}
          onSave={handleSaveEdit}
          setShowEditModal={setShowEditModal}
          onCancel={cancelEdit}
          onDelete={() => handleDelete(selectedDrink._id)}
          setConfirmDelete={setConfirmDelete}
        />
      )}
    </div>
  );
};

export default DrinksList;
