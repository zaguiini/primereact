import { Component, ComponentProvider } from '@primereact/core/component';
import { Icon } from '@primereact/icons/base';
import { ChevronDownIcon } from '@primereact/icons/chevrondown';
import { SpinnerIcon } from '@primereact/icons/spinner';
import { TimesIcon } from '@primereact/icons/times';
import { classNames, isNotEmpty, mergeProps, resolve } from '@primeuix/utils';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useSelect } from './Select.base';
import { SelectOverlay } from './SelectOverlay';

export const Select = React.memo(
    React.forwardRef((inProps, inRef) => {
        const select = useSelect(inProps, inRef);
        const {
            props,
            state,
            ptm,
            ptmi,
            cx,
            id,
            // element refs
            elementRef,
            focusInputRef,
            clearIconRef,
            // methods
            onFocus,
            onBlur,
            onKeyDown,
            onEditableInput,
            onContainerClick,
            onClearClick,
            // computed
            selectedOption,
            label: labelText,
            editableInputValue,
            focusedOptionId,
            isClearIconVisible
        } = select;

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

        const createClearIcon = () => {
            const clearIconProps = mergeProps({ ref: clearIconRef, className: cx('clearIcon'), onClick: onClearClick, 'data-pc-section': 'clearicon' }, ptm('clearIcon'));

            return <Icon pIf={isClearIconVisible} as={props.clearIcon || <TimesIcon />} {...clearIconProps} />;
        };

        const createLabel = () => {
            const commonLabelProps = mergeProps(
                {
                    ref: focusInputRef,
                    id: props.labelId,
                    className: classNames(cx('label'), props.labelClassName),
                    style: props.labelStyle,
                    tabIndex: !props.disabled ? props.tabIndex : -1,
                    role: 'combobox',
                    'aria-label': props.ariaLabel || (labelText === 'p-emptylabel' ? undefined : labelText),
                    'aria-labelledby': props.ariaLabelledby,
                    'aria-haspopup': 'listbox',
                    'aria-expanded': state.overlayVisible,
                    'aria-controls': id + '_list',
                    'aria-activedescendant': props.focused ? focusedOptionId : undefined,
                    'aria-disabled': props.disabled,
                    onFocus,
                    onBlur,
                    onKeyDown
                },
                ptm('label')
            );

            if (props.editable) {
                const inputProps = mergeProps(
                    {
                        defaultValue: editableInputValue,
                        placeholder: props.placeholder,
                        disabled: props.disabled,
                        autoComplete: 'off',
                        'aria-invalid': props.invalid || undefined,
                        onInput: onEditableInput
                    },
                    commonLabelProps
                );

                return <input type="text" {...inputProps} />;
            }

            const content = resolve(props.valueTemplate, selectedOption, select) || (labelText === 'p-emptylabel' ? <>&nbsp;</> : (labelText ?? 'empty'));

            return <span {...commonLabelProps}>{content}</span>;
        };

        const label = createLabel();
        const clearIcon = createClearIcon();
        const dropdown = createDropdown();

        const rootProps = mergeProps(
            {
                id,
                className: cx('root'),
                onClick: onContainerClick
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={select}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {label}
                    {clearIcon}
                    {dropdown}
                    <SelectOverlay select={select} />
                </Component>
                <Tooltip pIf={isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipProps} />
            </ComponentProvider>
        );
    })
);

Select.displayName = 'Select';
