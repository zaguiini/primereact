import { Component, ComponentProvider } from '@primereact/core/component';
import { Icon } from '@primereact/icons/base';
import { CheckIcon } from '@primereact/icons/check';
import { MinusIcon } from '@primereact/icons/minus';
import { classNames, isNotEmpty, mergeProps } from '@primeuix/utils';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useCheckbox } from './Checkbox.base';

export const Checkbox = React.memo(
    React.forwardRef((inProps, inRef) => {
        const checkbox = useCheckbox(inProps, inRef);
        const {
            props,
            state,
            ptm,
            ptmi,
            cx,
            id,
            // element refs
            elementRef,
            inputRef,
            // methods
            onChange,
            onFocus,
            onBlur
        } = checkbox;

        const getPTOptions = (key) => {
            const _ptm = key === 'root' ? ptmi : ptm;

            return _ptm(key, {
                context: {
                    checked: state.checked,
                    indeterminate: state.indeterminate,
                    disabled: props.disabled
                }
            });
        };

        const createBoxElement = () => {
            const iconProps = mergeProps(
                {
                    className: cx('icon')
                },
                getPTOptions('icon')
            );

            const boxProps = mergeProps(
                {
                    className: cx('box')
                },
                getPTOptions('box')
            );

            const icon = state.checked ? props.icon || <CheckIcon /> : state.indeterminate ? props.icon || <MinusIcon /> : null;

            return (
                <div {...boxProps}>
                    <Icon as={icon} {...iconProps} />
                </div>
            );
        };

        const createInputElement = () => {
            const inputProps = mergeProps(
                {
                    id: props.inputId,
                    type: 'checkbox',
                    style: props.inputStyle,
                    className: classNames(cx('input'), props.inputClassName),
                    name: props.name,
                    defaultChecked: state.checked,
                    tabIndex: props.tabIndex,
                    disabled: props.disabled,
                    readOnly: props.readOnly,
                    required: props.required,
                    'aria-labelledby': props.ariaLabelledby,
                    'aria-label': props.ariaLabel,
                    'aria-invalid': props.invalid || undefined,
                    'aria-checked': state.indeterminate ? 'mixed' : undefined,
                    onFocus,
                    onBlur,
                    onChange
                },
                getPTOptions('input')
            );

            return <input {...inputProps} ref={inputRef} />;
        };

        const input = createInputElement();
        const box = createBoxElement();

        const rootProps = mergeProps(
            {
                id,
                className: cx('root'),
                'data-p-checked': state.checked,
                'data-p-disabled': props.disabled,
                'data-p-indeterminate': state.indeterminate || undefined
            },
            getPTOptions('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={checkbox}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {input}
                    {box}
                </Component>
                <Tooltip pIf={isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />
            </ComponentProvider>
        );
    })
);

Checkbox.displayName = 'Checkbox';
