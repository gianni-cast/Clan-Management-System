import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchEvent = createAsyncThunk('events/fetchEvent', async (id) => {
    const response = await axios.get(`http://127.0.0.1:5555/events/${id}`)
    return response.data
})

const eventSlice = createSlice({
    name: 'events',
    initialState: {
        event: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchEvent.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchEvent.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.event = action.payload
        })
        .addCase(fetchEvent.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    },
})

export default eventSlice.reducer