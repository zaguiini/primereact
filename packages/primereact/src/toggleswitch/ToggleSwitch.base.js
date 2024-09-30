import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/toggleswitch';
import { defaultProps } from './ToggleSwitch.props';

export const useToggleSwitch = withComponent(
    ({ id, props }) => {
        // methods
        const onChange = (event) => {
            if (!props.disabled && !props.readOnly) {
                const value = checked ? props.falseValue : props.trueValue;

                props.onChange?.({
                    originalEvent: event,
                    value,
                    stopPropagation: () => {
                        event?.stopPropagation();
                    },
                    preventDefault: () => {
                        event?.preventDefault();
                    },
                    target: {
                        id,
                        value
                    }
                });
            }
        };
        const onFocus = (event) => {
            props?.onFocus?.(event);
        };
        const onBlur = (event) => {
            props?.onBlur?.(event);
        };

        // computed
        const checked = props.checked === props.trueValue;

        return {
            // methods
            onChange,
            onFocus,
            onBlur,
            // computed
            checked
        };
    },
    defaultProps,
    style
);
