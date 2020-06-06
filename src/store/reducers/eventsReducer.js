import { setEventsToLocalStorage } from "../../utils";

export const eventsReducer = (state, action) => {
    let events = [];
    switch (action.type) {
        case "ADD_EVENT":
            events = [...state.events, action.payload];
            setEventsToLocalStorage(events);
            return { ...state, events };
        case "DEL_EVENT":
            events = state.events.filter((event) => event.id !== action.payload);
            setEventsToLocalStorage(events);
            return { ...state, events: events };
        case "UPDATE_EVENT":
            events = state.events.map((event) =>
                event.id === action.payload.id ? { ...event, title: action.payload.title } : event,
            );
            setEventsToLocalStorage(events);
            return { ...state, events: events };
        default:
            return state;
    }
};
