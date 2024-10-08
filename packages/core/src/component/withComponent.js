import { PrimeReactContext } from '@primereact/core/config';
import { useAttrSelector, useId, useProps } from '@primereact/hooks';
import { toValue } from '@primeuix/utils';
import * as React from 'react';
import { ComponentContext } from './Component.context';
import { globalProps } from './Component.props';
import { useComponent } from './useComponent';

export const withComponent = (callback, defaultProps, style) => {
    return (inProps, ref, state = {}) => {
        const config = React.useContext(PrimeReactContext);
        const parent = React.useContext(ComponentContext);

        const { props, attrs } = useProps(inProps, { ...globalProps, ...defaultProps });
        const id = useId(props.id || attrs.id);
        const $attrSelector = useAttrSelector('pc');
        const elementRef = React.useRef(null);
        const name = props.__TYPE;

        const instance = {
            ref,
            elementRef,
            id,
            name,
            props,
            attrs,
            state,
            style,
            parent,
            $el: toValue(elementRef),
            $primereact: {
                config
            },
            $attrSelector
        };

        return useComponent(instance, ref, callback);
    };
};
