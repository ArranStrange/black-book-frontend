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
  //stores a token so the user doesn't need to log in each render
  const [drinks, setDrinks] = useState<Drink[]>([]);
  //Drinks array state
  const [loading, setLoading] = useState<boolean>(true);
  //is loading state
  const [error, setError] = useState<string | null>(null);
  //error state
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

        console.log(response);

        setDrinks(response.data);
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

  const handleEditClick = (drink: Drink) => {
    //handle the click of the edit button, takes an argument of drink
    setEditingDrinkId(drink._id);
    //recieved the selected ID and stores it in the editing drink ID state
    setSelectedDrink(drink);
    //stored the selected drink in Selected Drink State
    setShowEditModal(true);
    //opens the Edit Modal component
  };

  const handleSaveEdit = async (updatedDrink: Drink) => {
    //handles click of the save button taking an argument of the updated drinks
    try {
      //try for better error handling
      console.log("this is the", updatedDrink);
      const response = await axios.put(
        //axios.put sends a request to the below URL & drinks & the corosponding drinks ID to be updated
        `${API_URL}/drinks/${updatedDrink._id}`,
        updatedDrink //updatedDrink is what is sent to the backend server, this is the inputted data which replaces the drink within the drink schema
      );
      console.log("this is the response", response);
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
        //if not shoes a generic error
      }
    }
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
    //filters drinks function uses useMemo to capture the result and only rerender if the search is changed

    // if (
    //   !searchQuery.drinkName &&
    //   !searchQuery.category &&
    //   !searchQuery.glass &&
    //   !searchQuery.ice
    // ) {
    //   return drinks;
    // }

    return drinks.filter((drink) => {
      //drinks.filter taking an argument of drink will only return the drinks matching the arguments below
      const matchesLetter = selectedLetter
        ? //matched letter to selected letter state, which is defined in the Nav component
          drink.drinkName.startsWith(selectedLetter.toUpperCase().trim())
        : //in the array of drinks the drinkName starts with the selected letter - which is converted to uppercase and any spaces removed
          true;
      //if selected letter is empty, his marks all drinks as matching and will show all

      const matchesSearch = searchQuery.drinkName
        ? //search query the drink name
          drink.drinkName
            .toLowerCase()
            //converts all drinks names to lowercase
            .includes(searchQuery.drinkName.toLowerCase().trim())
        : //.includes checks if any drink names in the array match the search query - this only needs a partial match
          //converts the search query to lowercase and removes the spaces
          true;
      //if no search query is inputted then return all

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

      const matchesIngredient = (ingredient: string | undefined) => {
        return ingredient
          ? ingredient
              .toLowerCase()
              .includes(searchQuery.drinkName?.toLowerCase().trim() || "")
          : false;
      };

      const matchesIngredients =
        matchesIngredient(drink.Ingredient1) ||
        matchesIngredient(drink.Ingredient2) ||
        matchesIngredient(drink.Ingredient3) ||
        matchesIngredient(drink.Ingredient4) ||
        matchesIngredient(drink.Ingredient5) ||
        matchesIngredient(drink.Ingredient6);

      return (
        (matchesSearch || matchesIngredients) &&
        (matchesLetter || searchQuery.drinkName) &&
        (matchesCategory || searchQuery.category) &&
        (matchesGlass || searchQuery.glass)
      );
    });
  }, [drinks, selectedLetter, searchQuery]);

  const sortedDrinks = useMemo(() => {
    return [...filteredDrinks].sort((a, b) =>
      a.drinkName.localeCompare(b.drinkName)
    );
  }, [filteredDrinks]);

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
        {sortedDrinks.map((drink) => (
          <div key={drink._id} className="drink-info">
            <div className="drinks-info">
              <div className="table-left">
                <label htmlFor="define-category">Category:</label>
                <h3 id="define-category" className="drinks-category">
                  {toTitleCase(drink.Category || "Category Not Found")}
                </h3>
                <h1 className="drinks-name">{drink.drinkName}</h1>
                <label htmlFor="define-glass">Glassware:</label>
                <h3 id="define-glass" className="drinks-glass">
                  {toTitleCase(drink.Glass)}
                </h3>
                <p className="drinks-instructions">{drink.Instructions}</p>
              </div>
              <div className="table-right">
                <div className="drink-image-container">
                  <img
                    src={
                      drink.DrinkThumb ||
                      "https://www.creativefabrica.com/wp-content/uploads/2021/07/01/Cocktail-icon-Graphics-14120200-1-1-580x387.jpg"
                    }
                    alt={drink.drinkName}
                    className="drinks-image"
                  />
                  <div className="measure-ingredient-list">
                    <div className="measure-ingredient-col">
                      <p>{toTitleCase(drink.Ingredient1)}</p>
                      <p>{toTitleCase(drink.Ingredient2)}</p>
                      <p>{toTitleCase(drink.Ingredient3)}</p>
                      <p>{toTitleCase(drink.Ingredient4)}</p>
                      <p>{toTitleCase(drink.Ingredient5)}</p>
                      <p>{toTitleCase(drink.Ingredient6)}</p>
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
