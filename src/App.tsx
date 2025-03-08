import React, { useState } from "react";
import AddDrinkForm from "./components/add-drinks/AddDrinksForm";
import "./App.css";
import DrinksList from "./components/drinks-list/DrinksList";
import Nav from "./components/Nav/nav";
import Search from "./components/Nav/search";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import FilmGrain from "./components/assets/film-grain.jpeg";
import { IoIosClose, IoMdAdd } from "react-icons/io";
import { motion } from "framer-motion";

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
  const [isFormVisible, setIsFormVisible] = useState(false);
  const isGuest = localStorage.getItem("authToken") === "guest";

  const closePopup = () => setIsOpen(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
  };

  const toggleAddDrinkForm = () => {
    setIsAddDrinkFormVisible((prev) => !prev);
  };

  const handleLetterSelection = (letter: string) => {
    setSelectedLetter(letter);
  };

  const handleSearch = (query: any) => {
    setSearchQuery((prev) => ({
      ...prev,
      drinkName: query.drinkName ?? prev.drinkName,
      category: query.category ?? prev.category,
      glass: query.glass ?? prev.glass,
      ice: query.ice ?? prev.ice,
    }));
  };

  const onShowAll = () => {
    setSearchQuery({});
    setSelectedLetter("");
  };

  const handleToggleClick = () => {
    toggleAddDrinkForm();
    setIsFormVisible((prev) => !prev);
  };

  return (
    <>
      <img src={FilmGrain} className="overlay" alt="website overlay" />

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
          <DrinksList
            selectedLetter={selectedLetter}
            searchQuery={searchQuery}
          />

          {!isGuest && (
            <button
              className="toggle-drink-form-button"
              onClick={handleToggleClick}
            >
              <motion.div
                animate={{ rotate: isFormVisible ? 45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <IoMdAdd style={{ fontSize: "3rem" }} />
              </motion.div>
            </button>
          )}

          {isAddDrinkFormVisible && <AddDrinkForm />}
        </>
      ) : isRegisterVisible ? (
        <Register onRegisterSuccess={handleRegisterSuccess} />
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
