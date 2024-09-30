import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/slider';
import { defaultProps } from './Slider.props';

export const useSlider = withComponent(
    ({ elementRef, props }) => {
        // refs
        const handleIndex = React.useRef(0);
        const sliderHandleClick = React.useRef(false);
        const dragging = React.useRef(false);
        const initX = React.useRef(0);
        const initY = React.useRef(0);
        const barWidth = React.useRef(0);
        const barHeight = React.useRef(0);
        const touchId = React.useRef(undefined);

        // bindings
        const [bindDocumentMouseMoveListener, unbindDocumentMouseMoveListener] = useEventListener({ type: 'mousemove', listener: (event) => onDrag(event) });
        const [bindDocumentMouseUpListener, unbindDocumentMouseUpListener] = useEventListener({ type: 'mouseup', listener: (event) => onDragEnd(event) });
        const [bindDocumentTouchMoveListener, unbindDocumentTouchMoveListener] = useEventListener({ type: 'touchmove', listener: (event) => onDrag(event) });
        const [bindDocumentTouchEndListener, unbindDocumentTouchEndListener] = useEventListener({ type: 'touchend', listener: (event) => onDragEnd(event) });

        // methods
        const onDragStart = (event, index) => {
            if (props.disabled) {
                return;
            }

            if (event.changedTouches && event.changedTouches[0]) {
                touchId.current = event.changedTouches[0].identifier;
            }

            bindDocumentTouchMoveListener();
            bindDocumentTouchEndListener();

            elementRef.current.setAttribute('data-p-sliding', true);
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
                elementRef.current.setAttribute('data-p-sliding', false);

                props.onSlideEnd?.({ originalEvent: event, value: props.value });

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
                setValue(event);
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
        const spin = (event, dir) => {
            const val = props.range ? value[handleIndex.current] : value;
            const step = (props.step || 1) * dir;

            updateModel(event, val + step);
            event.preventDefault();
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

                if (diff < 0) newValue = oldValue + Math.ceil(newValue / props.step - oldValue / props.step) * props.step;
                else if (diff > 0) newValue = oldValue + Math.floor(newValue / props.step - oldValue / props.step) * props.step;
            } else {
                newValue = Math.floor(newValue);
            }

            updateModel(event, newValue);
        };
        const updateModel = (event, value) => {
            let newValue = parseFloat(value.toFixed(10));
            let modelValue;

            if (this.range) {
                modelValue = props.value ? [...props.value] : [];

                if (this.handleIndex == 0) {
                    if (newValue < props.min) newValue = props.min;
                    else if (newValue >= props.max) newValue = props.max;

                    modelValue[0] = newValue;
                } else {
                    if (newValue > props.max) newValue = props.max;
                    else if (newValue <= props.min) newValue = props.min;

                    modelValue[1] = newValue;
                }
            } else {
                if (newValue < props.min) newValue = props.min;
                else if (newValue > props.max) newValue = props.max;

                modelValue = newValue;
            }

            props.onChange?.({
                originalEvent: event,
                value: newValue
            });
        };
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

        // computed
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

        return {
            // methods
            onDragStart,
            onDrag,
            onDragEnd,
            onMouseDown,
            onKeyDown,
            onBarClick,
            updateDomData,
            spin,
            setValue,
            updateModel,
            // computed
            value,
            horizontal,
            vertical,
            handlePosition,
            rangeStartPosition,
            rangeEndPosition,
            handleStyle,
            rangeStartHandleStyle,
            rangeEndHandleStyle,
            rangeStyle
        };
    },
    defaultProps,
    style
);
