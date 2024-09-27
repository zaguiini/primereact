import { Component, ComponentProvider } from '@primereact/core/component';
import { useEventListener } from '@primereact/hooks';
import { classNames, getWindowScrollLeft, getWindowScrollTop, mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useSlider } from './Slider.base';

export const Slider = React.memo(
    React.forwardRef((inProps, inRef) => {
        const slider = useSlider(inProps, inRef);
        const { props, ptm, ptmi, cx, sx, ref } = slider;

        // @todo: Implement getRangeStyle
        const getRangeStyle = () => {
            if (props.range) {
                const rangeSliderWidth = rangeEndPosition > rangeStartPosition ? rangeEndPosition - rangeStartPosition : rangeStartPosition - rangeEndPosition;
                const rangeSliderPosition = rangeEndPosition > rangeStartPosition ? rangeStartPosition : rangeEndPosition;

                if (horizontal) return { left: rangeSliderPosition + '%', width: rangeSliderWidth + '%' };
                else return { bottom: rangeSliderPosition + '%', height: rangeSliderWidth + '%' };
            } else {
                if (horizontal) return { width: handlePosition + '%' };
                else return { height: handlePosition + '%' };
            }
        };

        const handleIndex = React.useRef(0);
        const sliderHandleClick = React.useRef(false);
        const dragging = React.useRef(false);
        const initX = React.useRef(0);
        const initY = React.useRef(0);
        const barWidth = React.useRef(0);
        const barHeight = React.useRef(0);
        const touchId = React.useRef();
        const value = props.range ? (props.value ?? [props.min, props.max]) : (props.value ?? props.min ?? 0);
        const horizontal = props.orientation === 'horizontal';
        const vertical = props.orientation === 'vertical';
        const handlePosition = props.value < props.min ? 0 : props.value > props.max ? 100 : ((props.value - props.min) * 100) / (props.max - props.min);
        const rangeStartPosition = props.value && props.value[0] ? ((props.value[0] < props.min ? 0 : props.value[0] - props.min) * 100) / (props.max - props.min) : 0;
        const rangeEndPosition = props.value && props.value[1] ? ((props.value[1] > props.max ? 100 : props.value[1] - props.min) * 100) / (props.max - props.min) : 100;
        const handleStyle = horizontal ? { left: `${handlePosition}%` } : { bottom: `${handlePosition}%` };
        const rangeStartHandleStyle = horizontal ? { left: `${rangeStartPosition}%` } : { bottom: `${rangeStartPosition}%` };
        const rangeEndHandleStyle = horizontal ? { left: `${rangeEndPosition}%` } : { bottom: `${rangeEndPosition}%` };
        const rangeStyle = getRangeStyle();

        const [bindDocumentMouseMoveListener, unbindDocumentMouseMoveListener] = useEventListener({ type: 'mousemove', listener: (event) => onDrag(event) });
        const [bindDocumentMouseUpListener, unbindDocumentMouseUpListener] = useEventListener({ type: 'mouseup', listener: (event) => onDragEnd(event) });
        const [bindDocumentTouchMoveListener, unbindDocumentTouchMoveListener] = useEventListener({ type: 'touchmove', listener: (event) => onDrag(event) });
        const [bindDocumentTouchEndListener, unbindDocumentTouchEndListener] = useEventListener({ type: 'touchend', listener: (event) => onDragEnd(event) });

        const spin = (event, dir) => {
            const val = props.range ? value[handleIndex.current] : value;
            const step = (props.step || 1) * dir;

            updateValue(event, val + step);
            event.preventDefault();
        };

        const onDragStart = (event, index) => {
            if (props.disabled) {
                return;
            }

            if (event.changedTouches && event.changedTouches[0]) {
                touchId.current = event.changedTouches[0].identifier;
            }

            bindDocumentTouchMoveListener();
            bindDocumentTouchEndListener();

            ref.current.setAttribute('data-p-sliding', true);
            dragging.current = true;
            updateDomData();
            sliderHandleClick.current = true;

            if (props.range && value[0] === props.max) {
                handleIndex.current = 0;
            } else {
                handleIndex.current = index;
            }

            event.currentTarget.focus();
            event.preventDefault();
        };

        const onDrag = (event) => {
            if (dragging.current) {
                setValue(event);
                event.preventDefault();
            }
        };

        const onDragEnd = (event) => {
            if (dragging.current) {
                dragging.current = false;
                ref.current.setAttribute('data-p-sliding', false);

                const newValue = setValue(event);

                props.onSlideEnd && props.onSlideEnd({ originalEvent: event, value: newValue });

                touchId.current = undefined;

                unbindDocumentMouseMoveListener();
                unbindDocumentMouseUpListener();
                unbindDocumentTouchMoveListener();
                unbindDocumentTouchEndListener();
            }
        };

        const onMouseDown = (event, index) => {
            bindDocumentMouseMoveListener();
            bindDocumentMouseUpListener();
            onDragStart(event, index);
        };

        const onKeyDown = (event, index) => {
            if (props.disabled) {
                return;
            }

            handleIndex.current = index;

            switch (event.code) {
                case 'ArrowRight':
                case 'ArrowUp':
                    spin(event, 1);
                    break;

                case 'ArrowLeft':
                case 'ArrowDown':
                    spin(event, -1);
                    break;

                case 'PageUp':
                    spin(event, 10);
                    event.preventDefault();
                    break;

                case 'PageDown':
                    spin(event, -10);
                    event.preventDefault();
                    break;

                case 'Home':
                    spin(event, -value);
                    event.preventDefault();
                    break;

                case 'End':
                    spin(event, props.max);
                    event.preventDefault();
                    break;

                default:
                    break;
            }
        };

        const onBarClick = (event) => {
            if (props.disabled) {
                return;
            }

            if (!sliderHandleClick.current && getAttribute(event.target, 'data-pc-section') !== 'handle') {
                updateDomData();
                const value = setValue(event);

                props.onSlideEnd && props.onSlideEnd({ originalEvent: event, value });
            }

            sliderHandleClick.current = false;
        };

        const updateDomData = () => {
            const rect = ref.current.getBoundingClientRect();

            initX.current = rect.left + getWindowScrollLeft();
            initY.current = rect.top + getWindowScrollTop();
            barWidth.current = ref.current.offsetWidth;
            barHeight.current = ref.current.offsetHeight;
        };

        const trackTouch = (event) => {
            const _event = Array.from(event.changedTouches ?? []).find((t) => t.identifier === touchId.current) || event;

            return {
                pageX: _event.pageX,
                pageY: _event.pageY
            };
        };

        const setValue = (event) => {
            let handleValue;

            const { pageX, pageY } = trackTouch(event);

            if (!pageX || !pageY) {
                return;
            }

            if (horizontal) {
                handleValue = ((pageX - initX.current) * 100) / barWidth.current;
            } else {
                handleValue = ((initY.current + barHeight.current - pageY) * 100) / barHeight.current;
            }

            let newValue = (props.max - props.min) * (handleValue / 100) + props.min;

            if (props.step) {
                const oldValue = props.range ? value[handleIndex.current] : value;
                const diff = newValue - oldValue;

                if (diff < 0) {
                    newValue = oldValue + Math.ceil(newValue / props.step - oldValue / props.step) * props.step;
                } else if (diff > 0) {
                    newValue = oldValue + Math.floor(newValue / props.step - oldValue / props.step) * props.step;
                }
            } else {
                newValue = Math.floor(newValue);
            }

            return updateValue(event, newValue);
        };

        const updateValue = (event, val) => {
            let parsedValue = parseFloat(val.toFixed(10));
            let newValue = parsedValue;

            if (props.range) {
                if (handleIndex.current === 0) {
                    if (parsedValue < props.min) {
                        parsedValue = props.min;
                    } else if (parsedValue > props.max) {
                        parsedValue = props.max;
                    }
                } else if (parsedValue > props.max) {
                    parsedValue = props.max;
                } else if (parsedValue < props.min) {
                    parsedValue = props.min;
                }

                newValue = [...value];
                newValue[handleIndex.current] = parsedValue;

                if (props.onChange) {
                    props.onChange({
                        originalEvent: event,
                        value: newValue
                    });
                }
            } else {
                if (parsedValue < props.min) {
                    parsedValue = props.min;
                } else if (parsedValue > props.max) {
                    parsedValue = props.max;
                }

                newValue = parsedValue;

                if (props.onChange) {
                    props.onChange({
                        originalEvent: event,
                        value: newValue
                    });
                }
            }

            return newValue;
        };

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
                id: props.id,
                style: props.style,
                className: classNames(cx('root'), props.className),
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
