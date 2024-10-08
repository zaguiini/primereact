// @todo: 'use client';
import { createContext, useContext } from 'react';

export const ComponentContext = createContext(undefined);

export const ComponentProvider = (options) => {
    const parent = useContext(ComponentContext);
    const { pIf = true, value, children } = options;

    if (!pIf) return null;

    const instance = {
        ...value,
        $pc: {
            ...parent?.$pc,
            [`${value?.name}`]: value
        }
    };

    return <ComponentContext.Provider value={instance}>{children}</ComponentContext.Provider>;
};
