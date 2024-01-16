import { useEffect, useState } from "react";

export default function useDebounce(value="", duration=1000) {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value);
        }, duration);
        return () => {
            clearTimeout(timer);
        };
    }, [duration, value]);
    return debounceValue;
}
