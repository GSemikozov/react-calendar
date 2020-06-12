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

export const useOnClickOutside = () => {
    const [active, setActive] = useState(false);
    const ref = useRef(null);

    const handleClickAway = (e) => {
        if (!ref.current.contains(e.target)) setActive(false);
    };

    const toggle = () => setActive(!active);

    useEffect(() => {
        if (active) document.addEventListener("mousedown", handleClickAway);
        else document.removeEventListener("mousedown", handleClickAway);

        return () => {
            document.removeEventListener("mousedown", handleClickAway);
        };
    }, [active]);

    return { ref, active, setActive, toggle };
};
