import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const target = state.items.findIndex(basketItem => {
        return basketItem.id === action.payload.id;
      });

      if (target < 0) {
        console.error(`Can't remove the product since it doesn't exist in the basket.`)
        return;
      }

      const newBasket = [...state.items];
      newBasket.splice(target, 1);
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
