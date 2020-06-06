import React, { useContext, useEffect, useState } from "react";
import { format, eachDayOfInterval, startOfMonth, endOfMonth, getTime } from "date-fns";
import styled from "styled-components";

import { StoreContext } from "../../../store";

const StyledFooter = styled.div`
    color: var(--light-grey);
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    padding: 2% 0;
`;

const Button = styled.div`
    box-shadow: none;
    outline: none;
    border: none;
    background: none;
    padding: 0;
    color: var(--blue);
    margin: 0 0 0 4px;
    cursor: pointer;
`;

export const Footer = () => {
    const [state, dispatch] = useContext(StoreContext);
    const [monthEvents, setMonthEvents] = useState([]);
    const { currentMonth } = state;
    const getCurrentMonthEvents = () => {
        const dates = eachDayOfInterval({
            start: startOfMonth(currentMonth),
            end: endOfMonth(currentMonth),
        });
        const events = dates.reduce((result, day) => {
            const dayEvents = state.events.filter((event) => {
                return getTime(new Date(event.date)) === getTime(day);
            });
            return dayEvents ? [...result, ...dayEvents] : result;
        }, []);
        setMonthEvents(events);
    };

    const removeAllMonthEvents = () => {
        getCurrentMonthEvents();
        dispatch({
            type: "REMOVE_ALL_MONTH_EVENTS",
            payload: monthEvents,
        });
        setMonthEvents([]);
    };

    useEffect(() => {
        getCurrentMonthEvents();
    }, [currentMonth, state]);

    return (
        <StyledFooter>
            {monthEvents.length} events on {format(currentMonth, "MMMM yyyy")} -
            <Button type="button" onClick={removeAllMonthEvents}>
                Remove all
            </Button>
        </StyledFooter>
    );
};
