import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import * as actionTypes from "../../../../store/actions";

import { StoreContext } from "../../../../store";
import { useFormInput } from "../../../../hooks";

import { ButtonAdd, ButtonClose, ButtonDelete, ButtonUpdate } from "./Button";
import { Input } from "./Input";
import { Textarea } from "./Textarea";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const ButtonsWrap = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-top: 10px;
`;

export const Form = ({ date, selected, setShowForm }) => {
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
            type: actionTypes.ADD_EVENT,
            payload: event,
        });
        onEventHideForm();
        onResetForm();
    };

    const delEvent = (id) => {
        dispatch({
            type: actionTypes.DEL_EVENT,
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
            type: actionTypes.UPDATE_EVENT,
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
