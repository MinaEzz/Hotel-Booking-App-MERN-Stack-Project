import { combineReducers } from "@reduxjs/toolkit";
import searchReducer from "./search/search.slice";

export const rootReducer = combineReducers({
  search: searchReducer,
});
