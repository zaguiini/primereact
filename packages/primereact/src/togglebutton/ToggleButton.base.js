import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/togglebutton';
import { isNotEmpty } from '@primeuix/utils';
import * as React from 'react';
import { defaultProps } from './ToggleButton.props';

export const useToggleButton = withComponent(
    ({ id, props }) => {
        // methods
        const onClick = (event) => {
            if (!props.disabled && !props.readOnly) {
                const value = !props.checked;

                props.onChange?.({
                    originalEvent: event,
                    value,
                    stopPropagation: () => {
                        event.stopPropagation();
                    },
                    preventDefault: () => {
                        event.preventDefault();
                    },
                    target: {
                        id,
                        value
                    }
                });
            }
        };

        // computed
        const active = props.checked === true;
        const hasLabel = isNotEmpty(props.onLabel) && isNotEmpty(props.offLabel);
        const label = hasLabel ? props.checked ? props.onLabel : props.offLabel : <>&nbsp;</>;

        return {
            // methods
            onClick,
            // computed
            active,
            hasLabel,
            label
        };
    },
    defaultProps,
    style
);
