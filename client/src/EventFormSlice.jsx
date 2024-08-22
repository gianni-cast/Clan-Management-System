import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { fetchClans } from "./ClanSlice"

export const createEvent = createAsyncThunk("events/createEvent", async (formData, { dispatch }) => {
    const response = await axios.post('http://127.0.0.1:5555/events', formData)
    dispatch(fetchClans())
    return response.data
})

const eventFormSlice = createSlice({
    name: "eventForm",
    initialState: {
        event: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createEvent.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(createEvent.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.event = action.payload
        })
        .addCase(createEvent.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    },
})

export default eventFormSlice.reducer