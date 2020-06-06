import { setEventsToLocalStorage } from "../../utils";

export const monthReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_MONTH":
            return { ...state, currentMonth: action.payload };
        case "REMOVE_ALL_MONTH_EVENTS":
            const events = state.events.filter((event) => {
                return !action.payload.includes(event);
            });
            setEventsToLocalStorage(events);
            return { ...state, events: events };
        default:
            return state;
    }
};
