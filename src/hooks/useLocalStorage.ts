import { useState, useEffect } from "react";


export function useLocalStorage<T>(
    key: string,
    initialValue: T
){
    // Step 1: read existing data from localstorage
    const [value, setValue] = useState<T>(() => {
        try {
            const savedValue = localStorage.getItem(key);

            if (savedValue === null) {
                return initialValue;
            }

            return JSON.parse(savedValue) as T;
        } catch (error){
            console.error("Error reading localStorage:", error);
            return initialValue
        }
    });

    // Step 2: save whenever value changes
    useEffect(() => {
        try {
            localStorage.setItem(
                key,
                JSON.stringify(value)
            );
        } catch (error) {
            console.error("Error saving localStorage:", error);
        }
    }, [key, value]);

    // Step 3: return state and its setter
    return [value, setValue] as const;
}