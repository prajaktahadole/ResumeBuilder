import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  openSnackbar: false,
  severity: "success",
  message: "",
  multiNotificationData: [],
  multiNotificationVariant: "error",
  horizontalPosition: "right",
  verticalPosition: "top",
  notificationCount : 0
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMultiNotificationVariant: (state, action) => {
      state.multiNotificationVariant = action.payload;
    },
    setMultiNotificationData: (state, action) => {
      state.multiNotificationData = action.payload;
    },
    resetSnackbarState: (state) => initialState,
    setSnackbar: (state, action) => {
      state.openSnackbar = action.payload.openSnackbar;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    closeSnackbar: (state, action) => {
      state.openSnackbar = false;
      state.message = "";
      state.severity = "success";
    },
    setHorizontalPosition: (state, action) => {
      state.horizontalPosition = action.payload;
    },
    setVerticalPosition: (state, action) => {
      state.verticalPosition = action.payload;
    },
    setNotificationCount: (state, action) => {
      state.notificationCount = action.payload;
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  resetSnackbarState,
  setHorizontalPosition,
  setVerticalPosition,
  setSnackbar,
  setMultiNotificationVariant,
  closeSnackbar,
  setMultiNotificationData,
  setNotificationCount
} = notificationSlice.actions;

export default notificationSlice.reducer;
