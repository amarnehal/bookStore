import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dbServices from "@/appWrite/db/db";

export const getUserById = createAsyncThunk(
  "getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      console.log("userID -------from Slice --", userId);
      const existingUser = await dbServices.getUserById(userId);
      if (existingUser) {
        return existingUser;
      } else {
        return rejectWithValue("User not found");
      }
    } catch (error) {
      console.log("Failed to fetch user with thunk middleware : ", error);
      return rejectWithValue(error.message || "Failed to fetch user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: true,
    userInfo: null,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
      state.isError = false;
      state.message = "Success";
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.error.message || "Failed to get user";
    });
  },
});
export default userSlice.reducer;
