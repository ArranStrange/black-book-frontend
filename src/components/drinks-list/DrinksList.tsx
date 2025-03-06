import React, { useEffect, useMemo, useState } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import "./drinks-list.css";
import EditDrinkModal from "./EditDrinksModal";
import Shaker from "../assets/shaker.png";
import Spill from "../assets/spil.png";

interface Drink {
  _id: string;
  idDrink?: string;
  drinkName: string;
  shortDescription: string;
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

const sortDrinks = (drinksList: Drink[]) => {
  return [...drinksList].sort((a, b) => a.drinkName.localeCompare(b.drinkName));
};

const DrinksList: React.FC<DrinksListProps> = ({
  selectedLetter,
  searchQuery,
}) => {
  const isGuest = localStorage.getItem("authToken") === "guest";
  //stores a token so the user doesn't need to log in each render
  const [drinks, setDrinks] = useState<Drink[]>([]);
  //Drinks array state
  const [loading, setLoading] = useState<boolean>(true);
  //is loading state
  const [error, setError] = useState<string | null>(null);
  //error state
  const [showDrinkModal, setShowDrinkModal] = useState<boolean>(false);
  //drinksModal
  const [editingDrinkId, setEditingDrinkId] = useState<string | null>(null);
  //state for drinks id when editing
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  //state for confirm delete modal
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  //state for selected drink while editing
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  //state for modal open/close

  // const API_URL = process.env.API_BASE_URL;

  //URL for hosted backend server
  const API_URL = "https://black-book-backend.onrender.com";

  //URL for local backend server
  // const API_URL = "http://localhost:1000";

  useEffect(() => {
    //useEffect used to collected drinks on component render
    const fetchDrinks = async () => {
      //fetch drink using async so that the component waits for the response before showing drinks collection error
      try {
        //try used for error handling, if response fails, catch will trigger
        const response = await axios.get(`${API_URL}/drinks`);
        //await pauses execution of code until the response comes back from the API call
        //axios.get will call the API URL listed above/drinks and store it in the const response

        setDrinks(sortDrinks(response.data));
        //set drinks state to the data stored in the response state e.g. the drinks schema from the backend server
      } catch (error) {
        //catch for error handeling
        setError("Error fetching drinks: " + (error as Error).message);
        //set error state as the error message
        console.error("Error fetching drinks:", error);
        //console log error also
      } finally {
        setLoading(false);
        //when the drinks schema has responsed set loading state to false
      }
    };

    fetchDrinks();
    //Runs the function on first render
  }, []);

  const handleDrinkClick = (drink: Drink) => {
    setSelectedDrink(drink);
    setShowDrinkModal(true);
  };
  const handleCloseDrinkModal = () => {
    setShowDrinkModal(false);
    setSelectedDrink(null);
  };

  const handleEditClick = () => {
    if (!selectedDrink) return; // Prevents errors if no drink is selected
    setShowDrinkModal(false);
    setShowEditModal(true);
  };

  const handleAddDrink = (newDrink: Drink) => {
    setDrinks((prevDrinks) => sortDrinks([...prevDrinks, newDrink]));
  };

  const handleSaveEdit = async (updatedDrink: Drink) => {
    //handles click of the save button taking an argument of the updated drinks
    try {
      //try for better error handling
      // console.log("this is the", updatedDrink);
      const response = await axios.put(
        //axios.put sends a request to the below URL/drinks/the corosponding drinks ID to be updated
        `${API_URL}/drinks/${updatedDrink._id}`,
        updatedDrink //updatedDrink is what is sent to the backend server, this is the inputted data which replaces the drink within the drink schema
      );
      // console.log("this is the response", response);
      setDrinks((prevDrinks) =>
        //set Drinks updates the current Array
        prevDrinks.map(
          (drink) =>
            //this maps over the array
            drink._id === updatedDrink._id ? response.data : drink
          //when mapping over the array, if it find drink._id matches the updatedDrink._id then it will update the schema with the updated drink. if it doesn't it keeps drink unchanged
        )
      );
      setShowEditModal(false);
      //closes the modal when the function is run
      setEditingDrinkId(null);
      //sets the Edit drink ID back to nothing
      setSelectedDrink(null);
      //sets the Selected Drink ID back to nothing
    } catch (error) {
      //catch handles errors
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response:", error.response.data);
        // Log error response from the server
        setError("Error updating drink: " + error.response.data.message);
      } else {
        console.error("Error updating drink:", error);
        setError("Error updating drink: " + (error as Error).message);
        //if not shows a generic error
      }
    }
  };

