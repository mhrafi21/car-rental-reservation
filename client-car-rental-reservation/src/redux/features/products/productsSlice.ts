import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCar } from "../../../interfaces";

interface ProductsState {
  products: TCar[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
  priceRange: { min: number; max: number };
  sortBy: "asc" | "desc";
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  searchQuery: "",
  selectedCategory: "",
  priceRange: { min: 0, max: 12000000 },
  sortBy: "asc",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    setPriceRange(state, action: PayloadAction<{ min: number; max: number }>) {
      state.priceRange = action.payload;
    },
    setSortBy(state, action: PayloadAction<"asc" | "desc">) {
      state.sortBy = action.payload;
    },
    clearFilters(state) {
      state.searchQuery = "";
      state.selectedCategory = "";
      state.priceRange = { min: 0, max: 12000000 };
      state.sortBy = "asc";
    },
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setPriceRange,
  setSortBy,
  clearFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
