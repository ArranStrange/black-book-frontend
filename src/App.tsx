import React, { useEffect, useState } from "react";
import AddDrinkForm from "./components/add-drinks/AddDrinksForm";
import "./App.css";
import DrinksList from "./components/drinks-list/DrinksList";
import Nav from "./components/Nav/nav";
import Search from "./components/Nav/search";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import FilmGrain from "./components/assets/film-grain.jpeg";
import { IoIosClose } from "react-icons/io";

const App: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState("");
  const [searchQuery, setSearchQuery] = useState<{
    drinkName?: string;
    category?: string;
    glass?: string;
    ice?: string;
  }>({});
  const [isAddDrinkFormVisible, setIsAddDrinkFormVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(true);
  const closePopup = () => setIsOpen(false);

  const handleLoginSuccess = () => {
    // Update authentication state
    setIsAuthenticated(true);
  };

  const handleRegisterSuccess = () => {
    // Handle successful registration
    setIsAuthenticated(true);
  };

  const toggleAddDrinkForm = () => {
    setIsAddDrinkFormVisible((prev) => !prev); // Toggle visibility
  };

  const handleLetterSelection = (letter: string) => {
    if (letter === "") {
      // Show all drinks when the "Show All" button is clicked
      setSearchQuery({}); // Clear Search by resetting to an empty object
      setSelectedLetter(""); // Clear the selected letter
    } else {
      setSearchQuery({}); // Clear Search by resetting to an empty object
      setSelectedLetter(letter);
    }
  };

  const handleSearch = (query: {
    drinkName?: string;
    category?: string;
    glass?: string;
    ice?: string;
  }) => {
    // Update the state with the new search query
    setSearchQuery(query);
  };

  const onShowAll = () => {
    setSearchQuery({}); // Clear the search query
    setSelectedLetter(""); // Clear the selected letter
  };

  return (
    <>
      <img src={FilmGrain} className="overlay" alt="website overlay" />
      <>
        {isOpen && (
          <div className="pop-up-container">
            <div className="pop-up">
              <button onClick={closePopup} className="pop-up-close-button">
                <IoIosClose />
              </button>
              <p className="pop-up-message">
                The backend of this app is hosted on a free server, please be
                patient it can be a little slow
              </p>
            </div>
          </div>
        )}
        {isAuthenticated ? (
          <>
            <Search
              onSearch={handleSearch}
              toggleAddDrinkForm={toggleAddDrinkForm}
              onShowAll={onShowAll}
            />
            <Nav onSelectLetter={handleLetterSelection} />
            <div className="main-drinks-list">
              <DrinksList
                selectedLetter={selectedLetter}
                searchQuery={searchQuery}
              />
            </div>
            {isAddDrinkFormVisible && <AddDrinkForm />}
          </>
        ) : isRegisterVisible ? (
          <Register onRegisterSuccess={handleRegisterSuccess} /> // Show the Register component
        ) : (
          <div>
            <Login
              onLoginSuccess={handleLoginSuccess}
              setIsRegisterVisible={setIsRegisterVisible}
            />
          </div>
        )}
      </>
    </>
  );
};

export default App;
