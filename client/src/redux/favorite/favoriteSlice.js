import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorite: false,
  },
  reducers: {
    addFavorite: (state) => {
      state.favorite = true;
    },
    removeFavorite: (state) => {
      state.loading = false;
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
