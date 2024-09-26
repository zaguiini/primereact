import { ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useFloatLabel } from './FloatLabel.base';

export const FloatLabel = React.memo(
    React.forwardRef((inProps, inRef) => {
        const floatlabel = useFloatLabel(inProps, inRef);
        const { props, ptmi, cx, ref } = floatlabel;

        const rootProps = mergeProps(
            {
                className: cx('root')
            },
            ptmi('root')
        );

        return (
            <ComponentProvider value={floatlabel}>
                <span {...rootProps}>{props.children}</span>
            </ComponentProvider>
        );
    })
);

FloatLabel.displayName = 'FloatLabel';
