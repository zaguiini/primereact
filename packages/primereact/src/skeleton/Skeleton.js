import { ComponentProvider } from '@primereact/core/component';
import { classNames, mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useSkeleton } from './Skeleton.base';

export const Skeleton = React.memo(
    React.forwardRef((inProps, inRef) => {
        const skeleton = useSkeleton(inProps, inRef);
        const { props, ptmi, cx, sx, ref } = skeleton;

        const containerStyle = props.size ? { width: props.size, height: props.size, borderRadius: props.borderRadius } : { width: props.width, height: props.height, borderRadius: props.borderRadius };

        const rootProps = mergeProps(
            {
                ref,
                style: { ...sx('root'), ...containerStyle },
                className: classNames(cx('root'), props.className),
                'aria-hidden': true
            },
            ptmi('root')
        );

        return (
            <ComponentProvider value={skeleton}>
                <div {...rootProps} />
            </ComponentProvider>
        );
    })
);

Skeleton.displayName = 'Skeleton';
