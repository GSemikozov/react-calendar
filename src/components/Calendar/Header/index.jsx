import React, { useContext } from "react";
import styled from "styled-components";
import { StoreContext } from "../../../store";
import { addMonths, format, subMonths } from "date-fns";

const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 2% 0;
`;

const HeaderCol = styled.div`
    flex: 1 0 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Heading = styled.h1`
    margin: 0;
    text-transform: uppercase;
    font-weight: 900;
`;

const CalendarNav = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

const NavButton = styled.button`
    box-shadow: none;
    outline: none;
    border: none;
    background: none;
    padding: 8px;
    font-size: 1rem;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 0.3s opacity;

    &:hover {
        opacity: 0.6;
    }
`;

export const Header = ({ setCurrentMonth }) => {
    const [state, dispatch] = useContext(StoreContext);
    const { currentMonth } = state;
    const dateFormat = "MMMM yyyy";

    const nextMonth = () => {
        const nextMonth = addMonths(currentMonth, 1);
        setCurrentMonth(nextMonth);
        dispatch({
            type: "CHANGE_MONTH",
            payload: nextMonth,
        });
    };

    const prevMonth = () => {
        const prevMonth = subMonths(currentMonth, 1);
        setCurrentMonth(prevMonth);
        dispatch({
            type: "CHANGE_MONTH",
            payload: prevMonth,
        });
    };

    const currMonth = () => {
        const currentMonth = new Date();
        setCurrentMonth(currentMonth);
        dispatch({
            type: "CHANGE_MONTH",
            payload: currentMonth,
        });
    };

    return (
        <StyledHeader>
            <HeaderCol>
                <Heading>{format(currentMonth, dateFormat)}</Heading>
            </HeaderCol>
            <HeaderCol>
                <CalendarNav>
                    <NavButton onClick={prevMonth}>&lsaquo;</NavButton>
                    <NavButton onClick={currMonth}>Today</NavButton>
                    <NavButton onClick={nextMonth}>&rsaquo;</NavButton>
                </CalendarNav>
            </HeaderCol>
        </StyledHeader>
    );
};
