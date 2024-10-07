import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps, resolve } from '@primeuix/utils';
import * as React from 'react';
import { useDivider } from './Divider.base';

export const Divider = React.forwardRef((inProps, inRef) => {
    const divider = useDivider(inProps, inRef);
    const {
        id,
        props,
        ptm,
        ptmi,
        cx,
        // element refs
        elementRef
    } = divider;

    const contentProps = mergeProps(
        {
            className: cx('content')
        },
        ptm('content')
    );

    const content = resolve(props.template || props.children, contentProps, divider);

    const rootProps = mergeProps(
        {
            id,
            style: sx('root'),
            className: cx('root'),
            role: 'separator',
            'aria-orientation': props.layout
        },
        ptmi('root')
    );

    return (
        <ComponentProvider pIf={props.pIf} value={divider}>
            <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                {content && <div {...contentProps}>{content}</div>}
            </Component>
        </ComponentProvider>
    );
});

Divider.displayName = 'Divider';
