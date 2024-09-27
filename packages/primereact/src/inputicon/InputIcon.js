import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useInputIcon } from './InputIcon.base';

export const InputIcon = React.memo(
    React.forwardRef((inProps, inRef) => {
        const inputicon = useInputIcon(inProps, inRef);
        const {
            props,
            ptmi,
            cx,
            id,
            // element refs
            elementRef
        } = inputicon;

        const rootProps = mergeProps(
            {
                id,
                className: cx('root')
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={inputicon}>
                <Component as={props.as || 'span'} {...rootProps} ref={elementRef}>
                    {props.children}
                </Component>
            </ComponentProvider>
        );
    })
);

InputIcon.displayName = 'InputIcon';
