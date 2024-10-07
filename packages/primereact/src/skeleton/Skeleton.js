import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useSkeleton } from './Skeleton.base';

export const Skeleton = React.memo(
    React.forwardRef((inProps, inRef) => {
        const skeleton = useSkeleton(inProps, inRef);
        const {
            id,
            props,
            ptmi,
            cx,
            // element refs
            elementRef,
            // computed
            containerStyle
        } = skeleton;

        const rootProps = mergeProps(
            {
                id,
                style: { ...sx('root'), ...containerStyle },
                className: cx('root'),
                'aria-hidden': true
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={skeleton}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef} />
            </ComponentProvider>
        );
    })
);

Skeleton.displayName = 'Skeleton';
