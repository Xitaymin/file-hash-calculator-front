import {SetStateAction, useState} from "react";

export function useStoredState<T>(key: string, defaultValue: T | (() => T)) {

    const [state, setState] = useState<T>(() => {

        const storedState = localStorage.getItem(key);

        if(storedState){
            return  JSON.parse(storedState) as T;
        }

        return defaultValue instanceof Function ? defaultValue() : defaultValue;
    });

    const setValue = (value: SetStateAction<T>) => {
        const valueToStore = value instanceof Function ? value(state) : value
        localStorage.setItem(key, JSON.stringify(valueToStore))
        setState(valueToStore)
    }

    return[state, setValue] as const
}