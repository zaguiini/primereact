import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useKnob } from './Knob.base';

export const Knob = React.memo(
    React.forwardRef((inProps, inRef) => {
        const knob = useKnob(inProps, inRef);
        const {
            props,
            ptm,
            ptmi,
            cx,
            id,
            // element refs
            elementRef,
            // methods
            onClick,
            onMouseDown,
            onMouseUp,
            onTouchStart,
            onTouchEnd,
            onKeyDown,
            // computed
            rangePath,
            valuePath,
            valueToDisplay
        } = knob;

        const textProps = mergeProps(
            {
                x: 50,
                y: 57,
                textAnchor: 'middle',
                fill: props.textColor,
                className: cx('text'),
                name: props.name
            },
            ptm('text')
        );

        const text = props.showValue && <text {...textProps}>{valueToDisplay}</text>;

        const valueProps = mergeProps(
            {
                d: valuePath,
                strokeWidth: props.strokeWidth,
                stroke: props.valueColor,
                className: cx('value')
            },
            ptm('value')
        );

        const rangeProps = mergeProps(
            {
                d: rangePath,
                strokeWidth: props.strokeWidth,
                stroke: props.rangeColor,
                className: cx('range')
            },
            ptm('range')
        );

        const svgProps = mergeProps(
            {
                viewBox: '0 0 100 100',
                role: 'slider',
                width: props.size,
                height: props.size,
                tabIndex: props.readOnly || props.disabled ? -1 : props.tabIndex,
                'aria-valuemin': props.min,
                'aria-valuemax': props.max,
                'aria-valuenow': props.value,
                'aria-labelledby': props.ariaLabelledby,
                'aria-label': props.ariaLabel,
                onClick,
                onKeyDown,
                onMouseDown,
                onMouseUp,
                onTouchStart,
                onTouchEnd
            },
            ptm('svg')
        );

        const rootProps = mergeProps(
            {
                id,
                className: cx('root')
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={knob}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    <svg {...svgProps}>
                        <path {...rangeProps} />
                        <path {...valueProps} />
                        {text}
                    </svg>
                </Component>
            </ComponentProvider>
        );
    })
);

Knob.displayName = 'Knob';
