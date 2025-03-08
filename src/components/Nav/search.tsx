import React, { useEffect, useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { motion } from "framer-motion";
import "./search.css";

interface Props {
  onSearch: (searchQuery: {
    drinkName?: string;
    category?: string;
    glass?: string;
    ice?: string;
  }) => void;
  toggleAddDrinkForm: () => void;
  onShowAll: () => void;
}

export default function Search({ onSearch, onShowAll }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdown, setDropdown] = useState(false);

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGlass, setSelectedGlass] = useState("");
  const [selectedIce, setSelectedIce] = useState("");

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === "category") {
      setSelectedCategory(value);
    } else if (name === "glass") {
      setSelectedGlass(value);
    } else if (name === "ice") {
      setSelectedIce(value);
    }
  };

  const handleLogout = () => {
    window.location.reload();
    localStorage.removeItem("authToken");
  };

  const handleFocus = () => {
    setIsSearchFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsSearchFocused(false);
    }
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const searchQueryObject = {
      drinkName: searchQuery.trim() || undefined,
      category: selectedCategory || undefined,
      glass: selectedGlass || undefined,
      ice: selectedIce || undefined,
    };

    onSearch(searchQueryObject);

    setSelectedCategory("");
    setSelectedGlass("");
    setSelectedIce("");

    setIsSearchFocused(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleShowAll = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedGlass("");
    setSelectedIce("");
    onShowAll();
  };

  return (
    <div className="search-container">
      <form
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="search-bar"
        onSubmit={handleSearchSubmit} // Update the onSubmit handler
      >
        <input
          type="search"
          id="searchInput"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search"
        />
        {isSearchFocused && (
          <div className="search-dropdown-container">
            <div className="selection">
              <label htmlFor="category">Category:</label>
              <select
                name="category"
                id="category"
                value={selectedCategory}
                onChange={handleSelectChange}
              >
                <option value="">Not Defined</option>
                <option value="cobbler">Cobbler</option>
                <option value="collins">Collins</option>
                <option value="daisy">Daisy</option>
                <option value="flip">Flip</option>
                <option value="frozen">Frozen</option>
                <option value="highball">Highball</option>
                <option value="julep">Julep</option>
                <option value="martini">Martini</option>
                <option value="punch">Punch</option>
                <option value="sling">Sling</option>
                <option value="sour">Sour</option>
                <option value="tiki">Tiki</option>
                <option value="toddy">Toddy</option>
                <option value="spritz">Spritz</option>
                <option value="fizz">Fizz</option>
              </select>

              <label htmlFor="glass">Glass Type:</label>
              <select
                name="glass"
                id="glass"
                value={selectedGlass}
                onChange={handleSelectChange}
              >
                <option value="">Not Defined</option>
                <option value="highball">Highball</option>
                <option value="coup">Coup</option>
                <option value="hurricane">Hurricane</option>
                <option value="old fashioned">Old Fashioned</option>
                <option value="julep tin">Julep Tin</option>
                <option value="wine">Wine Glass</option>
                <option value="flute">Flute</option>
              </select>

              <label htmlFor="ice">Ice Type:</label>
              <select
                name="ice"
                id="ice"
                value={selectedIce}
                onChange={handleSelectChange}
              >
                <option value="">Not Defined</option>
                <option value="cubed">Cubed</option>
                <option value="crushed">Crushed</option>
                <option value="block">Block</option>
                <option value="shaved">Shaved</option>
                <option value="straight">Straight Up</option>
              </select>
            </div>
            <button className="search-button" type="submit">
              Search
            </button>
          </div>
        )}
      </form>
      <button type="button" className="show-all" onClick={handleShowAll}>
        Clear filters
      </button>

      <div className="dropdown-buttons" onClick={handleDropdown}>
        {dropdown ? <RxCross2 size={35} /> : <RxHamburgerMenu size={35} />}
      </div>

      {dropdown && (
        <div className="dropdown-options">
          <button className="logout-button" onClick={handleLogout}>
            {localStorage.getItem("authToken") === "guest"
              ? "Log In"
              : "Log Out"}
          </button>
        </div>
      )}
    </div>
  );
}
