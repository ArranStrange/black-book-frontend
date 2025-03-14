import React, { useEffect, useState } from "react";
//
//Styles imports
import FilmGrain from "./components/assets/film-grain.jpeg";
import "./App.css";
import { IoMdAdd } from "react-icons/io";
import { motion } from "framer-motion";
//
//Components imports
import AddDrinkForm from "./components/Drinks/AddDrink/AddDrinksForm";
import DrinksList from "./components/Drinks/DrinksList/DrinksList";
import Nav from "./components/Nav/nav";
import Search from "./components/Nav/search";
import Login from "./components/Auth/Login/login";
import Register from "./components/Auth/Register/register";
import MessageModal from "./components/message/MessageModal";

const App: React.FC = () => {
  //state
  //
  //
  // search related state
  const [selectedLetter, setSelectedLetter] = useState("");
  const [searchQuery, setSearchQuery] = useState<{
    //stores the search criteria set in the search component
    drinkName?: string; //defined with a ? to indicate it is optional
    category?: string;
    glass?: string;
    ice?: string;
  }>({});
  //
  //
  // UI state management
  const [isAddDrinkFormVisible, setIsAddDrinkFormVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  //auth state
  const isGuest = localStorage.getItem("authToken") === "guest";
  //
  //
  // handles a successsful log in and sets the auth state to true
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };
  //
  //
  //handles a successful registration and sets the auth state to true
  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
  };
  //
  //
  //
  // on submission handleSearch updating the searchQuery state
  const handleSearch = (query: {
    //takes the searchObjectQuery from the search bar
    drinkName?: string;
    category?: string;
    glass?: string;
    ice?: string;
  }) => {
    setSearchQuery({
      // uses setSearchQuery to update the state to with either the value from the search form or an empty string
      drinkName: query.drinkName || "",
      category: query.category || "",
      glass: query.glass || "",
      ice: query.ice || "",
    });
  };
  //
  //
  // updates the selected letter state with the selectedLetter state from Nav
  const handleLetterSelection = (letter: string) => {
    setSelectedLetter(letter);
  };
  //
  //
  // clears all search params
  const onShowAll = () => {
    //clears the search query state object
    setSearchQuery({});
    //clears the selected letter state
    setSelectedLetter("");
  };
  //
  //
  // toggles the addDrinkForm component
  const toggleAddDrinkForm = () => {
    //toggles from its previous state to the oposite
    setIsAddDrinkFormVisible((prev) => !prev);
  };
  //
  //
  const handleAddDrinkToggle = () => {
    //calls toggle add drink form
    toggleAddDrinkForm();
    //Truthy Falsy state for rotating the + to become a x
    setIsFormVisible((prev) => !prev);
  };
  //
  //
  //
  // Throws a message on first render warning of a slow server
  useEffect(() => {
    setModalMessage(
      "The backend of this app is hosted on a free server, please be patient it can be a little slow."
    );
    setModalTitle("A Heads Up");
  }, []);
  //
  // Close the message modal
  const handleCloseModal = () => {
    setModalMessage(null);
    setModalTitle(null);
  };

  return (
    <>
      <img src={FilmGrain} className="overlay" alt="website overlay" />

      {modalMessage && modalTitle && (
        <MessageModal
          message={modalMessage}
          title={modalTitle}
          onClose={handleCloseModal}
        />
      )}

      {isAuthenticated ? (
        <>
          <DrinksList
            selectedLetter={selectedLetter}
            searchQuery={searchQuery}
          />
          <Search
            onSearch={handleSearch}
            toggleAddDrinkForm={toggleAddDrinkForm}
            onShowAll={onShowAll}
          />
          <Nav onSelectLetter={handleLetterSelection} />

          {!isGuest && (
            <button
              className="toggle-drink-form-button"
              onClick={handleAddDrinkToggle}
            >
              <motion.div
                animate={{ rotate: isFormVisible ? 45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <IoMdAdd style={{ fontSize: "3rem" }} />
              </motion.div>
            </button>
          )}

          {isAddDrinkFormVisible && (
            <AddDrinkForm toggleAddDrinkForm={toggleAddDrinkForm} />
          )}
        </>
      ) : isRegisterVisible ? (
        <Register
          onRegisterSuccess={handleRegisterSuccess}
          setIsLoginVisible={() => setIsRegisterVisible(false)}
          onGuestLogin={handleLoginSuccess}
        />
      ) : (
        <Login
          onLoginSuccess={handleLoginSuccess}
          setIsRegisterVisible={setIsRegisterVisible}
        />
      )}
    </>
  );
};

export default App;
