import type { Product } from "@/types/product";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [] as Product[],
  },
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      state.products = state.products.map((product) => {
        if (product.slug === action.payload.slug) {
          return action.payload;
        }
        return product;
      });
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.slug !== action.payload
      );
    },
  },
});

export const { addProducts, updateProduct, removeProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
