import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchClans = createAsyncThunk('clans/fetchClans', async () => { 
  const response = await axios.get('http://127.0.0.1:5555/clans')
  return response.data
})

const clansSlice = createSlice({
    name: 'clans',
    initialState: {
        clans: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchClans.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchClans.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.clans = action.payload
        })
        .addCase(fetchClans.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    },
    })

export default clansSlice.reducer