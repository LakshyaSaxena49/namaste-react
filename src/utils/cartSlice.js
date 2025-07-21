import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItems: (state, action) => {
      // vanilla redux => Dont MUTATE STATE DIRECTLY ,  RETURNING WAS MANDATORY .
      // const newState = [...state];
      // newState.items.push(action.payload);
      // return newState;

      // Redux Toolkit - uses immer library
      // WE have to MUTATE THE STATE
      state.items.push(action.payload);
    },

    // ✅ Updated to support removing a specific item by ID
    removeItems: (state, action) => {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== itemIdToRemove);
    },
    removeItemById: (state, action) => {
      const idToRemove = action.payload;
      const index = state.items.findIndex((item) => item.id === idToRemove);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    // ✅ Clear the cart by resetting items to an empty array
    // This will remove all items from the cart
    clearCart: (state) => {
      state.items.length = 0;

      // Alternatively, you can also do:
      // return { items: [] };
    },
  },
});

export const { addItems, removeItems, removeItemById, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
