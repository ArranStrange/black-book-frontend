import React, { useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { motion } from "framer-motion";
interface Props {
  onSearch: (searchQuery: string) => void;
  toggleAddDrinkForm: () => void;
}

export default function Search({ onSearch, toggleAddDrinkForm }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchQuery);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const showAll = () => {
    setSearchQuery("");
    onSearch("");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleToggleClick = () => {
    toggleAddDrinkForm(); // Trigger the parent function to toggle the form
    setIsFormVisible((prev) => !prev); // Toggle the local state to track form visibility
  };

  return (
    <>
      <form className="search-bar" onSubmit={handleSubmit}>
        <button type="button" className="show-all" onClick={showAll}>
          Show All
        </button>
        <input
          type="search"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search"
        />
        <div className="dropdown-buttons" onClick={handleDropdown}>
          {dropdown ? <RxCross2 size={35} /> : <RxHamburgerMenu size={35} />}
        </div>

        {dropdown && (
          <div className="dropdown-search-options">
            <form className="glassware-selection">
              <input type="checkbox" id="coup" />
              <span className="checkmark"></span>
              <label id="coup">Coup</label>
              <input type="checkbox" id="hurricane" />
              <label id="hurricane">Hurricane</label>
              <input type="checkbox" id="highball" />
              <label id="highball">Hightball</label>
              <input type="checkbox" id="collins" />
              <label id="collins">Collins</label>
            </form>
          </div>
        )}
      </form>
      <button className="toggle-drink-form-button" onClick={handleToggleClick}>
        <motion.div
          animate={{ rotate: isFormVisible ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <IoMdAdd style={{ fontSize: "3rem" }} />
        </motion.div>
      </button>
    </>
  );
}