  const handleDelete = async (id: string) => {
    //handle delete function to delete drinks used async for better error handling and takes an argument of the drinks ID
    setConfirmDelete(id);
    //sets confirm delete state to the ID of the selected drink
    if (confirmDelete === id) {
      //if the confirm delete ID of the confirm delete matches the id of the selected drink it will run the code below
      console.log(`Deleting drink with ID: ${id}`);
      try {
        //try for better error handling
        await axios.delete(`${API_URL}/drinks/${id}`);
        //axios.delete URL of the database & the drinks list & the drinks ID
        setDrinks(drinks.filter((drink) => drink._id !== id));
        //withing the drinks schema stored in the Drinks state, filter out the drink, with the ID equal to the ID stored in confirm delete
        setConfirmDelete(null);
        //reset the confirm delete ID stored to nothing
      } catch (error) {
        //catch for error handling
        console.error("Error deleting drink:", error);
        setError("Error deleting drink: " + (error as Error).message);
        //set error state with the error if there is an error is found
      }
    }
    window.location.reload();
    //reload the application so the array of drinks is displayed, now without the filtered drink
  };

  const cancelEdit = () => {
    //handles cancel edit click
    setShowEditModal(false);
    //closes the modal
    setEditingDrinkId(null);
    //resets the edit drink ID to nothing
    setSelectedDrink(null);
    //rests the selected drink id to nothing
  };

  const filteredDrinks = useMemo(() => {
    return drinks.filter((drink) => {
      // Match by first letter
      const matchesLetter = selectedLetter
        ? drink.drinkName.startsWith(selectedLetter.toUpperCase().trim())
        : true;

      // Match by search query (partial match)
      const matchesSearch = searchQuery.drinkName
        ? drink.drinkName
            .toLowerCase()
            .includes(searchQuery.drinkName.toLowerCase().trim())
        : true;

      // Normalize fields to avoid case sensitivity & trailing spaces
      const drinkCategory = drink.Category?.toLowerCase().trim();
      const drinkGlass = drink.Glass?.toLowerCase().trim();
      const drinkIce = drink.Ice?.toLowerCase().trim();

      const queryCategory = searchQuery.category?.toLowerCase().trim();
      const queryGlass = searchQuery.glass?.toLowerCase().trim();
      const queryIce = searchQuery.ice?.toLowerCase().trim();

      // Ensure filtering properly applies (STRICT MATCH)
      const matchesCategory = queryCategory
        ? drinkCategory === queryCategory
        : true;
      const matchesGlass = queryGlass ? drinkGlass === queryGlass : true;
      const matchesIce = queryIce ? drinkIce === queryIce : true;

      // Match ingredients (partial match)
      const matchesIngredient = (ingredient: string | undefined) =>
        ingredient
          ? ingredient
              .toLowerCase()
              .includes(searchQuery.drinkName?.toLowerCase().trim() || "")
          : false;

      const matchesIngredients =
        matchesIngredient(drink.Ingredient1) ||
        matchesIngredient(drink.Ingredient2) ||
        matchesIngredient(drink.Ingredient3) ||
        matchesIngredient(drink.Ingredient4) ||
        matchesIngredient(drink.Ingredient5) ||
        matchesIngredient(drink.Ingredient6);

      return (
        (matchesSearch || matchesIngredients) &&
        matchesLetter &&
        matchesCategory &&
        matchesGlass &&
        matchesIce
      );
    });
  }, [drinks, selectedLetter, searchQuery]);

  const sortedDrinks = useMemo(
    () => sortDrinks(filteredDrinks),
    [filteredDrinks]
  );

