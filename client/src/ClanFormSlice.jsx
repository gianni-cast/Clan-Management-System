import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const createClan = createAsyncThunk("clans/createClan", async (formData) => {
    const response = await axios.post('http://127.0.0.1:5555/clans', formData)
    return response.data
})

const clanFormSlice = createSlice({
    name: "clanForm",
    initialState: {
        clan: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createClan.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(createClan.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.clan = action.payload
        })
        .addCase(createClan.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    },
})

export default clanFormSlice.reducer