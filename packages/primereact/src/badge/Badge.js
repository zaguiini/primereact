import { ComponentProvider } from '@primereact/core/component';
import { classNames, mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useBadge } from './Badge.base';

export const Badge = React.memo(
    React.forwardRef((inProps, inRef) => {
        const badge = useBadge(inProps, inRef);
        const { props, attrs, ptm, cx, ref } = badge;

        const rootProps = mergeProps(
            {
                ref,
                style: props.style,
                className: classNames(props.className, cx('root'))
            },
            attrs,
            ptm('root')
        );

        return (
            <ComponentProvider value={badge}>
                <span {...rootProps}>{props.value}</span>
            </ComponentProvider>
        );
    })
);

Badge.displayName = 'Badge';
