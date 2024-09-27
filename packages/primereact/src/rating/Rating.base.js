import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/rating';
import { focus, getFirstFocusableElement, uuid } from '@primeuix/utils';
import { toValue } from 'primereact/utils';
import * as React from 'react';
import { defaultProps } from './Rating.props';

export const useRating = withComponent(
    ({ id, props }) => {
        // state
        const [focusedOptionIndex, setFocusedOptionIndex] = React.useState(-1);
        const [isFocusVisibleItem, setIsFocusVisibleItem] = React.useState(true);
        const state = {
            focusedOptionIndex,
            isFocusVisibleItem
        };

        // refs
        const starName = React.useRef(props.name ?? uuid());

        // methods
        const onOptionClick = (event, value) => {
            if (!props.readOnly && !props.disabled) {
                updateModel(event, value);
                setIsFocusVisibleItem(false);
                const firstFocusableEl = getFirstFocusableElement(event.currentTarget);

                focus(firstFocusableEl);
            }
        };
        const onChange = (event, value) => {
            updateModel(event, value);
            setIsFocusVisibleItem(true);
        };
        const onFocus = (event, value) => {
            setFocusedOptionIndex(value);
            props.onFocus?.(event);
        };
        const onBlur = (event) => {
            setFocusedOptionIndex(-1);
            props.onBlur?.(event);
        };
        const updateModel = (event, value) => {
            const newValue = props.value === value ? null : value || null;

            props.onChange?.({
                originalEvent: event,
                value: newValue,
                stopPropagation: () => {
                    event?.stopPropagation();
                },
                preventDefault: () => {
                    event?.preventDefault();
                },
                target: {
                    name: starName.current,
                    id,
                    value: newValue
                }
            });
        };

        return {
            // state
            state,
            // values
            starName: toValue(starName),
            // methods
            updateModel,
            onOptionClick,
            onChange,
            onFocus,
            onBlur
        };
    },
    defaultProps,
    style
);
