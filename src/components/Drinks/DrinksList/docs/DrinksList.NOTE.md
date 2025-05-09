# DrinksList Component Notes

---

## Props

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

## Custom Hooks Used

### `useDrinks()`

Manages:

- Fetching drinks from the server
- Loading and error states
- Saving and deleting drinks

### `useFilterDrinks(drinks, selectedLetter, searchQuery)`

- Filters the list of drinks by letter and search query.
- Returns a filtered array of drink objects.

---

## Authentication Check

```ts
const isGuest = localStorage.getItem("authToken") === "guest";
```

- Determines whether the user is logged in as a guest to disable certain features.

---

## Handleser

### handleDrinkClick(drink: Drink)

- Opens the `SelectedDrinkModal` with the passed drink object.

### handleCloseDrinkModal()

- Closes the selected drink modal and clears `selectedDrink`.

### handleEditClick()

- Closes the drink modal and opens the edit modal if a drink is selected.

### cancelEdit()

- Closes the edit modal and clears `selectedDrink`.

---

## Conditional Rendering

### Loading State

- Shows a shaker image and loading message while fetching data.

### Error State

- Displays an error image and message if fetching drinks fails.

---

## Drinks Rendering

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

## Modal Management

### SelectedDrinkModal

- Opened by `handleDrinkClick`
- Closed by `handleCloseDrinkModal`
- Allows editing only if not a guest

### EditDrinkModal

- Opened via `handleEditClick`
- Allows editing, saving, or deleting the selected drink
- Closed via `cancelEdit` or after save/delete

---
