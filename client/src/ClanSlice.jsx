import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchClan = createAsyncThunk('clans/fetchClan', async (id) => { 
  const response = await axios.get(`http://127.0.0.1:5555/clans/${id}`)
  return response.data
})

const clanSlice = createSlice({
    name: 'clan',
    initialState: {
        clan: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchClan.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchClan.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Add any fetched clans to the array
            state.clan = action.payload
        })
        .addCase(fetchClan.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    },
    })

export default clanSlice.reducer