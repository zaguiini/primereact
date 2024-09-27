import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/selectbutton';
import { equals, resolveFieldData } from '@primeuix/utils';
import { defaultProps } from './SelectButton.props';

export const useSelectButton = withComponent(
    ({ id, props }) => {
        // methods
        const getOptionLabel = (option) => {
            return props.optionLabel ? resolveFieldData(option, props.optionLabel) : option;
        };
        const getOptionValue = (option) => {
            return props.optionValue ? resolveFieldData(option, props.optionValue) : option;
        };
        const getOptionRenderKey = (option) => {
            return props.dataKey ? resolveFieldData(option, props.dataKey) : getOptionLabel(option);
        };
        const isOptionDisabled = (option) => {
            return props.optionDisabled ? resolveFieldData(option, props.optionDisabled) : false;
        };
        const onOptionSelect = (event, option, index) => {
            if (props.disabled || isOptionDisabled(option)) {
                return;
            }

            let selected = isSelected(option);

            if (selected && !props.allowEmpty) {
                return;
            }

            let optionValue = getOptionValue(option);
            let newValue;

            if (props.multiple) {
                if (selected) newValue = props.value?.filter((val) => !equals(val, optionValue, equalityKey));
                else newValue = props.value ? [...props.value, optionValue] : [optionValue];
            } else {
                newValue = selected ? null : optionValue;
            }

            updateModel(event, newValue);
        };
        const isSelected = (option) => {
            const optionValue = getOptionValue(option);

            return props.multiple ? props.value?.some((val) => equals(val, optionValue, equalityKey)) : equals(props.value, optionValue, equalityKey);
        };
        const updateModel = (event, value) => {
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
        };

        // computed
        const equalityKey = props.optionValue ? null : props.dataKey;

        return {
            // methods
            getOptionLabel,
            getOptionValue,
            getOptionRenderKey,
            isOptionDisabled,
            onOptionSelect,
            isSelected,
            updateModel,
            // computed
            equalityKey
        };
    },
    defaultProps,
    style
);
