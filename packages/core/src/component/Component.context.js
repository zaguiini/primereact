'use client';
import { createContext, useContext } from 'react';

export const ComponentContext = createContext(undefined);
// @todo: 'use client';

export const ComponentProvider = (options) => {
    const parent = useContext(ComponentContext);

    const getProps = () => {
        return undefined;
    };

    const value = {
        getProps,
        ...options.value,
        // @todo: Refactor
        $pc: {
            ...parent?.$pc,
            [`${options?.value?.name}`]: options.value
        }
        //[`$pc${options.value.name}`]: options.value,
        //$parentInstance: options.value
    };

    return <ComponentContext.Provider value={value}>{options.children}</ComponentContext.Provider>;
};
