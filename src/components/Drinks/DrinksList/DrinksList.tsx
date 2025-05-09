import React, { useState } from "react";
import { useDrinks } from "../../../hooks/useDrinks";
import { useFilterDrinks } from "../../../hooks/useFilterDrinks";
import { Drink } from "../../types/types";
import "./drinks-list.css";
import EditDrinkModal from "../EditDrinksModal/EditDrinksModal";
import Shaker from "../../assets/shaker.png";
import Spill from "../../assets/spil.png";
import SelectedDrinkModal from "../SelectedDrinkModal/selectedDrinkModal";
//
//
// Typescript defining the props
//Props from App.tsx
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
  //
  //
  // Hooks
  // useDrink to handle state management -- drinks data, loading states, error handling, save and delete
  const { drinks, loading, error, handleSaveEdit, handleDelete } = useDrinks();
  // useFilteredDrinks hook to order the drinks and handle searchQueries
  const filteredDrinks = useFilterDrinks(drinks, selectedLetter, searchQuery);
  //
  //
  // Check whether the using is logged in as guest ---- getItem
  const isGuest = localStorage.getItem("authToken") === "guest";
  //
  //
  // state
  const [showDrinkModal, setShowDrinkModal] = useState<boolean>(false);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  //
  //
  // Handle opening selected drink modal
  // takes a parameter of the drink object which is sect on drink card click
  const handleDrinkClick = (drink: Drink) => {
    //sets selectedDrink state to the drink object
    setSelectedDrink(drink);
    //shows the drink modal
    setShowDrinkModal(true);
  };
  //
  //
  // Handle closing drink modal
  const handleCloseDrinkModal = () => {
    setShowDrinkModal(false);
    setSelectedDrink(null);
  };
  //
  //
  // Handle opening edit modal
  const handleEditClick = () => {
    if (!selectedDrink) return;
    setShowDrinkModal(false);
    setShowEditModal(true);
  };
  //
  //
  // Handle closing edit modal
  const cancelEdit = () => {
    setShowEditModal(false);
    setSelectedDrink(null);
  };
  //
  //
  //
  // Conditional rendering for loading
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
  // Conditional rendering for the network error state
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
      {/*Drinks Map - maps over filteredDrinks not the Drinks array*/}
      <div className="drinks-container">
        {filteredDrinks.map((drink) => (
          // iterates over every object of the flitereedDrinks array
          <div
            data-testid="drink-card"
            key={drink._id}
            className="drink-card"
            //when a drink is clicked the whole drink object is passed to the handleDrinkClick function
            //this object contains all the properties of the objects
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

      {
        // If showDrinkModal is true and selectedDrink is truthy (occupied)
        showDrinkModal && selectedDrink && (
          // on handleDrinkClick selectedDrink state is updated with the clicked drink object
          // show drinkModal is set to true
          <SelectedDrinkModal
            drink={selectedDrink}
            onClose={handleCloseDrinkModal}
            onEdit={handleEditClick}
            isGuest={isGuest}
          />
        )
      }

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
