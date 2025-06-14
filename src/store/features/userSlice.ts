// app/features/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  SelectedValue: "all",
  ifAdmin: "admin",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setSelectedValue: (state, action) => {
      state.SelectedValue = action.payload;
    },
    setIfAdmin: (state, action) => {
      state.ifAdmin = action.payload;
    },
  },
});

export const { setSearchValue, setSelectedValue, setIfAdmin } =
  userSlice.actions;
export default userSlice.reducer;
