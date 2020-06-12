import React from "react";
import styled from "styled-components";

export const Button = styled.button`
    outline: none;
    box-shadow: none;
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: 0.3s opacity;

    &:hover {
        opacity: 0.8;
    }
`;

export const ButtonClose = styled(Button)`
    position: absolute;
    top: -12px;
    right: -12px;
    font-size: 1.2rem;
    line-height: 1;
    padding: 3px;
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    background: var(--white);
    border-radius: 50%;
    text-align: center;
`;

export const ButtonDelete = styled(Button)`
    color: var(--red);
`;

export const ButtonAdd = styled(Button)`
    color: var(--blue);
`;

export const ButtonUpdate = styled(ButtonAdd)``;
