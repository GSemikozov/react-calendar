import React, { useContext, useState } from "react";
import {
    addDays,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
    getTime,
} from "date-fns";
import { StoreContext } from "../../../../store";
import styled from "styled-components";

import { Day } from "../Day";

const StyledMonthDays = styled.div`
    display: grid;
    grid-template-columns: repeat(7, minmax(14.1%, 1fr));
    border-top: 1px solid var(--border);
    border-left: 1px solid var(--border);
`;

export const MonthDays = () => {
    const [state] = useContext(StoreContext);
    const { selectedDate } = state;
    const { currentDate } = state;
    const [selectedDay, setSelectedDay] = useState();
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";

    const onDayClick = (day) => {
        setSelectedDay(day);
    };

    let days = [];
    let day = startDate;
    let formattedDate = "";

    function getDayEvents(events, day) {
        return events.filter((event) => getTime(new Date(event.date)) === getTime(day));
    }

    while (day <= endDate) {
        formattedDate = format(day, dateFormat);
        const dayEvents = getDayEvents(state.events, day);
        days.push(
            <Day
                key={day}
                day={formattedDate}
                fullDate={day}
                onClick={() => onDayClick(day)}
                isActive={isSameDay(day, selectedDate)}
                isSameMonth={isSameMonth(day, monthStart)}
                events={dayEvents}
            />,
        );
        day = addDays(day, 1);
    }

    return <StyledMonthDays>{days}</StyledMonthDays>;
};
