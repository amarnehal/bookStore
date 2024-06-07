import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./features/authSlice";
import bookSliceReducer from "./features/bookSlice";
import userSliceReducer from "./features/userSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    book: bookSliceReducer,
    user: userSliceReducer,
  },
});
export default store;
