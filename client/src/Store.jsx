import { configureStore } from "@reduxjs/toolkit"
import clanReducer from './ClanSlice'
import eventReducer from './EventSlice'
import clanFormReducer from './ClanFormSlice'
import eventFormReducer from './EventFormSlice'

const store = configureStore({
    reducer: {
        clan: clanReducer,
        event: eventReducer,
        clanForm: clanFormReducer,
        eventForm: eventFormReducer,
    },
})

export default store