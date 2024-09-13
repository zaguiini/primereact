import { ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useButtonGroup } from './ButtonGroup.base';

export const ButtonGroup = React.memo(
    React.forwardRef((inProps, inRef) => {
        const buttongroup = useButtonGroup(inProps, inRef);
        const { props, ptm, ptmi, cx, ref } = buttongroup;

        const rootProps = mergeProps(
            {
                ref,
                className: cx('root'),
                role: 'group'
            },
            ptmi('root')
        );

        return (
            <ComponentProvider value={buttongroup}>
                <span {...rootProps}>{props.children}</span>
            </ComponentProvider>
        );
    })
);

ButtonGroup.displayName = 'ButtonGroup';
