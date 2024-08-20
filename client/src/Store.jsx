import { configureStore } from "@reduxjs/toolkit"
import clansReducer from './ClansSlice'
import clanReducer from './ClanSlice'
import eventReducer from './EventSlice'
import clanFormReducer from './ClanFormSlice'
import eventFormReducer from './CreateEventSlice'

const store = configureStore({
    reducer: {
        clans: clansReducer,
        clan: clanReducer,
        event: eventReducer,
        clanForm: clanFormReducer,
        eventForm: eventFormReducer,
    },
})

export default store