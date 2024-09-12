import { ComponentProvider } from '@primereact/core/component';
import { classNames, equals, getFirstFocusableElement, isFunction, isNotEmpty, mergeProps, resolveFieldData } from '@primeuix/utils';
import { ToggleButton } from 'primereact/togglebutton';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useSelectButton } from './SelectButton.base';

export const SelectButton = React.memo(
    React.forwardRef((inProps, inRef) => {
        const selectbutton = useSelectButton(inProps, inRef);
        const { props, ptm, ptmi, cx, ref } = selectbutton;

        const equalityKey = props.optionValue ? null : props.dataKey;

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
                let currentValue = props.value ? [...props.value] : [];

                newValue = selected ? currentValue.filter((val) => !equals(val, optionValue, equalityKey)) : [...currentValue, optionValue];
            } else {
                newValue = selected ? null : optionValue;
            }

            if (props.onChange) {
                props.onChange({
                    originalEvent: event.originalEvent,
                    value: newValue,
                    stopPropagation: () => {
                        event.originalEvent.stopPropagation();
                    },
                    preventDefault: () => {
                        event.originalEvent.preventDefault();
                    },
                    target: {
                        name: props.name,
                        id: props.id,
                        value: newValue
                    }
                });
            }
        };

        const getOptionLabel = (option) => {
            return props.optionLabel ? resolveFieldData(option, props.optionLabel) : option && option.label !== undefined ? option.label : option;
        };

        const getOptionValue = (option) => {
            return props.optionValue ? resolveFieldData(option, props.optionValue) : option && option.value !== undefined ? option.value : option;
        };

        const isOptionDisabled = (option) => {
            if (props.optionDisabled) {
                return isFunction(props.optionDisabled) ? props.optionDisabled(option) : resolveFieldData(option, props.optionDisabled);
            }

            return option && option.disabled !== undefined ? option.disabled : false;
        };

        const isSelected = (option) => {
            let optionValue = getOptionValue(option);

            if (props.multiple) {
                return props.value?.some((val) => equals(val, optionValue, equalityKey));
            } else {
                return equals(props.value, optionValue, equalityKey);
            }
        };

        const createOptions = () => {
            return props.options?.map((option, index) => {
                const checked = isSelected(option);
                const label = getOptionLabel(option);
                const disabled = props.disabled || isOptionDisabled(option);
                const unstyled = props.unstyled;
                const key = label + '_' + index;
                const pt = ptm('pcToggleButton');

                // @todo: check if this is correct
                return (
                    <ToggleButton key={key} checked={checked} onChange={(e) => onOptionSelect(e, option, index)} onLabel={label} offLabel={label} disabled={disabled} unstyled={unstyled} pt={pt}>
                        {props.optionTemplate ? props.optionTemplate(option, index) || <span {...pt?.['label']}>{label}</span> : null}
                    </ToggleButton>
                );
            });
        };

        React.useImperativeHandle(ref, () => ({
            focus: () => focus(getFirstFocusableElement(ref.current))
        }));

        const hasTooltip = isNotEmpty(props.tooltip);
        const options = createOptions();

        const rootProps = mergeProps(
            {
                ref,
                id: props.id,
                style: props.style,
                className: classNames(props.className, cx('root')),
                role: 'group'
            },
            ptmi('root')
        );

        return (
            <ComponentProvider value={selectbutton}>
                <div {...rootProps}>{options}</div>
                {hasTooltip && <Tooltip target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />}
            </ComponentProvider>
        );
    })
);

SelectButton.displayName = 'SelectButton';
