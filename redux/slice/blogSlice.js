import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogServices from "../services/blogService";
import { toast } from "react-toastify";

const initialState = {
    isError: false,
    isLoading: false,
    isSuccess: false,
    blogs: [],
    oneBlog: null,
    message:""
}

//createblog slice
export const createBlog = createAsyncThunk("blog/create", async (formData, thunkAPI) => { 
  try {
    return await blogServices.createBlog(formData)
  } catch (error) {
    const message = error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)

  }
})
//get All blogs
export const getAllBlogs = createAsyncThunk("blog/getAll", async (_, thunkAPI) => { 
try {
  return await blogServices.getAllBlogs()
} catch (error) {
  const message = error.message || error.toString()
  toast.error(message)
  return thunkAPI.rejectWithValue(message)
}
})

//get blog by slug
export const getOneBlog = createAsyncThunk("blog/getOne", async (slug, thunkAPI) => { 
  try {
    return await blogServices.getBlogBySlug(slug)
  } catch (error) {
    const message = error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
    
  }
})

//get blog by id
export const getBlogByID = createAsyncThunk("blog/id", async (id, thunkAPI) => { 
  try {
    return await blogServices.getBlogById(id)
  } catch (error) {
    const message = error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
//update
export const updateBlog = createAsyncThunk("updateBlog/id", async ({id, formData}, thunkAPI) => { 
  try {
   return await blogServices.updateBlog(id, formData)
  } catch (error) {
    const message = error.message || error.toString()
    toast.error(message)
    return thunkAPI(message)
  }
})

//delete blog
export const deleteBlog = createAsyncThunk("blog/delete", async(id, thunkAPI) => { 
  try {
  return  await blogServices.deleteBlog(id)
  } catch (error) {
    const message = error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})


const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.blogs.push(action.payload)
        toast.success("Blog create successfully.")
      }).addCase(createBlog.rejected, (state, action) => { 
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.blogs=action.payload
      }).addCase(getAllBlogs.rejected, (state, action) => { 
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })     .addCase(getOneBlog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOneBlog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.oneBlog=action.payload
        state.message= action.payload
      }).addCase(getOneBlog.rejected, (state, action) => { 
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })  .addCase(getBlogByID.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBlogByID.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.oneBlog = action.payload
      }).addCase(getBlogByID.rejected, (state, action) => { 
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      }).addCase(updateBlog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.oneBlog= action.payload
        toast.success("Blog updated successfully.")
      }).addCase(updateBlog.rejected, (state, action) => { 
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      }).addCase(deleteBlog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("Blog deleted successfully.")
      }).addCase(deleteBlog.rejected, (state, action) => { 
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
}
  
});

export const selectBlogs = (state) => state.blog.blogs
export const selectoneBlog = (state) => state.blog.oneBlog
export default BlogSlice.reducer