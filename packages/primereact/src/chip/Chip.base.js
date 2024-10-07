import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/chip';
import * as React from 'react';
import { defaultProps } from './Chip.props';

export const useChip = withComponent(
    ({ props }) => {
        // states
        const [visible, setVisible] = React.useState(true);
        const state = {
            visible
        };

        // methods
        const close = (event) => {
            setVisible(false);

            props.onRemove?.({
                originalEvent: event,
                value: props.label || props.image || props.icon
            });
        };
        const onKeyDown = (event) => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Backspace') {
                close(event);
            }
        };

        return {
            state,
            // methods
            close,
            onKeyDown
        };
    },
    defaultProps,
    style
);
