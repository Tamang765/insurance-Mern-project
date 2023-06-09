import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import TestimonialService from '../services/TestimonialService';

const initialState = {
    isError: false,
    isLoading: false,
    isSuccess: false,
    testimonial:[],
    message:""
}


export const createTestimonial = createAsyncThunk("testimonial/create", async (formData, thunkAPI) => { 
    try {
        return await TestimonialService.createTestimonial(formData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllTestimonial=createAsyncThunk("testimonial/getAll",
    async(_, thunkAPI) => { 
        try {
            const response = await TestimonialService.getAllTestimonialService();
            return response;
        } catch (error) {
            const message = error.response && error.response.data;
            toast.error(message);
            return thunkAPI.rejectWithValue(message)
        }
    }
)
export const deleteTestimonial = createAsyncThunk("testimonial/delete", async (id, thunkAPI) => {
    try {
        return await TestimonialService.deleteTestimonial(id)
    } catch (error) {
        const message = (error.response && error.resonse.data && error.response.data.message) || error.message || error.toString(
   )
   toast.error(message)
        return thunkAPI.rejectWithValue(message)
    }
})

const TestimonialSlice = createSlice({
  name: "testimonial",
  initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder.addCase(createTestimonial.pending, (state) => { 
            state.isLoading= true
        })
            .addCase(createTestimonial.fulfilled, (state, action) => { 
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.testimonial.push(action.payload)
                toast.success("Team create Successfully.")
            }).addCase(createTestimonial.rejected, (state, action) => { 
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            }).addCase(getAllTestimonial.pending, (state) => { 
            state.isLoading = true;
        }).addCase(getAllTestimonial.fulfilled, (state, action) => { 
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.testimonial = action.payload;
        }).addCase(getAllTestimonial.rejected, (state, action) => { 
            state.isError = true;
            toast.error(action.error.message);
        })
    }
});
export const selectTestimonial = (state) => state.testimonial.testimonial;
export default TestimonialSlice.reducer;