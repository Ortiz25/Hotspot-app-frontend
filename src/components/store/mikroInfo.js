import { createSlice } from "@reduxjs/toolkit";

const intialMikrotikInfoState = {
  mac: null,
  ip: null,
  username: null,
  plan: 0,
  planBalance: 0,
};

export const mikrotikSlice = createSlice({
  name: "counter",
  initialState: intialMikrotikInfoState,
  reducers: {
    updateMikroInfo: (state, action) => {
      state.ip = action.payload.ip;
      state.mac = action.payload.mac;
      // switch (action.type) {
      //   case "start":
      //     return {
      //       ...state,
      //       ip: action.payload.ip,
      //       mac: action.payload.mac,
      //       username: action.payload.username,
      //     };
      //   case "s":
      //     return { ...state, ip: action.payload };
      //   case "plan":
      //     return { ...state, plan: action.payload };
      //   case "planBalance":
      //     return { ...state, planBalance: action.payload };
      //   default:
      //     return state;
      // }
    },
  },
});

export const mikrotikActions = mikrotikSlice.actions;

export default mikrotikSlice.reducer;
