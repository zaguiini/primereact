import { Component, ComponentProvider } from '@primereact/core/component';
import { classNames, isNotEmpty, mergeProps } from '@primeuix/utils';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useToggleSwitch } from './ToggleSwitch.base';

export const ToggleSwitch = React.memo(
    React.forwardRef((inProps, inRef) => {
        const toggleswitch = useToggleSwitch(inProps, inRef);
        const {
            id,
            props,
            ptm,
            ptmi,
            cx,
            sx,
            // element refs
            elementRef,
            // methods,
            onChange,
            onFocus,
            onBlur,
            // computed
            checked
        } = toggleswitch;

        const getPTOptions = (key) => {
            const _ptm = key === 'root' ? ptmi : ptm;

            return _ptm(key, {
                context: {
                    checked,
                    disabled: props.disabled
                }
            });
        };

        const sliderProps = mergeProps(
            {
                className: cx('slider')
            },
            getPTOptions('slider')
        );

        const inputProps = mergeProps(
            {
                id: props.inputId,
                type: 'checkbox',
                style: props.inputStyle,
                className: classNames(cx('input'), props.inputClassName),
                checked: checked,
                tabIndex: props.tabIndex,
                disabled: props.disabled,
                readOnly: props.readOnly,
                role: 'switch',
                'aria-checked': checked,
                'aria-labelledby': props.ariaLabelledby,
                'aria-label': props.ariaLabel,
                'aria-invalid': props.invalid || undefined,
                onChange: onChange,
                onFocus: onFocus,
                onBlur: onBlur
            },
            getPTOptions('input')
        );

        const rootProps = mergeProps(
            {
                id,
                style: sx('root'),
                className: cx('root'),
                'data-p-checked': checked,
                'data-p-disabled': props.disabled
            },
            getPTOptions('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={toggleswitch}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    <input {...inputProps} />
                    <span {...sliderProps} />
                </Component>
                <Tooltip pIf={isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />
            </ComponentProvider>
        );
    })
);

ToggleSwitch.displayName = 'ToggleSwitch';
