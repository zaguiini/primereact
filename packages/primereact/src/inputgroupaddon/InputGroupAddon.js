import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useInputGroupAddon } from './InputGroupAddon.base';

export const InputGroupAddon = React.forwardRef((inProps, inRef) => {
    const inputgroupaddon = useInputGroupAddon(inProps, inRef);
    const {
        props,
        ptmi,
        cx,
        id,
        // element refs
        elementRef
    } = inputgroupaddon;

    const rootProps = mergeProps(
        {
            id,
            className: cx('root')
        },
        ptmi('root')
    );

    return (
        <ComponentProvider pIf={props.pIf} value={inputgroupaddon}>
            <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                {props.children}
            </Component>
        </ComponentProvider>
    );
});

InputGroupAddon.displayName = 'InputGroupAddon';
