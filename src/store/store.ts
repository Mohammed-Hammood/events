import { configureStore } from "@reduxjs/toolkit";
import EventsReducer from './slicers/events';


const store = configureStore({
    reducer: {
        events: EventsReducer
    },
    devTools: process.env.NODE_ENV === 'development'
});


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;