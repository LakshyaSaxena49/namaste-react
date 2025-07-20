import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: []
  },
  reducers: {
    addItems:(state, action) => {

      // vanilla redux => Dont MUTATE STATE DIRECTLY ,  RETURNING WAS MANDATORY .
      // const newState = [...state];
      // newState.items.push(action.payload);
      // return newState;


      // Redux Toolkit - uses immer library
      // WE have to MUTATE THE STATE 
    state.items.push(action.payload);
  },
  removeItems: (state) => {
    state.items.pop();
  },
  clearCart: (state) => {
    state.items.length = 0;

    // Alternatively, you can also do:
    // return { items: [] };
  },
},
});


export const { addItems, removeItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;