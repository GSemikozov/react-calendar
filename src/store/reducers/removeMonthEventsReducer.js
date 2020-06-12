import * as actionTypes from "../actions";

export const removeMonthEventsReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.REMOVE_ALL_MONTH_EVENTS:
            const events = state.events.filter((event) => {
                return !action.payload.includes(event);
            });
            return { ...state, events: events };
        default:
            return state;
    }
};
