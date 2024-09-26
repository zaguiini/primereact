import { ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useInputIcon } from './InputIcon.base';

export const InputIcon = React.memo(
    React.forwardRef((inProps, inRef) => {
        const inputicon = useInputIcon(inProps, inRef);
        const { props, ptm, ptmi, cx, ref } = inputicon;

        const rootProps = mergeProps(
            {
                className: cx('root')
            },
            ptmi('root')
        );

        return (
            <ComponentProvider value={inputicon}>
                <span {...rootProps}>{props.children}</span>
            </ComponentProvider>
        );
    })
);

InputIcon.displayName = 'InputIcon';
