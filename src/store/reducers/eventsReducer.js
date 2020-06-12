import * as actionTypes from "../actions";

export const eventsReducer = (state, action) => {
    let events = [];
    switch (action.type) {
        case actionTypes.ADD_EVENT:
            events = [...state.events, action.payload];
            return { ...state, events };
        case actionTypes.DEL_EVENT:
            events = state.events.filter((event) => event.id !== action.payload);
            return { ...state, events: events };
        case actionTypes.UPDATE_EVENT:
            events = state.events.map((event) =>
                event.id === action.payload.id ? { ...event, title: action.payload.title } : event,
            );
            return { ...state, events: events };
        default:
            return state;
    }
};
