import { useEffect, useState, useRef } from "react";

export const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleReset = () => {
        setValue("");
    };

    return {
        value,
        setValue,
        onChange: handleChange,
        onReset: handleReset,
    };
};

export const usePopover = () => {
    const [activePopover, setActivePopover] = useState(false);
    const refPopover = useRef(null);

    const handleClickAway = (e) => {
        if (!refPopover.current.contains(e.target)) setActivePopover(false);
    };

    const togglePopover = () => setActivePopover(!activePopover);

    useEffect(() => {
        if (activePopover) document.addEventListener("mousedown", handleClickAway);
        else document.removeEventListener("mousedown", handleClickAway);

        return () => {
            document.removeEventListener("mousedown", handleClickAway);
        };
    }, [activePopover]);

    return { refPopover, activePopover, setActivePopover, togglePopover };
};
