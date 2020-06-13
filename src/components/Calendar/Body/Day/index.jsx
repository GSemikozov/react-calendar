import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Animated } from "react-animated-css";

import { useOnClickOutside } from "../../../../hooks";
import { EventTag } from "./EventTag";
import { Form } from "../Form/index";

const StyledPopover = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(50% - 55px);
    left: 50%;
    z-index: 3;
    background: var(--white);
    box-shadow: 0px 6px 11px rgba(22, 97, 161, 0.11);
    border-radius: 10px;
    box-sizing: border-box;

    &:after {
        content: "";
        position: absolute;
        left: -5px;
        top: 50px;
        background: var(--white);
        transform: matrix(0.71, -0.5, 1, 0.71, 0, 0);
        width: 14px;
        height: 14px;
    }
`;

const DayWrap = styled.div`
    border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    position: relative;
    display: grid;
    place-items: center;

    &:before {
        content: "";
        display: block;
        padding-bottom: 100%;
        grid-area: 1 / 1 / 2 / 2;
    }
`;

const DayEmptyEvents = styled.div`
    height: 100%;
    z-index: 1;
    flex-grow: 1;
`;

const StyledDay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    ${(props) =>
        !props.isSameMonth &&
        css`
            opacity: 0.5;
            pointer-events: none;
            cursor: default;
        `}

    ${(props) =>
        props.isActive &&
        css`
            background-color: var(--light-blue);
        `}
`;

const DayNumber = styled.span`
    display: inline-block;
    width: 24px;
    height: 24px;
    padding: 4px;
    border-radius: 50%;
    text-align: center;
    line-height: 16px;
    position: absolute;
    top: 10px;
    right: 10px;
    color: var(--grey);
    z-index: 2;
    box-sizing: border-box;

    ${(props) =>
        props.isActive &&
        css`
            background-color: var(--blue);
            color: var(--white);
        `}
`;

export const Day = ({ day, fullDate, isActive, isSameMonth, events, onClick }) => {
    const [selectedId, setSelectedId] = useState();
    const { ref: refPopover, active: activePopover, toggle: togglePopover } = useOnClickOutside();

    const handleShowForm = () => {
        onClick();
        togglePopover();
    };

    const handleEventClick = (id) => {
        if (id) setSelectedId(id);
        togglePopover();
    };

    const displayEvents = events.map((event) => {
        return (
            <EventTag
                key={event.id}
                time={event.time}
                title={event.title}
                onClick={() => handleEventClick(event.id)}
            />
        );
    });

    return (
        <DayWrap>
            <StyledDay isSameMonth={isSameMonth} isActive={isActive}>
                <DayNumber isActive={isActive}>{day}</DayNumber>
                {events.length > 0 ? (
                    displayEvents
                ) : (
                    <DayEmptyEvents onClick={handleShowForm}></DayEmptyEvents>
                )}
            </StyledDay>
            {activePopover && (
                <Animated
                    animationIn="bounceIn"
                    isVisible={activePopover}
                    style={{ position: "absolute", zIndex: 10 }}
                >
                    <StyledPopover ref={refPopover}>
                        <Form
                            date={fullDate}
                            selected={[selectedId, setSelectedId]}
                            setShowForm={togglePopover}
                        />
                    </StyledPopover>
                </Animated>
            )}
        </DayWrap>
    );
};
