import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useInputGroup } from './InputGroup.base';

export const InputGroup = React.forwardRef((inProps, inRef) => {
    const inputgroup = useInputGroup(inProps, inRef);
    const {
        props,
        ptmi,
        cx,
        id,
        // element refs
        elementRef
    } = inputgroup;

    const rootProps = mergeProps(
        {
            id,
            className: cx('root')
        },
        ptmi('root')
    );

    return (
        <ComponentProvider pIf={props.pIf} value={inputgroup}>
            <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                {props.children}
            </Component>
        </ComponentProvider>
    );
});

InputGroup.displayName = 'InputGroup';
