import React, { useEffect, useState } from "react";
import AddDrinkForm from "./components/add-drinks/AddDrinksForm";
import "./App.css";
import DrinksList from "./components/drinks-list/DrinksList";
import Nav from "./components/Nav/nav";
import Search from "./components/Nav/search";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import FilmGrain from "./components/assets/film-grain.jpeg";

const App: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState("a");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDrinkFormVisible, setIsAddDrinkFormVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState<boolean>(false); // New state for register visibility

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
    setSearchQuery(""); // Clear Search
    setSelectedLetter(letter);
  };

  const handleSearch = (query: string) => {
    setSelectedLetter(""); // Clear Letter
    setSearchQuery(query); // Set Search
  };

  return (
    <div>
      <img src={FilmGrain} className="overlay" />
      <div>
        {isAuthenticated ? (
          <div>
            <Search
              onSearch={handleSearch}
              toggleAddDrinkForm={toggleAddDrinkForm}
            />
            <Nav onSelectLetter={handleLetterSelection} />
            <div className="main-drinks-list">
              <DrinksList
                selectedLetter={selectedLetter}
                searchQuery={searchQuery}
              />
            </div>
            {isAddDrinkFormVisible && <AddDrinkForm />}
          </div>
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
      </div>
    </div>
  );
};

export default App;
