import { Component, ComponentProvider } from '@primereact/core/component';
import { classNames } from '@primeuix/utils';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useAutoComplete } from './AutoComplete.base';
import { AutoCompleteOverlay } from './AutoCompleteOverlay';

export const AutoComplete = React.memo(
    React.forwardRef((inProps, inRef) => {
        const autocomplete = useAutoComplete(inProps, inRef);
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
            multiContainerRef,
            dropdownButtonRef,
            // methods
            getOptionLabel,
            onFocus,
            onBlur,
            onKeyDown,
            onInput,
            onChange,
            onMultipleContainerFocus,
            onMultipleContainerBlur,
            onMultipleContainerKeyDown,
            onContainerClick,
            onDropdownClick,
            removeOption,
            // computed
            inputValue,
            searchResultMessageText,
            focusedOptionId,
            focusedMultipleOptionId,
            hasFluid
        } = autocomplete;

        const createHiddenSearchResult = () => {
            const hiddenProps = mergeProps(
                {
                    role: 'status',
                    'aria-live': 'polite',
                    className: 'p-hidden-accessible',
                    'data-p-hidden-accessible': true
                },
                ptm('hiddenSearchResult')
            );
            return <span {...hiddenProps}>{searchResultMessageText}</span>;
        };

        const createDropdown = () => {
            const createDropdownButton = () => {
                if (props.dropdown) {
                    const buttonProps = mergeProps(
                        {
                            type: 'button',
                            style: props.dropdownStyle,
                            className: classNames(cx('dropdown'), props.dropdownClassName),
                            disabled: props.disabled,
                            'aria-haspopup': 'listbox',
                            'aria-expanded': state.overlayVisible,
                            'aria-controls': `${id}_panel`,
                            onClick: onDropdownClick
                        },
                        ptm('dropdown')
                    );

                    const dropdownIconProps = mergeProps(
                        {
                            className: cx('dropdownIcon')
                        },
                        ptm('dropdownIcon')
                    );

                    return (
                        <button {...buttonProps} ref={dropdownButtonRef}>
                            <Icon as={props.dropdownIcon || <ChevronDownIcon />} {...dropdownIconProps} />
                        </button>
                    );
                }

                return null;
            };

            return resolve(props.dropdownTemplate, { toggleCallback: onDropdownClick, instance: autocomplete }) || createDropdownButton();
        };

        const createLoader = () => {
            if (state.searching || props.loading) {
                const loaderProps = mergeProps(
                    {
                        className: classNames(cx('loader'), props.loadingIcon && 'p-spin')
                    },
                    ptm('loader')
                );

                return resolve(props.loader, { ...loaderProps, instance: autocomplete }) || <Icon as={props.loadingIcon || <SpinnerIcon />} {...loaderProps} />;
            }

            return null;
        };

        const createChip = (option, index, label) => {
            const chipIcon = resolve(props.chipIcon, { option, index, className: cx('chipIcon'), removeCallback: (event) => removeOption(event, index), instance: autocomplete });

            return (
                resolve(props.chipTemplate, { option, index, removeCallback: (event) => removeOption(event, index), instance: autocomplete }) || (
                    <Chip className={cx('pcChip')} label={label} removeIcon={chipIcon} removable unstyled={props.unstyled} onRemove={(event) => removeOption(event, index)} pt={ptm('pcChip')} />
                )
            );
        };

        const createMultipleItems = () => {
            return props.value.map((option, i) => {
                const label = getOptionLabel(option);

                const chip = createChip(option, i, label);

                const chipItemProps = mergeProps(
                    {
                        id: `${id}_multiple_option_${i}`,
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
                    <li {...chipItemProps} key={`${i}_${label}`}>
                        {chip}
                    </li>
                );
            });
        };

        const createInput = () => {
            const commonInputProps = {
                id: props.inputId,
                type: 'text',
                style: props.inputStyle,
                placeholder: props.placeholder,
                tabIndex: !props.disabled ? props.tabindex : -1,
                disabled: props.disabled,
                autoComplete: 'off',
                role: 'combobox',
                'aria-label': props.ariaLabel,
                'aria-labelledby': props.ariaLabelledby,
                'aria-haspopup': 'listbox',
                'aria-autocomplete': 'list',
                'aria-expanded': state.overlayVisible,
                'aria-controls': `${id}_list`,
                'aria-activedescendant': state.focused ? focusedOptionId : undefined,
                'aria-invalid': props.invalid || undefined,
                onFocus: onFocus,
                onBlur: onBlur,
                onKeyDown: onKeyDown,
                onInput: onInput,
                onChange: onChange
            };

            if (props.multiple) {
                const items = createMultipleItems();

                const inputProps = mergeProps(
                    {
                        className: props.inputClassName
                    },
                    ptm('input')
                );

                const inputChipProps = mergeProps(
                    {
                        className: cx('inputChip'),
                        role: 'option'
                    },
                    ptm('inputChip')
                );

                const inputMultipleProps = mergeProps(
                    {
                        className: cx('inputMultiple'),
                        tabIndex: -1,
                        role: 'listbox',
                        'aria-orientation': 'horizontal',
                        'aria-activedescendant': state.focused ? focusedMultipleOptionId : undefined,
                        onFocus: onMultipleContainerFocus,
                        onBlur: onMultipleContainerBlur,
                        onKeyDown: onMultipleContainerKeyDown
                    },
                    ptm('inputMultiple')
                );

                return (
                    <ul {...inputMultipleProps} ref={multiContainerRef}>
                        {items}
                        <li {...inputChipProps}>
                            <input {...inputProps} ref="focusInput" />
                        </li>
                    </ul>
                );
            }

            return (
                <InputText
                    ref={focusInputRef}
                    className={classNames(cx('pcInputText'), props.inputClassName)}
                    value={inputValue}
                    fluid={hasFluid}
                    variant={props.variant}
                    invalid={props.invalid}
                    unstyled={props.unstyled}
                    pt={ptm('pcInputText')}
                    {...commonInputProps}
                />
            );
        };

        const input = createInput();
        const loader = createLoader();
        const dropdown = createDropdown();
        const hiddenSearchResult = createHiddenSearchResult();

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
            <ComponentProvider pIf={props.pIf} value={autocomplete}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {input}
                    {loader}
                    {dropdown}
                    {hiddenSearchResult}
                    <AutoCompleteOverlay autocomplete={autocomplete} />
                </Component>
                <Tooltip pIf={isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />
            </ComponentProvider>
        );
    })
);

AutoComplete.displayName = 'AutoComplete';
