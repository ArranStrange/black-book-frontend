import React, { useEffect, useState } from "react";
import axios from "axios";
import AddDrinkForm from "./components/AddDrinksForm";
import "./App.css";
import DrinksList from "./components/drinks-list/DrinksList";
import Nav from "./components/Nav/nav";
import Search from "./components/Nav/search";

const App: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState("a");
  const [searchQuery, setSearchQuery] = useState("");

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
      <Search onSearch={handleSearch} />
      <Nav onSelectLetter={handleLetterSelection} />
      <div className="main-drinks-list">
        <DrinksList selectedLetter={selectedLetter} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default App;
