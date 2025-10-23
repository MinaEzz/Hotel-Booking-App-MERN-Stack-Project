import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IInitialState from "./search.types";

const initialState: IInitialState = {
  countryCode: null,
  checkIn: null,
  checkOut: null,
  adults: 1,
  children: 0,
  rooms: 1,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchData(_state, action: PayloadAction<IInitialState>) {
      return { ...action.payload };
    },
    updateSearchData(state, action: PayloadAction<IInitialState>) {
      return { ...state, ...action.payload };
    },
    resetSearchData() {
      return { ...initialState };
    },
  },
});

export const { setSearchData, resetSearchData } = searchSlice.actions;
export default searchSlice.reducer;
