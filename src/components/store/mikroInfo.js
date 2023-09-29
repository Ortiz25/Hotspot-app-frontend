import { createSlice } from "@reduxjs/toolkit";

const intialMikrotikInfoState = {
  mac: "mac",
  ip: "",
  username: "",
  linkOrig: "",
  linkLogin: "",
};

const mikrotikSlice = createSlice({
  name: "counter",
  initialState: intialMikrotikInfoState,
  reducers: {
    updateMikroInfo(state, action) {
      return (state = action.payload);
    },
  },
});

export const mikrotikActions = mikrotikSlice.actions;

export default mikrotikSlice.reducer;
