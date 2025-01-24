import React, { useEffect, useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { motion } from "framer-motion";

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

export default function Search({
  onSearch,
  toggleAddDrinkForm,
  onShowAll,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGlass, setSelectedGlass] = useState("");
  const [selectedIce, setSelectedIce] = useState("");

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const isGuest = localStorage.getItem("authToken") === "guest";

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Construct the search query object
    const searchQueryObject = {
      drinkName: searchQuery.trim() ? searchQuery : undefined, // Only include if there's a query
      category: selectedCategory || undefined, // Only include if selected
      glass: selectedGlass || undefined, // Only include if selected
      ice: selectedIce || undefined, // Only include if selected
    };

    // Call the onSearch function with the query object
    onSearch(searchQueryObject);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // const showAll = () => {
  //   setSearchQuery("");
  //   setSelectedCategory("");
  //   setSelectedGlass("");
  //   setSelectedIce("");
  //   onSearch({});
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  const handleToggleClick = () => {
    toggleAddDrinkForm();
    setIsFormVisible((prev) => !prev);
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
      drinkName: searchQuery.trim() ? searchQuery : undefined,
      category: selectedCategory || undefined,
      glass: selectedGlass || undefined,
      ice: selectedIce || undefined,
    };

    console.log(searchQueryObject);
    onSearch(searchQueryObject);

    setIsSearchFocused(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="search-container">
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
      <form
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="search-bar"
        onSubmit={handleSearchSubmit} // Update the onSubmit handler
      >
        <input
          type="search"
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
              <select name="glass" id="glass" onChange={handleSelectChange}>
                <option value="">Not Defined</option>
                <option value="highball">Highball</option>
                <option value="coup">Coup</option>
                <option value="hurricane">Hurricane</option>
                <option value="old fashioned">Old Fashioned</option>
                <option value="julep cup">Julep Cup</option>
                <option value="wine">Wine Glass</option>
                <option value="flute">Flute</option>
              </select>

              <label htmlFor="ice">Ice Type:</label>
              <select name="ice" id="ice" onChange={handleSelectChange}>
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
      <button type="button" className="show-all" onClick={onShowAll}>
        Show All
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
