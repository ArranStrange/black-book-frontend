import React, { useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import "./search.css";

//typescript defining props
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
  //props
  onSearch,
  onShowAll,
}: Props) {
  //
  //
  //state
  //UI effecting state
  const [dropdown, setDropdown] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  //
  //
  // Search effecting state
  const [searchQuery, setSearchQuery] = useState(""); // holds the value of the text input
  const [selectedCategory, setSelectedCategory] = useState(""); //holds the value of the category dropdown
  const [selectedGlass, setSelectedGlass] = useState(""); //holds the value of the glass dropdown
  const [selectedIce, setSelectedIce] = useState(""); //holds the value of the ice dropdown
  //
  //
  // when search is focused and unfocused toggles the category, ice and glass dropdown
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };
  //
  //
  // handles changes in the text input
  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    //updates the state to the current value
    setSearchQuery(event.target.value);
  };
  //
  //
  // reads the name and the value of the dropdown elements and updates the state
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // looks at the name and the value of the HTML field
    const { name, value } = event.target;
    // if name === category, updated the selected Category state with the value
    if (name === "category") {
      setSelectedCategory(value);
      // if name === glass, updated the selected Glass state with the value
    } else if (name === "glass") {
      setSelectedGlass(value);
      // if name === Ice, updated the selected Ice state with the value
    } else if (name === "ice") {
      setSelectedIce(value);
    }
  };
  //
  //
  //
  // handles on focuse for the search elements
  const handleFocus = () => {
    setIsSearchFocused(true);
    //this triggers the dropdown
  };
  //
  //
  //
  const handleBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    // checks if the search element is still in focus
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      // if not in focus, set is Search Focused to false - closing the dropdown
      setIsSearchFocused(false);
    }
  };
  //
  //
  // handles the search submit
  const handleSearchSubmit = (
    //takes the form
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault(); //prevents the page from rerendering
    // creates the searchQueryObject
    const searchQueryObject = {
      //takes the text from the text input state and removes the white space, or sets as undefined
      drinkName: searchQuery.trim() || undefined,
      //sets the category to the input state
      category: selectedCategory || undefined,
      //sets the glass to the input state
      glass: selectedGlass || undefined,
      //sets the ice to the input state
      ice: selectedIce || undefined,
    };
    //calls onSearch from app.tsx and passes it the searchQueryObject we just created
    onSearch(searchQueryObject);

    //resets all of the inputs
    setSelectedCategory("");
    setSelectedGlass("");
    setSelectedIce("");
    //sets the focus to false closing the dropdown
    setIsSearchFocused(false);
    //scrolls to the top of the page to show the returned array from the start
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  //
  //
  // handles the clear filters button buy resetting all the inputs of the search
  const handleShowAll = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedGlass("");
    setSelectedIce("");
    onShowAll();
  };
  //
  //
  // handles log out
  const handleLogout = () => {
    //when log out is clicked,
    localStorage.removeItem("authToken"); // clears the authToken
    window.location.reload(); //reloads the page
  };

  return (
    <div className="search-container">
      <form
        onFocus={handleFocus}
        className="search-bar"
        onSubmit={handleSearchSubmit}
        onBlur={handleBlur}
      >
        <input
          type="search"
          id="searchInput"
          value={searchQuery}
          onChange={handleSearchQueryChange}
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
                onMouseDown={(e) => e.stopPropagation()}
              >
                <option value="">Not Defined</option>
                <option value="aperitif">Aperitif</option>
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
                onMouseDown={(e) => e.stopPropagation()}
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
                onMouseDown={(e) => e.stopPropagation()}
              >
                <option value="">Not Defined</option>
                <option value="cubed">Cubed</option>
                <option value="crushed">Crushed</option>
                <option value="block">Block</option>
                <option value="shaved">Shaved</option>
                <option value="straight">Straight Up</option>
              </select>
            </div>
            <div className="search-buttons">
              <button className="search-button" type="submit">
                Search
              </button>
              <button
                className="search-close-button"
                onClick={() => setIsSearchFocused(false)}
              >
                <RxCross2 size={35} />
              </button>
            </div>
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
