import React, { useContext, useEffect, useState } from "react";
import { format, eachDayOfInterval, startOfMonth, endOfMonth, getTime } from "date-fns";
import styled, { css } from "styled-components";
import * as actionTypes from "../../../store/actions";

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

    ${(props) =>
        props.disabled &&
        css`
            opacity: 0.5;
            pointer-events: none;
            cursor: default;
        `}
`;

export const Footer = () => {
    const [state, dispatch] = useContext(StoreContext);
    const [monthEvents, setMonthEvents] = useState([]);
    const { currentDate } = state;
    const getCurrentMonthEvents = () => {
        const dates = eachDayOfInterval({
            start: startOfMonth(currentDate),
            end: endOfMonth(currentDate),
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
        dispatch({
            type: actionTypes.REMOVE_ALL_MONTH_EVENTS,
            payload: monthEvents,
        });
        setMonthEvents([]);
    };

    useEffect(() => {
        getCurrentMonthEvents();
    }, [currentDate, state.events]);

    return (
        <StyledFooter>
            {monthEvents.length} events on {format(currentDate, "MMMM yyyy")} -
            <Button
                type="button"
                onClick={removeAllMonthEvents}
                disabled={monthEvents.length === 0}
            >
                Remove all
            </Button>
        </StyledFooter>
    );
};
