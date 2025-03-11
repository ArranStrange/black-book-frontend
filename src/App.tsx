import React, { useEffect, useState } from "react";
import AddDrinkForm from "./components/Drinks/AddDrink/AddDrinksForm";
import "./App.css";
import DrinksList from "./components/Drinks/DrinksList/DrinksList";
import Nav from "./components/Nav/nav";
import Search from "./components/Nav/search";
import Login from "./components/Auth/Login/login";
import Register from "./components/Auth/Register/register";
import FilmGrain from "./components/assets/film-grain.jpeg";
import { IoMdAdd } from "react-icons/io";
import { motion } from "framer-motion";
import MessageModal from "./components/message/MessageModal";

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
  const [isFormVisible, setIsFormVisible] = useState(false);
  const isGuest = localStorage.getItem("authToken") === "guest";
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);

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

  useEffect(() => {
    setModalMessage(
      "The backend of this app is hosted on a free server, please be patient it can be a little slow."
    );
    setModalTitle("A Heads Up");
  }, []);

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
