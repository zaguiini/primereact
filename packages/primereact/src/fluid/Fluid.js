import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useFluid } from './Fluid.base';

export const Fluid = React.memo(
    React.forwardRef((inProps, inRef) => {
        const fluid = useFluid(inProps, inRef);
        const {
            id,
            props,
            ptmi,
            cx,
            // element refs
            elementRef
        } = fluid;

        const rootProps = mergeProps(
            {
                id,
                className: cx('root')
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={fluid}>
                <Component as={props.as || 'div'} children={props.template || props.children} {...rootProps} ref={elementRef} />
            </ComponentProvider>
        );
    })
);

Fluid.displayName = 'Fluid';
