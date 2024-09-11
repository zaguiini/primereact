import { ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useFluid } from './Fluid.base';

export const Fluid = React.memo(
    React.forwardRef((inProps, inRef) => {
        const fluid = useFluid(inProps, inRef);
        const { props, ptmi, cx, ref } = fluid;

        const rootProps = mergeProps(
            {
                ref,
                className: cx('root')
            },
            ptmi('root')
        );

        return (
            <ComponentProvider value={fluid}>
                <div {...rootProps}>{props.children}</div>
            </ComponentProvider>
        );
    })
);

Fluid.displayName = 'Fluid';
