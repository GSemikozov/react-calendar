import React, { createContext, useReducer, useMemo } from "react";

import { reduceReducers } from "../utils";
import { eventsReducer } from "./reducers/eventsReducer";
import { monthReducer } from "./reducers/monthReducer";
import { removeMonthEventsReducer } from "./reducers/removeMonthEventsReducer";

export const StoreContext = createContext(null);

const rootReducer = reduceReducers(eventsReducer, monthReducer, removeMonthEventsReducer);

export const StoreContextProvider = ({ children }) => {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const initialState = {
        events: events,
        currentDate: new Date(),
        selectedDate: new Date(),
    };
    const [state, dispatch] = useReducer(rootReducer, initialState);

    const store = useMemo(() => [state, dispatch], [state]);

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
