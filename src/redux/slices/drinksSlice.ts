import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Drink } from "../../components/types/types";

interface DrinksState {
  list: Drink[];
  selectedDrink: Drink | null;
  showDrinkModal: boolean;
  showEditModal: boolean;
  showDeleteModal: boolean; // new
}

const initialState: DrinksState = {
  list: [],
  selectedDrink: null,
  showDrinkModal: false,
  showEditModal: false,
  showDeleteModal: false,
};

const drinksSlice = createSlice({
  name: "drinks",
  initialState,
  reducers: {
    setDrinks(state, action: PayloadAction<Drink[]>) {
      state.list = action.payload;
    },
    addDrink(state, action: PayloadAction<Drink>) {
      state.list.push(action.payload);
    },
    deleteDrink(state, action: PayloadAction<string>) {
      state.list = state.list.filter((d) => d._id !== action.payload);
    },
    selectDrink(state, action: PayloadAction<Drink>) {
      state.selectedDrink = action.payload;
      state.showDrinkModal = true;
    },
    closeDrinkModal(state) {
      state.showDrinkModal = false;
      state.selectedDrink = null;
    },
    showEditDrinkModal(state) {
      state.showDrinkModal = false;
      state.showEditModal = true;
    },
    closeEditDrinkModal(state) {
      state.showEditModal = false;
      state.selectedDrink = null;
    },
    updateDrink(state, action: PayloadAction<Drink>) {
      const index = state.list.findIndex((d) => d._id === action.payload._id);
      if (index !== -1) state.list[index] = action.payload;
    },
    openDeleteDrinkModal(state) {
      state.showDeleteModal = true;
    },
    closeDeleteDrinkModal(state) {
      state.showDeleteModal = false;
    },
  },
});

export const {
  setDrinks,
  addDrink,
  updateDrink,
  deleteDrink,
  selectDrink,
  closeDrinkModal,
  showEditDrinkModal,
  closeEditDrinkModal,
  openDeleteDrinkModal,
  closeDeleteDrinkModal,
} = drinksSlice.actions;

export default drinksSlice.reducer;
