import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import aboutServices from "../services/aboutService";
import { toast } from "react-toastify";

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  aboutlist: [],
  oneAbout: null,
  message: "",
};
//createAbout slice
export const createAbout = createAsyncThunk(
  "About/create",
  async (formData, thunkAPI) => {
    try {
      return await aboutServices.createAbout(formData);
    } catch (error) {
      const message = error.message || error.toString();
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//get All Abouts
export const getAllAbouts = createAsyncThunk(
  "About/getAll",
  async (_, thunkAPI) => {
    try {
      return await aboutServices.getAllAbouts();
    } catch (error) {
      const message = error.message || error.toString();
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get About by slug
export const getOneAbout = createAsyncThunk(
  "About/getOne",
  async (slug, thunkAPI) => {
    try {
      return await aboutServices.getAboutBySlug(slug);
    } catch (error) {
      const message = error.message || error.toString();
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get About by id
export const getAboutByID = createAsyncThunk(
  "About/id",
  async (id, thunkAPI) => {
    try {
      return await aboutServices.getAboutById(id);
    } catch (error) {
      const message = error.message || error.toString();
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//update
export const updateAbout = createAsyncThunk(
  "updateAbout/id",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await aboutServices.updateAbout(id, formData);
    } catch (error) {
      const message = error.message || error.toString();
      toast.error(message);
      return thunkAPI(message);
    }
  }
);

//delete About
export const deleteAbout = createAsyncThunk(
  "about/delete",
  async (id, thunkAPI) => {
    try {
      return await aboutServices.deleteAbout(id);
    } catch (error) {
      const message = error.message || error.toString();
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const AboutSlice = createSlice({
  name: "aboutus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.aboutlist.push(action.payload);
        toast.success("About create successfully.");
      })
      .addCase(createAbout.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAllAbouts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAbouts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.aboutlist = action.payload;
      })
      .addCase(getAllAbouts.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getOneAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.oneAbout = action.payload;
        state.message = action.payload;
      })
      .addCase(getOneAbout.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAboutByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAboutByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.oneAbout = action.payload;
      })
      .addCase(getAboutByID.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.oneAbout = action.payload;
        toast.success("About updated successfully.");
      })
      .addCase(updateAbout.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteAbout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAbout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("About deleted successfully.");
      })
      .addCase(deleteAbout.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const selectAbouts = (state) => state.aboutus.aboutlist
export const selectOneABout=(state)=>state.aboutus.oneAbout
export default AboutSlice.reducer;
