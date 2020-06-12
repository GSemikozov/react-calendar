import * as actionTypes from "../actions";

export const monthReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_MONTH:
            return { ...state, currentMonth: action.payload };
        default:
            return state;
    }
};
