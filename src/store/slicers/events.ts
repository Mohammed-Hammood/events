import { createSlice } from "@reduxjs/toolkit";
import { CategoryTypes, EventTypes } from 'types';
import { PayloadAction } from "@reduxjs/toolkit";
import { categories } from "utils/categories";


type InitialState = {
    events: EventTypes[];
    activeCategory: CategoryTypes;
}

const initialState: InitialState = {
    events: [],
    activeCategory: categories[0],
}

const events = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvents(state, actions: PayloadAction<{ events: EventTypes[] }>) {
            state.events = actions.payload.events;
        },
        setActiveCategory(state, actions: PayloadAction<{ category: CategoryTypes }>) {
            state.activeCategory = actions.payload.category;
        },
        clearEvents(state) {
            state.events = [];
        }
    }
});

export const { setEvents, clearEvents, setActiveCategory } = events.actions;

export default events.reducer;