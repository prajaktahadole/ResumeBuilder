import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Account/accountSlice";
import notificationReducer from "./Notification/notificationSlice";
import resumeReducer from "./Resume/resumeSlice";
export const store = configureStore({
  reducer: {
    account: accountReducer,
    notification: notificationReducer,
    resume: resumeReducer,
  },
});
