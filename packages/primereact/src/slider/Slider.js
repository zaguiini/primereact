import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useSlider } from './Slider.base';

export const Slider = React.memo(
    React.forwardRef((inProps, inRef) => {
        const slider = useSlider(inProps, inRef);
        const {
            props,
            ptm,
            ptmi,
            cx,
            id,
            // element refs
            elementRef,
            // methods
            onDragStart,
            onDrag,
            onDragEnd,
            onMouseDown,
            onKeyDown,
            onBarClick,
            // computed
            value,
            handleStyle,
            rangeStartHandleStyle,
            rangeEndHandleStyle,
            rangeStyle
        } = slider;

        const createHandle = (handleProps) => {
            const commonHandleProps = mergeProps(
                {
                    className: cx('handle'),
                    role: 'slider',
                    tabIndex: props.tabIndex,
                    'aria-valuemin': props.min,
                    'aria-valuemax': props.max,
                    'aria-orientation': props.orientation,
                    'aria-labelledby': props.ariaLabelledby,
                    'aria-label': props.ariaLabel
                },
                handleProps,
                ptm('handle')
            );

            return <span {...commonHandleProps} />;
        };

        const createRangeHandle = () => {
            const startHandleProps = {
                style: { ...sx('handle'), ...rangeStartHandleStyle },
                onKeyDown: (event) => onKeyDown(event, 0),
                onMouseDown: (event) => onMouseDown(event, 0),
                onTouchStart: (event) => onDragStart(event, 0),
                onTouchMove: (event) => onDrag(event, 0),
                onTouchEnd: (event) => onDragEnd(event, 0),
                'aria-valuenow': value ? value[0] : null
            };

            const endHandleProps = {
                style: { ...sx('handle'), ...rangeEndHandleStyle },
                onKeyDown: (event) => onKeyDown(event, 1),
                onMouseDown: (event) => onMouseDown(event, 1),
                onTouchStart: (event) => onDragStart(event, 1),
                onTouchMove: (event) => onDrag(event, 1),
                onTouchEnd: (event) => onDragEnd(event, 1),
                'aria-valuenow': value ? value[1] : null
            };

            const startHandle = createHandle(startHandleProps);
            const endHandle = createHandle(endHandleProps);

            return (
                <>
                    {startHandle}
                    {endHandle}
                </>
            );
        };

        const createSingleHandle = () => {
            const handleProps = {
                style: { ...sx('handle'), ...handleStyle },
                onKeyDown,
                onMouseDown,
                onTouchStart: onDragStart,
                onTouchMove: onDrag,
                onTouchEnd: onDragEnd,
                'aria-valuenow': value
            };

            return createHandle(handleProps);
        };

        const createContent = () => {
            const handle = props.range ? createRangeHandle() : createSingleHandle();
            const rangeProps = mergeProps(
                {
                    className: cx('range'),
                    style: { ...sx('range'), ...rangeStyle }
                },
                ptm('range')
            );

            return (
                <>
                    <span {...rangeProps} />
                    {handle}
                </>
            );
        };

        const content = createContent();

        const rootProps = mergeProps(
            {
                ref,
                id,
                className: cx('root'),
                onClick: onBarClick,
                'data-p-sliding': false
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={slider}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {content}
                </Component>
            </ComponentProvider>
        );
    })
);

Slider.displayName = 'Slider';
