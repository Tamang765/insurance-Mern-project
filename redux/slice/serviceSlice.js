import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../services/service";
import { toast } from "react-toastify";

const initialState = {
    isError: false,
    isLoading: false,
    isSuccess: false,
    services: [],
    oneservice: null,
    message:""
}

//createService slice
export const createService = createAsyncThunk("service/create", async (formData, thunkAPI) => { 
  try {
    return await services.createService(formData)
  } catch (error) {
    const message = error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)

  }
})
//get All blogs
export const getAllService = createAsyncThunk("service/getAll", async (_, thunkAPI) => { 
try {
  return await services.getAllService()
} catch (error) {
  const message = error.message || error.toString()
  toast.error(message)
  return thunkAPI.rejectWithValue(message)
}
})

//get blog by slug
export const getService = createAsyncThunk("service/getOne", async (slug, thunkAPI) => { 
  try {
    return await services.getServiceBySlug(slug)
  } catch (error) {
    const message = error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
    
  }
})

//get service by id
export const getServiceByID = createAsyncThunk("service/id", async (id, thunkAPI) => { 
  try {
    return await services.getServiceById(id)
  } catch (error) {
    const message = error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
//update
export const updateService = createAsyncThunk("updateService/id", async ({id, formData}, thunkAPI) => { 
  try {
   return await services.updateService(id, formData)
  } catch (error) {
    const message = error.message || error.toString()
    toast.error(message)
    return thunkAPI(message)
  }
})

//delete blog
export const deleteService = createAsyncThunk("service/delete", async(id, thunkAPI) => { 
  try {
  return  await services.deleteService(id)
  } catch (error) {
    const message = error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})


const ServiceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.services.push(action.payload)
        toast.success("Service create successfully.")
      }).addCase(createService.rejected, (state, action) => { 
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getAllService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllService.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.services=action.payload
      }).addCase(getAllService.rejected, (state, action) => { 
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })     .addCase(getService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getService.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.oneservice=action.payload
        state.message= action.payload
      }).addCase(getService.rejected, (state, action) => { 
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })  .addCase(getServiceByID.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getServiceByID.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.oneservice = action.payload
      }).addCase(getServiceByID.rejected, (state, action) => { 
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      }).addCase(updateService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.oneservice= action.payload
        toast.success("About updated successfully.")
      }).addCase(updateService.rejected, (state, action) => { 
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      }).addCase(deleteService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("Blog deleted successfully.")
      }).addCase(deleteService.rejected, (state, action) => { 
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
}
  
});

export const selectServices = (state) => state.service.services
export const selectOneservice = (state) => state.service.oneservice
export default ServiceSlice.reducer