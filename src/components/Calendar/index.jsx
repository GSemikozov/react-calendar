import React, { useContext, useState } from "react";

import { Header } from "./Header";
import { Body } from "./Body";
import { Footer } from "./Footer";
import { StoreContext } from "../../store";

export const Calendar = () => {
    const [state] = useContext(StoreContext);
    const { currentMonth: curMonth } = state;
    const [currentMonth, setCurrentMonth] = useState(curMonth);

    return (
        <>
            <Header currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
            <Body currentMonth={currentMonth} />
            <Footer currentMonth={currentMonth} />
        </>
    );
};
