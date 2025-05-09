```md
# Search Bar Component Notes

## State Management

### UI_States

- **dropdown**: toggles visibility of the dropdown menu
- **isSearchFocused**: shows or hides the search dropdown

### Search_Input_State

- **searchQuery**: value of the text input field
- **selectedCategory**: value from the category dropdown
- **selectedGlass**: value from the glass dropdown
- **selectedIce**: value from the ice dropdown

---

## Event Handlers

### handleDropdown

Toggles the visibility of the hamburger dropdown options.

### handleSearchQueryChange

Updates the `searchQuery` state when the user types in the search box.

### handleSelectChange

Dynamically updates the relevant dropdown state (`category`, `glass`, or `ice`) based on the `name` of the input.

### handleFocus

Sets `isSearchFocused` to `true` to display the dropdown.

### handleBlur

Closes the dropdown if focus is lost from the search form.

### handleSearchSubmit

- Prevents the page from reloading
- Constructs a `searchQueryObject` from current states
- Calls `onSearch` with the query object
- Resets dropdowns
- Scrolls the page to the top

### handleShowAll

Resets all input values and calls `onShowAll`.

### handleLogout

Removes the `authToken` from local storage and reloads the page.
```
