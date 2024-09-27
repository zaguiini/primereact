import { Component, ComponentProvider } from '@primereact/core/component';
import { classNames, isNotEmpty, mergeProps } from '@primeuix/utils';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useRadioButton } from './RadioButton.base';

export const RadioButton = React.memo(
    React.forwardRef((inProps, inRef) => {
        const radiobutton = useRadioButton(inProps, inRef);
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
        } = radiobutton;

        const getPTOptions = (key) => {
            const _ptm = key === 'root' ? ptmi : ptm;

            return _ptm(key, {
                context: {
                    checked: state.checked,
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

            return (
                <div {...boxProps}>
                    <div {...iconProps} />
                </div>
            );
        };

        const createInputElement = () => {
            const inputProps = mergeProps(
                {
                    id: props.inputId,
                    type: 'radio',
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
                className: classNames(cx('root'), props.className),
                'data-p-checked': state.checked,
                'data-p-disabled': props.disabled
            },
            getPTOptions('root')
        );

        return (
            <ComponentProvider value={radiobutton}>
                <Component pIf={props.pIf} as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {input}
                    {box}
                </Component>
                <Tooltip pIf={props.pIf || isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />
            </ComponentProvider>
        );
    })
);

RadioButton.displayName = 'RadioButton';
