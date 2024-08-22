import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { fetchClans } from "./ClanSlice"

export const fetchEvent = createAsyncThunk('events/fetchEvent', async (id) => {
    const response = await axios.get(`http://127.0.0.1:5555/events/${id}`)
    return response.data
})

export const updateParticipationStatus = createAsyncThunk('events/updateParticipationStatus', async ({ participationId, status }, { dispatch }) => {
    const response = await axios.patch(`http://127.0.0.1:5555/participations/${participationId}`, { participation_status: status })
    dispatch(fetchClans())
    return response.data
})

const eventSlice = createSlice({
    name: 'events',
    initialState: {
        event: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        resetEvent: (state) => {
            state.event = null
            state.status = 'idle'
            state.error = null
        }
    },
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
            .addCase(updateParticipationStatus.fulfilled, (state, action) => {
                const updatedParticipation = action.payload
                const participationIndex = state.event.participations.findIndex(participation => participation.id === updatedParticipation.id)
                if (participationIndex !== -1) {
                    state.event.participations[participationIndex] = updatedParticipation
                }
            })
    },
})

export const { resetEvent } = eventSlice.actions

export default eventSlice.reducer