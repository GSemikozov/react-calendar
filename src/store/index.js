import React, { createContext, useReducer, useMemo } from "react";

import { reduceReducers } from "../utils";
import { eventsReducer } from "./reducers/eventsReducer";
import { monthReducer } from "./reducers/monthReducer";

export const StoreContext = createContext(null);

const rootReducer = reduceReducers(eventsReducer, monthReducer);

export const StoreContextProvider = ({ children }) => {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const initialState = {
        events: events,
        currentMonth: new Date(),
        selectedDate: new Date(),
        loading: false,
        error: null,
    };
    const [state, dispatch] = useReducer(rootReducer, initialState);

    const store = useMemo(() => [state, dispatch], [state]);

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
