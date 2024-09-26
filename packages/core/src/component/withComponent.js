import { useProps } from '@primereact/hooks';
import * as React from 'react';
import { ComponentContext } from './Component.context';
import { globalProps } from './Component.props';

export const withComponent = (callback, defaultProps) => {
    return (inProps, ref) => {
        const parent = React.useContext(ComponentContext);
        const { props, attrs } = useProps(inProps, { ...globalProps, ...defaultProps });

        return callback({ props, attrs, parent, ref });
    };
};