  if (loading) {
    return (
      <div className="fetch-messages">
        <div className="loading-message">
          <img
            src={Shaker}
            className="loading-shaker"
            alt="loading shaker image"
          />
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
            className="network-error "
            alt="network error shaker image"
          />
          {error}
        </div>
      </div>
    );
  }

  function toTitleCase(str?: String) {
    return str
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="drinks-list">
      <div className="drinks-container">
        {filteredDrinks.map((drink) => (
          <div
            key={drink._id}
            className="drink-card"
            onClick={() => handleDrinkClick(drink)}
          >
            <div></div>
            <div>
              <img
                src={drink.DrinkThumb || "https://via.placeholder.com/100"}
                alt={drink.drinkName}
                className="drink-thumbnail"
              />
              <div className="drink-details">
                <h2 className="drink-name">{drink.drinkName}</h2>
                <p className="drink-short-description">
                  {drink.shortDescription || "No description available."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Drink Modal */}
      {showDrinkModal && selectedDrink && (
        <div className="drink-modal">
          <div className="modal-content">
            <div className="drink-modal-info">
              <button
                className="close-drink-modal"
                onClick={handleCloseDrinkModal}
              >
                ✖
              </button>
              <div className="table-left">
                <label htmlFor="define-category">Category:</label>
                <h3 id="define-category" className="drinks-category">
                  {toTitleCase(selectedDrink.Category || "Category Not Found")}
                </h3>
                <h1 className="selectedDrinks-name">
                  {selectedDrink.drinkName}
                </h1>
                <label htmlFor="define-glass">Glassware:</label>
                <h3 id="define-glass" className="selectedDrinks-glass">
                  {toTitleCase(selectedDrink.Glass)}
                </h3>
                <p className="selectedDrinks-instructions">
                  {selectedDrink.Instructions}
                </p>
              </div>
              <div className="table-right">
                <div className="selectedDrink-image-container">
                  <img
                    src={
                      selectedDrink.DrinkThumb ||
                      "https://www.creativefabrica.com/wp-content/uploads/2021/07/01/Cocktail-icon-Graphics-14120200-1-1-580x387.jpg"
                    }
                    alt={selectedDrink.drinkName}
                    className="selectedDrinks-image"
                  />
                  <div className="measure-ingredient-list">
                    <div className="measure-ingredient-col">
                      <p>{toTitleCase(selectedDrink.Ingredient1)}</p>
                      <p>{toTitleCase(selectedDrink.Ingredient2)}</p>
                      <p>{toTitleCase(selectedDrink.Ingredient3)}</p>
                      <p>{toTitleCase(selectedDrink.Ingredient4)}</p>
                      <p>{toTitleCase(selectedDrink.Ingredient5)}</p>
                      <p>{toTitleCase(selectedDrink.Ingredient6)}</p>
                    </div>
                    <div className="measure-ingredient-col">
                      {selectedDrink.Measure1 && (
                        <p>{selectedDrink.Measure1}ml</p>
                      )}
                      {selectedDrink.Measure2 && (
                        <p>{selectedDrink.Measure2}ml</p>
                      )}
                      {selectedDrink.Measure3 && (
                        <p>{selectedDrink.Measure3}ml</p>
                      )}
                      {selectedDrink.Measure4 && (
                        <p>{selectedDrink.Measure4}ml</p>
                      )}
                      {selectedDrink.Measure5 && (
                        <p>{selectedDrink.Measure5}ml</p>
                      )}
                      {selectedDrink.Measure6 && (
                        <p>{selectedDrink.Measure6}ml</p>
                      )}
                    </div>
                  </div>
                </div>
                {!showEditModal && !isGuest && (
                  <button
                    className="edit-button"
                    onClick={() => handleEditClick()}
                  >
                    <FaEdit />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedDrink && (
        <EditDrinkModal
          drink={selectedDrink}
          onSave={handleSaveEdit}
          onCancel={cancelEdit}
          onDelete={() => handleDelete(selectedDrink._id)} // Pass onDelete function
          setConfirmDelete={setConfirmDelete} // Ensure it's passed
        />
      )}
    </div>
  );
};

export default DrinksList;
