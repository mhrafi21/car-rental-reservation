import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "../../../interfaces";

interface CartState {
  quantity: number,
  items: TProduct[];
}

const initialState: CartState = {
  quantity: 1,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<TProduct[]>) => {
      state.items = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { setCartItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
