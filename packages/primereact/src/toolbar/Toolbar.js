import { Component, ComponentProvider } from '@primereact/core/component';
import { resolve } from '@primeuix/utils';
import * as React from 'react';
import { useToolbar } from './Toolbar.base';

export const Toolbar = React.memo(
    React.forwardRef((inProps, inRef) => {
        const toolbar = useToolbar(inProps, inRef);
        const {
            id,
            props,
            ptm,
            ptmi,
            cx,
            // element refs
            elementRef
        } = toolbar;

        const endProps = mergeProps(
            {
                className: cx('end')
            },
            ptm('end')
        );

        const centerProps = mergeProps(
            {
                className: cx('center')
            },
            ptm('center')
        );

        const startProps = mergeProps(
            {
                className: cx('start')
            },
            ptm('start')
        );

        const start = <div {...startProps}>{resolve(props.startTemplate || props.start, toolbar)}</div>;
        const center = <div {...centerProps}>{resolve(props.centerTemplate || props.center, toolbar)}</div>;
        const end = <div {...endProps}>{resolve(props.endTemplate || props.end, toolbar)}</div>;

        const rootProps = mergeProps(
            {
                id,
                className: cx('root'),
                role: 'toolbar'
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={toolbar}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {start}
                    {center}
                    {end}
                </Component>
            </ComponentProvider>
        );
    })
);

Toolbar.displayName = 'Toolbar';
