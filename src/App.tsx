import React, { useEffect, useState } from "react";
import AddDrinkForm from "./components/add-drinks/AddDrinksForm";
import "./App.css";
import DrinksList from "./components/drinks-list/DrinksList";
import Nav from "./components/Nav/nav";
import Search from "./components/Nav/search";

const App: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState("a");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDrinkFormVisible, setIsAddDrinkFormVisible] = useState(false);

  const toggleAddDrinkForm = () => {
    setIsAddDrinkFormVisible((prev) => !prev); // Toggle visibility
  };

  const handleLetterSelection = (letter: string) => {
    setSearchQuery(""); //Clear Search
    setSelectedLetter(letter);
  };

  const handleSearch = (query: string) => {
    setSelectedLetter(""); //Clear Letter
    setSearchQuery(query); // set Seachk
  };

  return (
    <div>
      <Search onSearch={handleSearch} toggleAddDrinkForm={toggleAddDrinkForm} />
      <Nav onSelectLetter={handleLetterSelection} />
      <div className="main-drinks-list">
        <DrinksList selectedLetter={selectedLetter} searchQuery={searchQuery} />
      </div>
      {isAddDrinkFormVisible && <AddDrinkForm />}
    </div>
  );
};

export default App;
