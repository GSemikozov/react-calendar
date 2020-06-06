import React, { useContext } from "react";
import { addDays, format, startOfWeek } from "date-fns";
import styled from "styled-components";

import { StoreContext } from "../../../../store";

const StyledWeekDays = styled.div`
    display: grid;
    grid-template-columns: repeat(7, minmax(14.1%, 1fr));
`;

const StyledWeekDay = styled.div`
    padding: 12px;
    text-align: right;
    font-size: 1.1rem;
`;

export const WeekDays = () => {
    const [state] = useContext(StoreContext);
    const { currentMonth } = state;
    const dateFormat = "EEE";
    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
        days.push(
            <StyledWeekDay key={i}>{format(addDays(startDate, i), dateFormat)}</StyledWeekDay>,
        );
    }

    return <StyledWeekDays>{days}</StyledWeekDays>;
};
