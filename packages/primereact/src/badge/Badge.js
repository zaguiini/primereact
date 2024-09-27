import { Component, ComponentProvider } from '@primereact/core/component';
import { classNames, mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useBadge } from './Badge.base';

export const Badge = React.memo(
    React.forwardRef((inProps, inRef) => {
        const badge = useBadge(inProps, inRef);
        const { props, ptm, ptmi, cx, ref } = badge;

        const rootProps = mergeProps(
            {
                ref,
                style: props.style,
                className: classNames(cx('root'), props.className)
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={badge}>
                <Component as={props.as || 'span'} {...rootProps} ref={elementRef}>
                    {props.value}
                </Component>
            </ComponentProvider>
        );
    })
);

Badge.displayName = 'Badge';
