import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps, resolve } from '@primeuix/utils';
import { Portal } from 'primereact/portal';
import * as React from 'react';
import { useTooltip } from './Tooltip.base';

export const Tooltip = React.memo(
    React.forwardRef((inProps, inRef) => {
        const tooltip = useTooltip(inProps, inRef);
        const {
            id,
            props,
            state,
            ptm,
            ptmi,
            cx,
            sx,
            // element refs
            elementRef,
            textRef,
            currentTargetRef,
            // methods
            isTargetContentEmpty,
            onMouseEnter,
            onMouseLeave
        } = tooltip;

        const content = isTargetContentEmpty(currentTargetRef.current) ? resolve(props.content || props.template || props.children, tooltip) : null;

        const textProps = mergeProps(
            {
                className: cx('text')
            },
            ptm('text')
        );

        const arrowProps = mergeProps(
            {
                className: cx('arrow'),
                style: sx('arrow')
            },
            ptm('arrow')
        );

        const rootProps = mergeProps(
            {
                id,
                style: sx('root'),
                className: cx('root'),
                role: 'tooltip',
                'aria-hidden': state.visible,
                onMouseEnter,
                onMouseLeave
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={tooltip}>
                <Portal pIf={state.visible} appendTo={props.appendTo} visible>
                    <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                        <div {...arrowProps} />
                        <div {...textProps} ref={textRef}>
                            {content}
                        </div>
                    </Component>
                </Portal>
            </ComponentProvider>
        );
    })
);

Tooltip.displayName = 'Tooltip';
