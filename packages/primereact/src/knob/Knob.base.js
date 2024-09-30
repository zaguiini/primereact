import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/knob';
import { defaultProps } from './Knob.props';

// Set fix value for SSR.
const Math_PI = 3.14159265358979;
const radius = 40;
const midX = 50;
const midY = 50;
const minRadians = (4 * Math_PI) / 3;
const maxRadians = -Math_PI / 3;

export const useKnob = withComponent(
    ({ elementRef, id, props, parent, $primereact }) => {
        // bindings
        const [bindWindowMouseMoveListener, unbindWindowMouseMoveListener] = useEventListener({
            target: 'window',
            type: 'mousemove',
            listener: (event) => {
                updateValue(event.offsetX, event.offsetY);
                event.preventDefault();
            },
            when: enabled
        });

        const [bindWindowMouseUpListener, unbindWindowMouseUpListener] = useEventListener({
            target: 'window',
            type: 'mouseup',
            listener: (event) => {
                unbindWindowMouseMoveListener();
                unbindWindowMouseUpListener();
                event.preventDefault();
            },
            when: enabled
        });

        const [bindWindowTouchMoveListener, unbindWindowTouchMoveListener] = useEventListener({
            target: 'window',
            type: 'touchmove',
            listener: (event) => {
                if (event.touches.length === 1) {
                    const rect = ref.current.getBoundingClientRect();
                    const touch = event.targetTouches.item(0);
                    const offsetX = touch.clientX - rect.left;
                    const offsetY = touch.clientY - rect.top;

                    updateValue(offsetX, offsetY);
                    event.preventDefault();
                }
            },
            when: enabled
        });

        const [bindWindowTouchEndListener, unbindWindowTouchEndListener] = useEventListener({
            target: 'window',
            type: 'touchend',
            listener: () => {
                unbindWindowTouchMoveListener();
                unbindWindowTouchEndListener();
            },
            when: enabled
        });

        // methods
        const onClick = (event) => {
            if (!props.disabled && !props.readOnly) {
                updateValue(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
            }
        };
        const onMouseDown = (event) => {
            bindWindowMouseMoveListener();
            bindWindowMouseUpListener();
            event.preventDefault();
        };
        const onMouseUp = () => {
            unbindWindowMouseMoveListener();
            unbindWindowMouseUpListener();
        };
        const onTouchStart = () => {
            bindWindowTouchMoveListener();
            bindWindowTouchEndListener();
        };
        const onTouchEnd = () => {
            unbindWindowTouchMoveListener();
            unbindWindowTouchEndListener();
        };
        const onKeyDown = (event) => {
            if (!props.disabled && !props.readonly) {
                switch (event.code) {
                    case 'ArrowRight':
                    case 'ArrowUp':
                        event.preventDefault();
                        updateModelValue(props.value + 1);
                        break;

                    case 'ArrowLeft':

                    case 'ArrowDown': {
                        event.preventDefault();
                        updateModelValue(props.value - 1);
                        break;
                    }

                    case 'Home': {
                        event.preventDefault();
                        updateModelValue(props.min);
                        break;
                    }

                    case 'End': {
                        event.preventDefault();
                        updateModelValue(props.max);
                        break;
                    }

                    case 'PageUp': {
                        event.preventDefault();
                        updateModelValue(props.value + 10);
                        break;
                    }

                    case 'PageDown': {
                        event.preventDefault();
                        updateModelValue(props.value - 10);
                        break;
                    }
                }
            }
        };
        const updateValue = (offsetX, offsetY) => {
            const dx = offsetX - props.size / 2;
            const dy = props.size / 2 - offsetY;
            const angle = Math.atan2(dy, dx);
            const start = -Math_PI / 2 - Math_PI / 6;

            updateModel(angle, start);
        };
        const updateModel = (angle, start) => {
            let mappedValue;

            if (angle > maxRadians) {
                mappedValue = mapRange(angle, minRadians, maxRadians, props.min, props.max);
            } else if (angle < start) {
                mappedValue = mapRange(angle + 2 * Math_PI, minRadians, maxRadians, props.min, props.max);
            } else {
                return;
            }

            if (props.onChange) {
                props.onChange({
                    value: Math.round((mappedValue - props.min) / props.step) * props.step + props.min
                });
            }
        };
        const updateModelValue = (newValue) => {
            let currentValue;

            if (newValue > props.max) {
                currentValue = props.max;
            } else if (newValue < props.min) {
                currentValue = props.min;
            } else {
                currentValue = newValue;
            }

            if (props.onChange) {
                props.onChange({
                    value: currentValue
                });
            }
        };
        const mapRange = (x, inMin, inMax, outMin, outMax) => ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

        // computed
        const enabled = !props.disabled && !props.readOnly;
        const zeroRadians = mapRange(props.min > 0 && props.max > 0 ? props.min : 0, props.min, props.max, minRadians, maxRadians);
        const valueRadians = mapRange(props.value, props.min, props.max, minRadians, maxRadians);
        const minX = midX + Math.cos(minRadians) * radius;
        const minY = midY - Math.sin(minRadians) * radius;
        const maxX = midX + Math.cos(maxRadians) * radius;
        const maxY = midY - Math.sin(maxRadians) * radius;
        const zeroX = midX + Math.cos(zeroRadians) * radius;
        const zeroY = midY - Math.sin(zeroRadians) * radius;
        const valueX = midX + Math.cos(valueRadians) * radius;
        const valueY = midY - Math.sin(valueRadians) * radius;
        const largeArc = Math.abs(zeroRadians - valueRadians) < Math_PI ? 0 : 1;
        const sweep = valueRadians > zeroRadians ? 0 : 1;
        const rangePath = `M ${minX} ${minY} A ${radius} ${radius} 0 1 1 ${maxX} ${maxY}`;
        const valuePath = `M ${zeroX} ${zeroY} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${valueX} ${valueY}`;
        const valueToDisplay = isString(props.valueTemplate) ? props.valueTemplate.replace(/{value}/g, props.value.toString()) : isFunction(props.valueTemplate) ? props.valueTemplate(props.value) : undefined;

        return {
            // methods
            onClick,
            onMouseDown,
            onMouseUp,
            onTouchStart,
            onTouchEnd,
            onKeyDown,
            updateValue,
            updateModel,
            updateModelValue,
            // computed
            rangePath,
            valuePath,
            valueToDisplay
        };
    },
    defaultProps,
    style
);
