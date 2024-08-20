import { configureStore } from "@reduxjs/toolkit"
import clansReducer from './ClansSlice'
import clanReducer from './ClanSlice'
import eventReducer from './EventSlice'

const store = configureStore({
    reducer: {
        clans: clansReducer,
        clan: clanReducer,
        event: eventReducer,
    },
})

export default store