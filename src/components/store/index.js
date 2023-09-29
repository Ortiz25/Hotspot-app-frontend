import { configureStore } from "@reduxjs/toolkit";
import mikrotikReducer from "./mikroInfo";

const store = configureStore({
  reducer: mikrotikReducer,
});

export default store;
