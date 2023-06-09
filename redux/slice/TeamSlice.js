import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import TeamServices from "../services/teamService"
import { toast } from "react-toastify"

const initialState = {
    team: null,
    teams: [ ],
    isError: false,
    isSucess: false,
    isLoading: false,
    message: "",
    
}

//create team
export const createTeam = createAsyncThunk("teams/create", async (formData, thunkAPI) => { 
    try {
        return await TeamServices.createTeam(formData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message)
        return thunkAPI.rejectWithValue(message)
    }
})

//get all teams
export const getAllTeams = createAsyncThunk("teams/getAllTeams", async (_, thunkAPI) => { 
    try {
        return await TeamServices.getAllTeams()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.toString())
        toast.error(message)
        return thunkAPI.rejectWithValue(message)
        
    }
})
//get team
export const getTeam = createAsyncThunk("teams/slug", async (slug, thunkAPI) => { 
    try {
        return await TeamServices.getTeamBySlug(slug)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.toString())
        toast.error(message)
        return thunkAPI.rejectWithValue(message)
    }
})

//get service by id
export const getTeamId = createAsyncThunk("teams/id", async (id, thunkAPI) => { 
    try {
        return await TeamServices.getTeamById(id)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.toString())
        toast.error(message)
        return thunkAPI.rejectWithValue(message)
    }
})

//update team
export const updateTeam = createAsyncThunk("team/update", async ({ id, formData }, thunkAPI) => { 
    try {
        return await TeamServices.updateTeam(id, formData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message ||error.toString()
        toast.error(message)
        return thunkAPI.rejectWithValue(message)
    }
})

//delete team
export const deleteTeam = createAsyncThunk("team/delete", async (id, thunkAPI) => {
    try {
        return await TeamServices.deleteTeam(id)
    } catch (error) {
        const message = (error.response && error.resonse.data && error.response.data.message) || error.message || error.toString(
   )
   toast.error(message)
        return thunkAPI.rejectWithValue(message)
    }
})

const TeamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        CAL_STORE_VALUE(state, action) { 
            console.log("store value");
        }
    },
    extraReducers: (builder) => { 
        builder.addCase(createTeam.pending, (state) => { 
            state.isLoading= true
        })
            .addCase(createTeam.fulfilled, (state, action) => { 
                state.isLoading = false
                state.isSucess = true
                state.isError = false
                state.teams.push(action.payload)
                toast.success("Team create Successfully.")
            }).addCase(createTeam.rejected, (state, action) => { 
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            }).addCase(getAllTeams.pending, (state, action) => { 
                state.isLoading = true

            }).addCase(getAllTeams.fulfilled, (state, action) => { 
                state.isError = false
                state.isLoading = false
                state.isSucess = true
                state.message = action.payload
                state.teams = action.payload
            }).addCase(getAllTeams.rejected, (state, action) => { 
                state.isError = true
                state.isLoading = false
                state.message = action.payload
                toast.error(action.payload)
            }).addCase(getTeam.pending, (state) => { 
                state.isLoading= true
            }).addCase(getTeam.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSucess = true
                state.message = action.payload
                state.team= action.payload
            }).addCase(getTeam.rejected, (state, action) => {
                state.isError = true
                state.isLoading = false
                state.message = action.payload
                toast.error(action.payload)
            }).addCase(getTeamId.pending, (state) => { 
                state.isLoading = true
            }).addCase(getTeamId.fulfilled, (state, action) => {
                state.isError = false
                state.isSucess = true
                state.isLoading = false
                state.team= action.payload
                state.message = action.payload
            }).addCase(getTeamId.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
                toast.error(action.payload)
            }).addCase(updateTeam.pending, (state) => {
                state.isLoading= true
            }).addCase(updateTeam.fulfilled, (state, action) => { 
                state.isError = false
                state.isLoading = false
                state.isSucess = true
                state.message = action.payload
                state.team= action.payload
            })
    }
})

export const { CAL_STORE_VALUE } = TeamSlice.actions
export const selectTeam = (state) => state.team.team;
export const selectAllTeam  =(state)=>state.team.teams
export const selectLoading  =(state)=>state.team.isLoading
export default TeamSlice.reducer