import React, { useContext, useEffect, useState } from "react";

import { Header } from "./Header";
import { Body } from "./Body";
import { Footer } from "./Footer";
import { StoreContext } from "../../store";
import { setEventsToLocalStorage } from "../../utils";

export const Calendar = () => {
    const [state] = useContext(StoreContext);
    const { currentDate: curMonth } = state;
    const [currentMonth, setCurrentMonth] = useState(curMonth);

    useEffect(() => {
        setEventsToLocalStorage(state.events);
    }, [state.events]);

    return (
        <>
            <Header currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
            <Body currentMonth={currentMonth} />
            <Footer currentMonth={currentMonth} />
        </>
    );
};
