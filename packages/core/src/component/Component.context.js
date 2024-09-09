'use client';
import { createContext } from 'react';

export const ComponentContext = createContext(undefined);
// @todo: 'use client';
export const ComponentProvider = (options) => {
    const getProps = () => {
        return undefined;
    };

    const value = {
        getProps,
        ...options.value
    };

    return <ComponentContext.Provider value={value}>{options.children}</ComponentContext.Provider>;
};
