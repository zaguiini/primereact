import { resolve } from '@primeuix/utils/object';
import * as React from 'react';

// @todo - remove
export const createSafeContext = (defaultValue = null) => {
    const Context = React.createContext(defaultValue);

    const useContext = () => React.useContext(Context);
    const Provider = ({ value, children }) => <Context.Provider value={value}>{resolve(children, value)}</Context.Provider>;

    return [Provider, useContext];
};
