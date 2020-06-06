import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { StoreContext } from "../../../../store";
import { useFormInput } from "../../../../hooks";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    height: 34px;
    background: var(--lighter-blue);
    color: var(--input-color);
    line-height: 1.2;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    outline: none;
    box-shadow: none;
    border: none;
    box-sizing: border-box;
    margin-bottom: 0.75rem;
`;

const Textarea = styled.textarea`
    min-height: 110px;
    background: var(--lighter-blue);
    color: var(--input-color);
    line-height: 1.2;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    outline: none;
    box-shadow: none;
    border: none;
    box-sizing: border-box;
`;

const ButtonsWrap = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 10px;
`;

const Button = styled.button`
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

const ButtonClose = styled(Button)`
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

const ButtonDelete = styled(Button)`
    color: var(--red);
`;

const ButtonAdd = styled(Button)`
    color: var(--blue);
`;

const ButtonUpdate = styled(ButtonAdd)``;

export const Form = ({ date, selected, setShowForm, children }) => {
    const name = useFormInput("");
    const time = useFormInput("");
    const desc = useFormInput("");
    const [state, dispatch] = useContext(StoreContext);
    const [selectedId, setSelectedId] = selected;

    const onResetForm = () => {
        name.onReset();
        time.onReset();
        desc.onReset();
    };

    const onEventHideForm = () => {
        setShowForm(false);
    };

    const onAddEvent = () => {
        const event = {
            id: uuidv4(),
            date: new Date(date),
            time: time.value,
            title: name.value,
            description: desc.value,
        };
        dispatch({
            type: "ADD_EVENT",
            payload: event,
        });
        onEventHideForm();
        onResetForm();
    };

    const delEvent = (id) => {
        dispatch({
            type: "DEL_EVENT",
            payload: id,
        });
    };

    const onRemoveEvent = () => {
        delEvent(selectedId);
        setSelectedId(null);
        onEventHideForm();
    };

    const updateEvent = (event) => {
        dispatch({
            type: "UPDATE_EVENT",
            payload: event,
        });
    };

    const onUpdateEvent = () => {
        updateEvent({ id: selectedId, title: name.value, description: desc.value });
        onEventHideForm();
        onResetForm();
    };

    const selectedEvent = state.events.filter((event) => event.id === selectedId);

    useEffect(() => {
        if (selectedEvent.length > 0) {
            name.setValue(selectedEvent[0].title);
            time.setValue(selectedEvent[0].time);
            desc.setValue(selectedEvent[0].description);
        }
    }, [selectedId]);

    return (
        <StyledForm>
            <ButtonClose type="button" onClick={onEventHideForm}>
                &times;
            </ButtonClose>
            <Input type="text" {...name} />
            <Input type="time" {...time} />
            <Textarea {...desc} />
            <ButtonsWrap>
                {!selectedId ? (
                    <ButtonAdd type="button" onClick={onAddEvent}>
                        add
                    </ButtonAdd>
                ) : (
                    <>
                        <ButtonUpdate type="button" onClick={onUpdateEvent}>
                            update
                        </ButtonUpdate>
                        <ButtonDelete type="button" onClick={onRemoveEvent}>
                            delete
                        </ButtonDelete>
                    </>
                )}
            </ButtonsWrap>
        </StyledForm>
    );
};
