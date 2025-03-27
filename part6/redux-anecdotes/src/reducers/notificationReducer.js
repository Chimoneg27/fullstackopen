import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

export const { createNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer;
