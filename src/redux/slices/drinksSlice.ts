import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Drink } from "../../components/types/types";

interface DrinksState {
  list: Drink[];
  loading: boolean;
  error: string | null;
  selectedDrink: Drink | null;
  showDrinkModal: boolean;
  showEditModal: boolean;
}

const initialState: DrinksState = {
  list: [],
  loading: false,
  error: null,
  selectedDrink: null,
  showDrinkModal: false,
  showEditModal: false,
};

const drinksSlice = createSlice({
  name: "drinks",
  initialState,
  reducers: {
    // Data fetching
    setDrinks(state, action: PayloadAction<Drink[]>) {
      state.list = action.payload;
    },

    // Loading and error
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },

    // CRUD operations
    addDrink(state, action: PayloadAction<Drink>) {
      state.list.push(action.payload);
      state.list.sort((a, b) =>
        (a.drinkName ?? "").localeCompare(b.drinkName ?? "")
      );
    },
    updateDrink(state, action: PayloadAction<Drink>) {
      const updatedDrink = action.payload;
      const index = state.list.findIndex((d) => d._id === updatedDrink._id);
      if (index !== -1) {
        state.list[index] = updatedDrink;
      }
      if (state.selectedDrink?._id === updatedDrink._id) {
        state.selectedDrink = updatedDrink;
      }
    },
    deleteDrinkFromStore(state, action: PayloadAction<string>) {
      state.list = state.list.filter((drink) => drink._id !== action.payload);
      state.showDrinkModal = false;
    },

    // Modal and selection state
    selectDrink(state, action: PayloadAction<Drink>) {
      state.selectedDrink = action.payload;
      state.showDrinkModal = true;
    },
    closeDrinkModal(state) {
      state.showDrinkModal = false;
    },
    showEditDrinkModal(state) {
      state.showEditModal = true;
    },
    closeEditDrinkModal(state) {
      state.showEditModal = false;
    },
    clearSelectedDrink(state) {
      state.selectedDrink = null;
    },
  },
});

export const {
  setDrinks,
  setLoading,
  setError,
  addDrink,
  updateDrink,
  deleteDrinkFromStore,
  selectDrink,
  closeDrinkModal,
  showEditDrinkModal,
  closeEditDrinkModal,
  clearSelectedDrink,
} = drinksSlice.actions;

export default drinksSlice.reducer;
