import { ComponentProvider } from '@primereact/core/component';
import { classNames, mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useDivider } from './Divider.base';

export const Divider = React.forwardRef((inProps, inRef) => {
    const divider = useDivider(inProps, inRef);
    const { props, ptm, ptmi, cx, ref, sx } = divider;

    const elementRef = React.useRef(null);
    const horizontal = props.layout === 'horizontal';
    const vertical = props.layout === 'vertical';

    React.useImperativeHandle(ref, () => ({
        props,
        getElement: () => elementRef.current
    }));

    const rootProps = mergeProps(
        {
            ref: elementRef,
            style: sx('root'),
            className: classNames(cx('root', { horizontal, vertical }), props.className),
            'aria-orientation': props.layout,
            role: 'separator'
        },
        ptmi('root')
    );

    const contentProps = mergeProps(
        {
            className: cx('content')
        },
        ptm('content')
    );

    return (
        <ComponentProvider value={divider}>
            <div {...rootProps}>
                <div {...contentProps}>{props.children}</div>
            </div>
        </ComponentProvider>
    );
});

Divider.displayName = 'Divider';
