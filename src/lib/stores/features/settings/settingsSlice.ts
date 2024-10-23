import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isAdmin: true,
  },
  reducers: {
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { setIsAdmin } = settingsSlice.actions;

export default settingsSlice.reducer;
