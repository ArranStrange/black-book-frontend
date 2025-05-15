import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchQuery {
  drinkName?: string;
  category?: string;
  glass?: string;
  ice?: string;
}

interface UIState {
  isAuthenticated: boolean;
  isRegisterVisible: boolean;
  isAddDrinkFormVisible: boolean;
  isFormVisible: boolean;
  modalMessage: string | null;
  modalTitle: string | null;
  searchQuery: SearchQuery;
  selectedLetter: string;
}

const initialState: UIState = {
  isAuthenticated: false,
  isRegisterVisible: false,
  isAddDrinkFormVisible: false,
  isFormVisible: false,
  modalMessage: null,
  modalTitle: null,
  searchQuery: {},
  selectedLetter: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setRegisterVisible(state, action: PayloadAction<boolean>) {
      state.isRegisterVisible = action.payload;
    },
    toggleAddDrinkForm(state) {
      state.isAddDrinkFormVisible = !state.isAddDrinkFormVisible;
    },
    toggleFormVisible(state) {
      state.isFormVisible = !state.isFormVisible;
    },
    setModal(state, action: PayloadAction<{ message: string; title: string }>) {
      state.modalMessage = action.payload.message;
      state.modalTitle = action.payload.title;
    },
    clearModal(state) {
      state.modalMessage = null;
      state.modalTitle = null;
    },
    setSearchQuery(state, action: PayloadAction<SearchQuery>) {
      state.searchQuery = action.payload;
    },
    setSelectedLetter(state, action: PayloadAction<string>) {
      state.selectedLetter = action.payload;
    },
    clearFilters(state) {
      state.searchQuery = {};
      state.selectedLetter = "";
    },
  },
});

export const {
  setAuthenticated,
  setRegisterVisible,
  toggleAddDrinkForm,
  toggleFormVisible,
  setModal,
  clearModal,
  setSearchQuery,
  setSelectedLetter,
  clearFilters,
} = uiSlice.actions;

export default uiSlice.reducer;
