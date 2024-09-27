'use client';
// @todo: 'use client';
import { createContext, useContext } from 'react';

export const ComponentContext = createContext(undefined);

export const ComponentProvider = (options) => {
    const parent = useContext(ComponentContext);

    const value = {
        ...options.value,
        $pc: {
            ...parent?.$pc,
            [`${options?.value?.name}`]: options.value
        }
    };

    return <ComponentContext.Provider value={value}>{options.children}</ComponentContext.Provider>;
};
