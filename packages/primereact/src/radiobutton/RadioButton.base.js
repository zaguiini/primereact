import { withComponent } from '@primereact/core/component';
import { useMountEffect } from '@primereact/hooks';
import { style } from '@primereact/styles/radiobutton';
import { equals, focus } from '@primeuix/utils';
import * as React from 'react';
import { defaultProps } from './RadioButton.props';

export const useRadioButton = withComponent(
    ({ props, id }) => {
        // state
        const checked = props.checked != null && (props.binary ? !!props.checked : equals(props.checked, props.value));
        const state = {
            checked
        };

        // element refs
        const inputRef = React.useRef(null);

        // methods
        const onChange = (event) => {
            if (props.disabled || props.readOnly) {
                return;
            }

            const newValue = props.binary ? !checked : props.value;

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
                        type: 'radio',
                        name: props.name,
                        id,
                        value: props.value,
                        checked: newValue
                    }
                };

                props.onChange?.(eventData);

                // do not continue if the user defined click wants to prevent
                if (event.defaultPrevented) {
                    return;
                }

                focus(inputRef.current);
            }
        };
        const onFocus = (event) => {
            props.onFocus?.(event);
        };
        const onBlur = (event) => {
            props.onBlur?.(event);
        };

        // effects
        useMountEffect(() => {
            if (props.autoFocus) {
                focus(inputRef.current, props.autoFocus);
            }
        });

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
