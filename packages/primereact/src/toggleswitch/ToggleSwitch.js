import { Component, ComponentProvider } from '@primereact/core/component';
import { classNames, isNotEmpty, mergeProps } from '@primeuix/utils';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useToggleSwitch } from './ToggleSwitch.base';

export const ToggleSwitch = React.memo(
    React.forwardRef((inProps, inRef) => {
        const toggleswitch = useToggleSwitch(inProps, inRef);
        const { props, ptm, ptmi, cx, sx, ref } = toggleswitch;

        const inputRef = React.useRef(props.inputRef);
        const checked = props.checked === props.trueValue;

        const getPTOptions = (key) => {
            const _ptm = key === 'root' ? ptmi : ptm;

            return _ptm(key, {
                context: {
                    checked,
                    disabled: props.disabled
                }
            });
        };

        const onChange = (event) => {
            if (props.onChange) {
                const value = checked ? props.falseValue : props.trueValue;

                props.onChange({
                    originalEvent: event,
                    value,
                    stopPropagation: () => {
                        event?.stopPropagation();
                    },
                    preventDefault: () => {
                        event?.preventDefault();
                    },
                    target: {
                        name: props.name,
                        id: props.id,
                        value
                    }
                });
            }
        };

        const onFocus = (event) => {
            props?.onFocus?.(event);
        };

        const onBlur = (event) => {
            props?.onBlur?.(event);
        };

        React.useImperativeHandle(ref, () => ({
            props,
            focus: () => focus(inputRef.current),
            getElement: () => elementRef.current,
            getInput: () => inputRef.current
        }));

        const hasTooltip = isNotEmpty(props.tooltip);

        const sliderProps = mergeProps(
            {
                className: cx('slider')
            },
            getPTOptions('slider')
        );

        const inputProps = mergeProps(
            {
                ref: inputRef,
                type: 'checkbox',
                id: props.inputId,
                name: props.name,
                checked: checked,
                onChange: onChange,
                onFocus: onFocus,
                onBlur: onBlur,
                disabled: props.disabled,
                role: 'switch',
                tabIndex: props.tabIndex,
                'aria-checked': checked,
                style: props.inputStyle,
                className: classNames(cx('input'), props.inputClassName),
                'aria-labelledby': props.ariaLabelledby,
                'aria-label': props.ariaLabel,
                'aria-invalid': props.invalid || undefined
            },
            getPTOptions('input')
        );

        const rootProps = mergeProps(
            {
                ref,
                id: props.id,
                style: { ...props.style, ...sx('root') },
                className: classNames(cx('root'), props.className),
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
                {hasTooltip && <Tooltip target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />}
            </ComponentProvider>
        );
    })
);

ToggleSwitch.displayName = 'ToggleSwitch';
