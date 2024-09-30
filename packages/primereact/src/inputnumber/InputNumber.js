import { Component, ComponentProvider } from '@primereact/core/component';
import { AngleDownIcon } from '@primereact/icons/angledown';
import { AngleUpIcon } from '@primereact/icons/angleup';
import { classNames, resolve } from '@primeuix/utils';
import { InputText } from 'primereact/inputtext';
import { Ripple } from 'primereact/ripple';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useInputNumber } from './InputNumber.base';

export const InputNumber = React.memo(
    React.forwardRef((inProps, inRef) => {
        const inputnumber = useInputNumber(inProps, inRef);
        const {
            props,
            ptm,
            ptmi,
            cx,
            id,
            // element refs
            elementRef,
            inputRef,
            // methods
            onUpButtonMouseDown,
            onUpButtonMouseUp,
            onUpButtonMouseLeave,
            onUpButtonKeyUp,
            onUpButtonKeyDown,
            onDownButtonMouseDown,
            onDownButtonMouseUp,
            onDownButtonMouseLeave,
            onDownButtonKeyUp,
            onDownButtonKeyDown,
            onInput,
            onInputAndroidKey,
            onInputFocus,
            onInputBlur,
            onInputKeyDown,
            onInputPointerDown,
            onInputClick,
            onInputPaste,
            formattedValue,
            // computed
            stacked,
            inputMode
        } = inputnumber;

        const createUpButton = () => {
            const incrementButtonListeners = {
                onPointerLeave: onUpButtonMouseLeave,
                onPointerDown: onUpButtonMouseDown,
                onPointerUp: onUpButtonMouseUp,
                onKeyDown: onUpButtonKeyDown,
                onKeyUp: onUpButtonKeyUp
            };

            const createButton = () => {
                const incrementIconProps = mergeProps(
                    {
                        className: cx('incrementIcon')
                    },
                    ptm('incrementIcon')
                );

                const incrementButtonProps = mergeProps(
                    {
                        type: 'button',
                        className: cx('incrementButton'),
                        disabled: props.disabled,
                        tabIndex: -1,
                        'aria-hidden': true
                    },
                    incrementButtonListeners,
                    ptm('incrementButton')
                );

                return (
                    <button {...incrementButtonProps}>
                        <Icon as={props.incrementIcon || <AngleUpIcon />} {...incrementIconProps} />
                        <Ripple />
                    </button>
                );
            };

            return resolve(props.incrementButtonTemplate, { listeners: incrementButtonListeners, instance: inputnumber }) || createButton();
        };

        const createDownButton = () => {
            const decrementButtonListeners = {
                onPointerLeave: onDownButtonMouseLeave,
                onPointerDown: onDownButtonMouseDown,
                onPointerUp: onDownButtonMouseUp,
                onKeyDown: onDownButtonKeyDown,
                onKeyUp: onDownButtonKeyUp
            };

            const createButton = () => {
                const decrementIconProps = mergeProps(
                    {
                        className: cx('decrementIcon')
                    },
                    ptm('decrementIcon')
                );

                const decrementButtonProps = mergeProps(
                    {
                        type: 'button',
                        className: cx('decrementButton'),
                        disabled: props.disabled,
                        tabIndex: -1,
                        'aria-hidden': true
                    },
                    decrementButtonListeners,
                    ptm('decrementButton')
                );

                return (
                    <button {...decrementButtonProps}>
                        <Icon as={props.decrementIcon || <AngleDownIcon />} {...decrementIconProps} />
                        <Ripple />
                    </button>
                );
            };

            return resolve(props.decrementButtonTemplate, { listeners: decrementButtonListeners, instance: inputnumber }) || createButton();
        };

        const createButtonGroup = () => {
            const upButton = props.showButtons && createUpButton();
            const downButton = props.showButtons && createDownButton();

            if (stacked) {
                const buttonGroupProps = mergeProps(
                    {
                        className: cx('buttonGroup')
                    },
                    ptm('buttonGroup')
                );

                return (
                    <span {...buttonGroupProps}>
                        {upButton}
                        {downButton}
                    </span>
                );
            }

            return (
                <>
                    {upButton}
                    {downButton}
                </>
            );
        };

        const createInput = () => {
            return (
                <InputText
                    ref={inputRef}
                    id={props.inputId}
                    defaultValue={formattedValue(props.value)}
                    style={props.inputStyle}
                    className={classNames(cx('pcInputText'), props.inputClassName)}
                    type={props.type}
                    size={props.size}
                    tabIndex={props.tabIndex}
                    inputMode={inputMode}
                    disabled={props.disabled}
                    required={props.required}
                    pattern={props.pattern}
                    placeholder={props.placeholder}
                    readOnly={props.readOnly}
                    autoFocus={props.autoFocus}
                    min={props.min}
                    max={props.max}
                    role="spinbutton"
                    aria-valuemin={props.min}
                    aria-valuemax={props.max}
                    aria-valuenow={props.value}
                    onKeyDown={onInputKeyDown}
                    onKeyPress={onInputAndroidKey}
                    onInput={onInput}
                    onClick={onInputClick}
                    onPointerDown={onInputPointerDown}
                    onBlur={onInputBlur}
                    onFocus={onInputFocus}
                    onPaste={onInputPaste}
                    pt={ptm('pcInputText')}
                    unstyled={props.unstyled}
                />
            );
        };

        const input = createInput();
        const buttonGroup = createButtonGroup();

        const rootProps = mergeProps(
            {
                id,
                className: cx('root')
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={inputnumber}>
                <Component as={props.as || 'span'} {...rootProps} ref={elementRef}>
                    {input}
                    {buttonGroup}
                </Component>
                <Tooltip pIf={isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />
            </ComponentProvider>
        );
    })
);

InputNumber.displayName = 'InputNumber';
