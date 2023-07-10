import { RootState } from "store/store";
import { createSelector } from "@reduxjs/toolkit";


export const selectEvents = (state: RootState) => state.events;


export const selectEventsByFilters = createSelector([selectEvents], ({ events, activeCategory }) => {
    const filteredEvents = events.filter(item =>
        item.category === activeCategory.name && (
            item.year >= activeCategory.startYear &&
            item.year <= activeCategory.endYear
        ));
    return { events: filteredEvents, activeCategory };
})