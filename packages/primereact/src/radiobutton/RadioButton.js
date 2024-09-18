import { ComponentProvider } from '@primereact/core/component';
import { useMountEffect } from '@primereact/hooks';
import { classNames, focus, isNotEmpty, mergeProps } from '@primeuix/utils';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useRadioButton } from './RadioButton.base';

export const RadioButton = React.memo(
    React.forwardRef((inProps, inRef) => {
        const radiobutton = useRadioButton(inProps, inRef);
        const { props, ptm, ptmi, cx, ref } = radiobutton;

        const checked = props.checked != null && (props.binary ? !!props.checked : equals(props.checked, props.value));
        // add checked state to the radiobutton instance
        radiobutton.state.checked = checked;

        const elementRef = React.useRef(null);
        const inputRef = React.useRef(props.inputRef);

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
            if (props.disabled || props.readonly) {
                return;
            }

            const newValue = props.binary ? !checked : props.value;

            if (props.onChange) {
                const eventData = {
                    originalEvent: event,
                    value: props.value,
                    checked: newValue,
                    stopPropagation: () => {
                        event?.stopPropagation();
                    },
                    preventDefault: () => {
                        event?.preventDefault();
                    },
                    target: {
                        type: 'radio',
                        name: props.name,
                        id: props.id,
                        value: props.value,
                        checked: newValue
                    }
                };

                props?.onChange?.(eventData);

                // do not continue if the user defined click wants to prevent
                if (event.defaultPrevented) {
                    return;
                }

                focus(inputRef.current);
            }
        };

        const onFocus = (event) => {
            props?.onFocus?.(event);
        };

        const onBlur = (event) => {
            props?.onBlur?.(event);
        };

        useMountEffect(() => {
            if (props.autoFocus) {
                focus(inputRef.current, props.autoFocus);
            }
        });

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
                    ref: inputRef,
                    id: props.inputId,
                    type: 'radio',
                    style: props.inputStyle,
                    className: classNames(cx('input'), props.inputClassName),
                    name: props.name,
                    defaultChecked: checked,
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

            return <input {...inputProps} />;
        };

        const hasTooltip = isNotEmpty(props.tooltip);

        const input = createInputElement();
        const box = createBoxElement();

        const rootProps = mergeProps(
            {
                id: props.id,
                style: props.style,
                className: classNames(cx('root'), props.className),
                'data-p-checked': checked,
                'data-p-disabled': props.disabled
            },
            getPTOptions('root')
        );

        return (
            <ComponentProvider value={radiobutton}>
                <div ref={elementRef} {...rootProps}>
                    {input}
                    {box}
                </div>
                {hasTooltip && <Tooltip target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />}
            </ComponentProvider>
        );
    })
);

RadioButton.displayName = 'RadioButton';
