Here's your clean and well-structured **Markdown documentation file** for the `DrinksList` component, based on all your inline comments.

---

### 📄 `drinks-list-notes.md`

````md
# 🍹 DrinksList Component Notes

This document explains the functionality and behavior of the `DrinksList` component in the frontend of the drinks app. It displays a list of drinks, allows viewing and editing drink details, and handles user interaction and application state.

---

## 📦 Props

```ts
interface DrinksListProps {
  selectedLetter: string;
  searchQuery: {
    drinkName?: string;
    category?: string;
    glass?: string;
    ice?: string;
  };
}
```
````

- **selectedLetter**: Used to filter drinks alphabetically.
- **searchQuery**: An object containing optional fields used to filter the list of drinks.

---

## 🧠 State Management

- `showDrinkModal`: Controls visibility of the drink detail modal.
- `selectedDrink`: Stores the currently selected drink object.
- `showEditModal`: Controls visibility of the edit modal.

---

## 🧲 Custom Hooks Used

### `useDrinks()`

Manages:

- Fetching drinks from the server
- Loading and error states
- Saving and deleting drinks

### `useFilterDrinks(drinks, selectedLetter, searchQuery)`

- Filters the list of drinks by letter and search query.
- Returns a filtered array of drink objects.

---

## 🧪 Authentication Check

```ts
const isGuest = localStorage.getItem("authToken") === "guest";
```

- Determines whether the user is logged in as a guest to disable certain features.

---

## 🧾 Core Handlers

### handleDrinkClick(drink: Drink)

- Opens the `SelectedDrinkModal` with the passed drink object.

### handleCloseDrinkModal()

- Closes the selected drink modal and clears `selectedDrink`.

### handleEditClick()

- Closes the drink modal and opens the edit modal if a drink is selected.

### cancelEdit()

- Closes the edit modal and clears `selectedDrink`.

---

## ⏳ Conditional Rendering

### Loading State

- Shows a shaker image and loading message while fetching data.

### Error State

- Displays an error image and message if fetching drinks fails.

---

## 🗺️ Drinks Rendering

```tsx
{
  filteredDrinks.map((drink) => (
    <div onClick={() => handleDrinkClick(drink)}>...</div>
  ));
}
```

- Maps over `filteredDrinks` to render each drink card.
- Uses a default image if `DrinkThumb` is not available.
- Click on a drink card opens its modal.

---

## 🪟 Modal Management

### SelectedDrinkModal

- Opened by `handleDrinkClick`
- Closed by `handleCloseDrinkModal`
- Allows editing only if not a guest

### EditDrinkModal

- Opened via `handleEditClick`
- Allows editing, saving, or deleting the selected drink
- Closed via `cancelEdit` or after save/delete

---

## 🧩 UI Files / Assets Used

- `EditDrinkModal`: Modal for editing drinks
- `SelectedDrinkModal`: Modal for viewing selected drink
- `Shaker.png`: Shown during loading
- `Spill.png`: Shown on error
- `drinks-list.css`: Local styling for component

---

## 🧠 Summary

| Feature         | Description                                           |
| --------------- | ----------------------------------------------------- |
| Fetch drinks    | Uses `useDrinks()` to retrieve and manage drinks      |
| Filter logic    | Uses `useFilterDrinks()` for letter/query filtering   |
| Guest mode      | Checks `authToken` to restrict edit/delete features   |
| Drink selection | Opens modal with drink info on card click             |
| Drink editing   | Allows saving or deleting from the edit modal         |
| Responsive UI   | Conditionally shows loading, error, and modal content |

```

---

Let me know if you'd like a refactored `.tsx` version with comments replaced by links to this `.md` file (like you’ve done previously).
```
