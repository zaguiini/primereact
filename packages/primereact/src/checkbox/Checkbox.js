import { ComponentProvider } from '@primereact/core/component';
import { useMountEffect } from '@primereact/hooks';
import { CheckIcon } from '@primereact/icons/check';
import { MinusIcon } from '@primereact/icons/minus';
import { classNames, contains, focus, isNotEmpty, mergeProps } from '@primeuix/utils';
import { Tooltip } from 'primereact/tooltip';
import { IconUtils } from 'primereact/utils';
import * as React from 'react';
import { useCheckbox } from './Checkbox.base';

export const Checkbox = React.memo(
    React.forwardRef((inProps, inRef) => {
        const [indeterminateState, setIndeterminateState] = React.useState(inProps.indeterminate);
        const state = {
            indeterminate: indeterminateState
        };

        const checkbox = useCheckbox(inProps, inRef, state);
        const { props, ptm, ptmi, cx, ref } = checkbox;

        const checked = indeterminateState ? false : props.binary ? props.checked === props.trueValue : contains(props.value, props.checked);
        // add checked state to the checkbox instance
        checkbox.state.checked = checked;

        const elementRef = React.useRef(null);
        const inputRef = React.useRef(null);

        const getPTOptions = (key) => {
            const _ptm = key === 'root' ? ptmi : ptm;

            return _ptm(key, {
                context: {
                    checked,
                    indeterminate: indeterminateState,
                    disabled: props.disabled
                }
            });
        };

        const onChange = (event) => {
            if (props.disabled || props.readonly) {
                return;
            }

            let newValue;

            if (props.binary) {
                newValue = indeterminateState ? props.trueValue : checked ? props.falseValue : props.trueValue;
            } else {
                if (checked || indeterminateState) newValue = checked.filter((val) => !equals(val, props.value));
                else newValue = checked ? [...checked, props.value] : [props.value];
            }

            if (indeterminateState) {
                setIndeterminateState(false);
            }

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
                        type: 'checkbox',
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

        React.useEffect(() => {
            setIndeterminateState(props.indeterminate);
        }, [props.indeterminate]);

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

            const icon = checked ? props.icon || <CheckIcon {...iconProps} /> : indeterminateState ? props.icon || <MinusIcon {...iconProps} /> : null;
            const checkboxIcon = IconUtils.getJSXIcon(icon, { ...iconProps }, { props, checked, indeterminate: indeterminateState, className: cx('icon') });

            return <div {...boxProps}>{checkboxIcon}</div>;
        };

        const createInputElement = () => {
            const inputProps = mergeProps(
                {
                    ref: inputRef,
                    id: props.inputId,
                    type: 'checkbox',
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
                    'aria-checked': indeterminateState ? 'mixed' : undefined,
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
                'data-p-disabled': props.disabled,
                'data-p-indeterminate': indeterminateState || undefined
            },
            getPTOptions('root')
        );

        return (
            <ComponentProvider value={checkbox}>
                <div ref={elementRef} {...rootProps}>
                    {input}
                    {box}
                </div>
                {hasTooltip && <Tooltip target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />}
            </ComponentProvider>
        );
    })
);

Checkbox.displayName = 'Checkbox';
