import { ComponentProvider } from '@primereact/core/component';
import { classNames, mergeProps } from '@primeuix/utils';
import { Badge } from 'primereact/badge';
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

        // @todo: move to @primeuix/utils
        const omit = (obj, ...keys) => {
            const copy = { ...obj };
            keys.forEach((key) => delete copy[key]);
            return copy;
        };

        return (
            <ComponentProvider value={overlaybadge}>
                <div {...rootProps}>
                    {props.children}
                    <Badge {...omit(props, 'children')} pt={ptm('pcBadge')} />
                </div>
            </ComponentProvider>
        );
    })
);

OverlayBadge.displayName = 'OverlayBadge';
