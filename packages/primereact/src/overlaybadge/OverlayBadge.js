import { Component, ComponentProvider } from '@primereact/core/component';
import { classNames, mergeProps } from '@primeuix/utils';
import { Badge } from 'primereact/badge';
import { omit } from 'primereact/utils';
import * as React from 'react';
import { useOverlayBadge } from './OverlayBadge.base';

export const OverlayBadge = React.memo(
    React.forwardRef((inProps, inRef) => {
        const overlaybadge = useOverlayBadge(inProps, inRef);
        const { props, ptm, ptmi, cx, ref } = overlaybadge;

        const rootProps = mergeProps(
            {
                ref,
                style: props.style,
                className: classNames(props.className, cx('root'))
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={overlaybadge}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {props.children}
                    <Badge {...omit(props, 'children')} pt={ptm('pcBadge')} />
                </Component>
            </ComponentProvider>
        );
    })
);

OverlayBadge.displayName = 'OverlayBadge';
