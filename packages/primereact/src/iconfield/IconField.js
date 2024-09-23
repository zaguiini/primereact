import { ComponentProvider } from '@primereact/core/component';
import { classNames, mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useIconField } from './IconField.base';

export const IconField = React.memo(
    React.forwardRef((inProps, inRef) => {
        const iconfield = useIconField(inProps, inRef);
        const { props, ptmi, cx, ref } = iconfield;

        const rootProps = mergeProps(
            {
                ref,
                className: classNames(cx('root'), props.className)
            },
            ptmi('root')
        );

        return (
            <ComponentProvider value={iconfield}>
                <div {...rootProps}>{props.children}</div>
            </ComponentProvider>
        );
    })
);

IconField.displayName = 'IconField';
