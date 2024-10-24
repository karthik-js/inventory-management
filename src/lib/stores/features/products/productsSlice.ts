import type { Product } from "@/types/product";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [] as Product[],
    productToEdit: null as Product | null,
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
    disableProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.map((product) => {
        if (product.slug === action.payload) {
          return { ...product, isDisabled: true };
        }
        return product;
      });
    },
    enableProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.map((product) => {
        if (product.slug === action.payload) {
          return { ...product, isDisabled: false };
        }
        return product;
      });
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.slug !== action.payload
      );
    },
    setProductToEdit: (state, action: PayloadAction<Product | null>) => {
      state.productToEdit = action.payload;
    },
  },
});

export const {
  addProducts,
  updateProduct,
  removeProduct,
  disableProduct,
  enableProduct,
  setProductToEdit,
} = productsSlice.actions;

export default productsSlice.reducer;
