import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchClan = createAsyncThunk('clans/fetchClan', async (id) => { 
  const response = await axios.get(`http://127.0.0.1:5555/clans/${id}`)
  return response.data
})

export const deleteClan = createAsyncThunk('clans/deleteClan', async (id) => {
    await axios.delete(`http://127.0.0.1:5555/clans/${id}`)
    return id
})

export const fetchClans = createAsyncThunk('clans/fetchClans', async () => { 
    const response = await axios.get('http://127.0.0.1:5555/clans')
    return response.data
  })
  
  export const createClan = createAsyncThunk('clans/createClan', async (clanData, { dispatch }) => {
      const response = await axios.post('http://127.0.0.1:5555/clans', clanData)
      dispatch(fetchClans())
      return response.data
    })

const clanSlice = createSlice({
    name: 'clan',
    initialState: {
        clans: [],
        clan: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        resetClan: (state) => {
            state.clan = []
            state.status = 'idle'
            state.error = null
        },
        resetStatus: (state) => {
            state.status = 'loading'
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchClan.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchClan.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.clan = action.payload
        })
        .addCase(fetchClan.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
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
        .addCase(deleteClan.fulfilled, (state, action) => {
            state.clans = state.clans.filter(clan => clan.id !== action.payload)
        })
        .addCase(createClan.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.clans.push(action.payload)
        })
    },
    })

export const { resetClan, resetStatus } = clanSlice.actions

export default clanSlice.reducer