import { Component, ComponentProvider } from '@primereact/core/component';
import { isEmpty, isNotEmpty, mergeProps } from '@primeuix/utils';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useMultiSelect } from './MultiSelect.base';

export const MultiSelect = React.memo(
    React.forwardRef((inProps, inRef) => {
        const multiselect = useMultiSelect(inProps, inRef);
        const {
            props,
            state,
            ptm,
            ptmi,
            cx,
            sx,
            id,
            // element refs
            elementRef,
            focusInputRef,
            // methods
            onFocus,
            onBlur,
            onKeyDown,
            onContainerClick,
            getLabelByValue,
            removeOption,
            // computed
            label: labelText,
            chipSelectedItems,
            focusedOptionId
        } = multiselect;

        const createDropdown = () => {
            const dropdownIconProps = mergeProps(
                {
                    className: cx('dropdownIcon'),
                    'aria-hidden': true
                },
                ptm('dropdownIcon')
            );

            const loadingIconProps = mergeProps(
                {
                    className: classNames(cx('loadingIcon'), props.loadingIcon && 'p-spin'),
                    'aria-hidden': true
                },
                ptm('loadingIcon')
            );

            const dropdownProps = mergeProps(
                {
                    className: cx('dropdown')
                },
                ptm('dropdown')
            );

            return (
                <div {...dropdownProps}>
                    <Icon pIf={props.loading} as={props.loadingIcon || <SpinnerIcon spin />} {...loadingIconProps} />
                    <Icon pIf={!props.loading} as={props.dropdownIcon || <ChevronDownIcon />} {...dropdownIconProps} />
                </div>
            );
        };

        const createChip = (option, index, label) => {
            const chipIcon = resolve(props.chipIcon, { option, index, className: cx('chipIcon'), removeCallback: (event) => removeOption(event, index), instance: autocomplete });

            return (
                resolve(props.chipTemplate, { option, index, removeCallback: (event) => removeOption(event, option), instance: autocomplete }) || (
                    <Chip className={cx('pcChip')} label={label} removeIcon={chipIcon} removable unstyled={props.unstyled} onRemove={(event) => removeOption(event, option)} pt={ptm('pcChip')} />
                )
            );
        };

        const createLabelValue = () => {
            if (props.display === 'comma') {
                return labelText ?? 'empty';
            } else if (props.display === 'chip') {
                let content = null;

                if (chipSelectedItems) {
                    content = <span>{labelText}</span>;
                } else {
                    content = props.value.map((option, i) => {
                        const label = getLabelByValue(option);

                        const chip = createChip(option, i, label);

                        const chipItemProps = mergeProps(
                            {
                                id: `${id}_chip_option_${i}`,
                                className: cx('chipItem', { i }),
                                role: 'option',
                                'aria-label': label,
                                'aria-selected': true,
                                'aria-setsize': props.value.length,
                                'aria-posinset': i + 1
                            },
                            ptm('chipItem')
                        );

                        return (
                            <span {...chipItemProps} key={`${i}_${label}`}>
                                {chip}
                            </span>
                        );
                    });
                }
                return (
                    <>
                        {content}
                        {isEmpty(props.value) ? <>{placeholder || 'empty'}</> : null}
                    </>
                );
            }

            return null;
        };

        const createLabel = () => {
            const labelValue = resolve(valueTemplate, { value: props.value, instance: multiselect }) || createLabelValue();

            const labelProps = mergeProps(
                {
                    className: cx('label')
                },
                ptm('label')
            );
            const labelContainerProps = mergeProps(
                {
                    className: cx('labelContainer')
                },
                ptm('labelContainer')
            );
            return (
                <div {...labelContainerProps}>
                    <div {...labelProps}>{labelValue}</div>
                </div>
            );
        };

        const createHiddenInput = () => {
            const hiddenInputProps = mergeProps(
                {
                    id: props.inputId,
                    type: 'text',
                    readOnly: true,
                    disabled: props.disabled,
                    placeholder: props.placeholder,
                    tabIndex: !props.disabled ? props.tabIndex : -1,
                    role: 'combobox',
                    'aria-label': props.ariaLabel,
                    'aria-labelledby': props.ariaLabelledby,
                    'aria-haspopup': 'listbox',
                    'aria-expanded': state.overlayVisible,
                    'aria-controls': `${id}_list`,
                    'aria-activedescendant': state.focused ? focusedOptionId : undefined,
                    'aria-invalid': props.invalid || undefined,
                    onFocus,
                    onBlur,
                    onKeyDown
                },
                ptm('hiddenInput')
            );
            const hiddenInputContainerProps = mergeProps(
                {
                    className: 'p-hidden-accessible',
                    'data-p-hidden-accessible': true
                },
                ptm('hiddenInputContainer')
            );
            return (
                <div {...hiddenInputContainerProps}>
                    <input {...hiddenInputProps} ref={focusInputRef} />
                </div>
            );
        };

        const hiddenInput = createHiddenInput();
        const label = createLabel();
        const dropdown = createDropdown();

        const rootProps = mergeProps(
            {
                id,
                style: sx('root'),
                className: cx('root'),
                onClick: onContainerClick
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={multiselect}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {hiddenInput}
                    {label}
                    {dropdown}
                    <MultiSelectOverlay multiselect={multiselect} />
                </Component>
                <Tooltip pIf={isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />
            </ComponentProvider>
        );
    })
);

MultiSelect.displayName = 'MultiSelect';
