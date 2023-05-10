import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllResume } from "./resumeApis";

export const getAllResumeThunk = createAsyncThunk(
  "resume/getAllResume",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getAllResume(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const initialState = {
  loading: false,
  getResumes: false,
};

export const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setGetResume: (state, action) => {
      state.getResumes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllResumeThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllResumeThunk.fulfilled, (state, action) => {
      state.getResumes = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllResumeThunk.rejected, (state, action) => {
      state.getResumes = action.payload;

      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setGetResume } = resumeSlice.actions;

export default resumeSlice.reducer;
