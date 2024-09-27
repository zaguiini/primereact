import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useFloatLabel } from './FloatLabel.base';

export const FloatLabel = React.memo(
    React.forwardRef((inProps, inRef) => {
        const floatlabel = useFloatLabel(inProps, inRef);
        const {
            props,
            ptmi,
            cx,
            id,
            // element refs
            elementRef
        } = floatlabel;

        const rootProps = mergeProps(
            {
                id,
                className: cx('root')
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={floatlabel}>
                <Component as={props.as || 'span'} {...rootProps} ref={elementRef}>
                    {props.children}
                </Component>
            </ComponentProvider>
        );
    })
);

FloatLabel.displayName = 'FloatLabel';
