import { RootState } from "store/store";


export const selectEvents = (state: RootState) => state.events;

export const selectEventsByFilter = (state: RootState) => state.events.events.filter(item =>
        item.category === state.events.activeCategory.name && (
            item.year >= state.events.activeCategory.startYear &&
            item.year <= state.events.activeCategory.endYear
        )
    );