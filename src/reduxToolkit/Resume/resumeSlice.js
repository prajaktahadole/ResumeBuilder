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
  feedbackFormData: "",
  technologyApi: "",
  softSkillApi: "",
  techNameId: "",
  currentSoftSkillList: "",
  selectedMultipleLang: [],
  languageListArray: [],
  languageToSkill: "",
  newLangToSkill: "",
  currentTechnologyList: "",
  techId: "",
};

export const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setTechId: (state, action) => {
      state.techId = action.payload;
    },
    setTechNameId: (state, action) => {
      state.techNameId = action.payload;
    },
    setNewLangToSkill: (state, action) => {
      state.newLangToSkill = action.payload;
    },
    setGetResume: (state, action) => {
      state.getResumes = action.payload;
    },
    setGetFeedbackform: (state, action) => {
      state.feedbackFormData = action.payload;
    },
    setGetTechnologyApi: (state, action) => {
      state.technologyApi = action.payload;
    },
    setGetSoftskillApi: (state, action) => {
      state.softSkillApi = action.payload;
    },
    setTechnologyList: (state, action) => {
      state.currentTechnologyList = action.payload;
    },
    setSoftSkillList: (state, action) => {
      state.currentSoftSkillList = action.payload;
    },
    setselectedMultipleLang: (state, action) => {
      state.selectedMultipleLang = action.payload;
    },
    setlanguageListArray: (state, action) => {
      state.languageListArray = action.payload;
    },
    setlanguagetoSkill: (state, action) => {
      state.languageToSkill = action.payload;
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
export const {
  setGetResume,
  setTechNameId,
  setNewLangToSkill,
  setGetFeedbackform,
  setGetSoftskillApi,
  setGetTechnologyApi,
  setSoftSkillList,
  setTechnologyList,
  setTechId,
  setlanguageListArray,
  setselectedMultipleLang,
  setlanguagetoSkill,
} = resumeSlice.actions;

export default resumeSlice.reducer;
