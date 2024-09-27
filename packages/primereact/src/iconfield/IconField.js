import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useIconField } from './IconField.base';

export const IconField = React.memo(
    React.forwardRef((inProps, inRef) => {
        const iconfield = useIconField(inProps, inRef);
        const {
            props,
            ptmi,
            cx,
            id,
            // element refs
            elementRef
        } = iconfield;

        const rootProps = mergeProps(
            {
                id,
                className: cx('root')
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={iconfield}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {props.children}
                </Component>
            </ComponentProvider>
        );
    })
);

IconField.displayName = 'IconField';
