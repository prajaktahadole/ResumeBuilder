import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SignUp, logIn } from "./accountApis";

export const logInThunk = createAsyncThunk(
  "account/logInThunk",
  async (data, { rejectWithValue }) => {
    try {
      const response = await logIn(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const SignUpThunk = createAsyncThunk(
  "account/logInThunk",
  async (data, { rejectWithValue }) => {
    try {
      const response = await SignUp(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  loading: false,
  isLogin: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logInThunk.fulfilled, (state, action) => {
      state.verifyOTPResponse = action.payload;
      state.loading = false;
    });
    builder.addCase(logInThunk.rejected, (state, action) => {
      state.verifyOTPResponse = action.payload;
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setIsLogin } = accountSlice.actions;

export default accountSlice.reducer;
