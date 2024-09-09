import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useBadge } from './Badge.base';

export const Badge = React.memo(
    React.forwardRef((inProps, inRef) => {
        const badge = useBadge(inProps, inRef);
        const { props, attrs, ptm, cx, ref } = badge;

        React.useImperativeHandle(ref, () => ({
            props,
            getElement: () => ref.current
        }));

        const rootProps = mergeProps(
            {
                ref,
                style: props.style
                //className: classNames(props.className, cx('root'))
            },
            attrs,
            ptm('root')
        );

        return <span {...rootProps}>{props.value}</span>;
    })
);

Badge.displayName = 'Badge';
