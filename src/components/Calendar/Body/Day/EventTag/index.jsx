import React from "react";
import styled from "styled-components";

const StyledEventTag = styled.div`
    padding: 4px 6px;
    background: var(--blue);
    color: var(--white);
    position: relative;
    z-index: 1;
    flex-grow: 1;
    font-size: 0.75rem;
    line-height: 1.2;
    cursor: pointer;
`;

export const EventTag = ({ time, title, onClick }) => (
    <StyledEventTag onClick={onClick}>
        <b>{time}</b> {title}
    </StyledEventTag>
);
