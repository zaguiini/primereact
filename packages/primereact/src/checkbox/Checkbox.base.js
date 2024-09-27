import { withComponent } from '@primereact/core/component';
import { useMountEffect } from '@primereact/hooks';
import { style } from '@primereact/styles/checkbox';
import { contains, focus } from '@primeuix/utils';
import * as React from 'react';
import { defaultProps } from './Checkbox.props';

export const useCheckbox = withComponent(
    ({ props }) => {
        // states
        const [indeterminate, setIndeterminate] = React.useState(props.indeterminate);
        const checked = indeterminate ? false : props.binary ? props.checked === props.trueValue : contains(props.value, props.checked);
        const state = {
            indeterminate,
            checked
        };

        // element refs
        const inputRef = React.useRef(null);

        // methods
        const onChange = (event) => {
            if (props.disabled || props.readOnly) {
                return;
            }

            let newValue;

            if (props.binary) {
                newValue = indeterminate ? props.trueValue : checked ? props.falseValue : props.trueValue;
            } else {
                if (checked || indeterminate) newValue = checked.filter((val) => !equals(val, props.value));
                else newValue = checked ? [...checked, props.value] : [props.value];
            }

            if (indeterminate) {
                setIndeterminate(false);
            }

            if (props.onChange) {
                const eventData = {
                    originalEvent: event,
                    value: props.value,
                    checked: newValue,
                    stopPropagation: () => {
                        event?.stopPropagation();
                    },
                    preventDefault: () => {
                        event?.preventDefault();
                    },
                    target: {
                        type: 'checkbox',
                        name: props.name,
                        id: props.id,
                        value: props.value,
                        checked: newValue
                    }
                };

                props?.onChange?.(eventData);

                // do not continue if the user defined click wants to prevent
                if (event.defaultPrevented) {
                    return;
                }

                focus(inputRef.current);
            }
        };

        const onFocus = (event) => {
            props?.onFocus?.(event);
        };

        const onBlur = (event) => {
            props?.onBlur?.(event);
        };

        useMountEffect(() => {
            if (props.autoFocus) {
                focus(inputRef.current, props.autoFocus);
            }
        });

        React.useEffect(() => {
            setIndeterminate(props.indeterminate);
        }, [props.indeterminate]);

        return {
            state,
            // element refs
            inputRef,
            // methods
            onChange,
            onFocus,
            onBlur
        };
    },
    defaultProps,
    style
);
