import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import inquiryServices from "../services/inquiryServices"
const initialState = {
  inquiry: null,
  inquirys: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const createdInquiry = createAsyncThunk("inquiry/create", async (data, thunkAPI) => {
  try {
    return await inquiryServices.createInquiry(data)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
export const getAllInquiry = createAsyncThunk("inquiry/getAll", async (_, thunkAPI) => {
  try {
    return await inquiryServices.getAllInquiry()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
//delete 
export const deleteInquiry = createAsyncThunk("inquiry/delete", async(id, thunkAPI) => { 
  try {
  return  await inquiryServices.deleteInquiry(id)
  } catch (error) {
    const message = error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

const InquirySlice = createSlice({
  name: "inquiry",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      console.log("Store value")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createdInquiry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createdInquiry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.inquirys.push(action.payload)

        toast.success("Inquiry send successfully.")
      })
      .addCase(createdInquiry.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getAllInquiry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllInquiry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.inquirys = action.payload
      })
      .addCase(getAllInquiry.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      }).addCase(deleteInquiry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteInquiry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("Inquiry deleted successfully.")
      }).addCase(deleteInquiry.rejected, (state, action) => { 
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
  },
})

export const { CALC_STORE_VALUE } = InquirySlice.actions
export const selectIsLoading = (state) => state.inquiry.isLoading
export const selectInquiry = (state) => state.inquiry.inquirys

export default InquirySlice.reducer
