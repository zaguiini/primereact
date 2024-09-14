import { ComponentProvider } from '@primereact/core/component';
import { useMountEffect, useUpdateEffect } from '@primereact/hooks';
import { CheckIcon } from '@primereact/icons/check';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { DomHandler, IconUtils, ObjectUtils, classNames } from '../utils/Utils';
import { useCheckbox } from './Checkbox.base';
import { CheckboxBase } from './CheckboxBase';

export const Checkbox = React.memo(
    React.forwardRef((inProps, inRef) => {
        const [focusedState, setFocusedState] = React.useState(false);
        const state = {
            focused: focusedState
        };

        const checkbox = useCheckbox(inProps, inRef, state);
        const { props, ptm, ptmi, cx, ref } = checkbox;

        const elementRef = React.useRef(null);
        const inputRef = React.useRef(props.inputRef);

        const isChecked = () => {
            return props.checked === props.trueValue;
        };

        const onChange = (event) => {
            if (props.disabled || props.readonly) {
                return;
            }

            if (props.onChange) {
                const checked = isChecked();
                const value = checked ? props.falseValue : props.trueValue;
                const eventData = {
                    originalEvent: event,
                    value: props.value,
                    checked: value,
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
                        checked: value
                    }
                };

                props?.onChange?.(eventData);

                // do not continue if the user defined click wants to prevent
                if (event.defaultPrevented) {
                    return;
                }

                DomHandler.focus(inputRef.current);
            }
        };

        const onFocus = () => {
            setFocusedState(true);
            props?.onFocus?.();
        };

        const onBlur = () => {
            setFocusedState(false);
            props?.onBlur?.();
        };

        React.useImperativeHandle(ref, () => ({
            props,
            focus: () => DomHandler.focus(inputRef.current),
            getElement: () => elementRef.current,
            getInput: () => inputRef.current
        }));

        React.useEffect(() => {
            ObjectUtils.combinedRefs(inputRef, props.inputRef);
        }, [inputRef, props.inputRef]);

        useUpdateEffect(() => {
            inputRef.current.checked = isChecked();
        }, [props.checked, props.trueValue]);

        useMountEffect(() => {
            if (props.autoFocus) {
                DomHandler.focus(inputRef.current, props.autoFocus);
            }
        });

        const checked = isChecked();
        const hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
        const otherProps = CheckboxBase.getOtherProps(props);
        const rootProps = mergeProps(
            {
                id: props.id,
                className: classNames(props.className, cx('root', { checked, context })),
                style: props.style,
                'data-p-highlight': checked,
                'data-p-disabled': props.disabled,
                onContextMenu: props.onContextMenu,
                onMouseDown: props.onMouseDown
            },
            otherProps,
            ptm('root')
        );

        const createInputElement = () => {
            const ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
            const inputProps = mergeProps(
                {
                    id: props.inputId,
                    type: 'checkbox',
                    className: cx('input'),
                    name: props.name,
                    tabIndex: props.tabIndex,
                    onFocus: (e) => onFocus(e),
                    onBlur: (e) => onBlur(e),
                    onChange: (e) => onChange(e),
                    disabled: props.disabled,
                    readOnly: props.readOnly,
                    required: props.required,
                    'aria-invalid': props.invalid,
                    checked: checked,
                    ...ariaProps
                },
                ptm('input')
            );

            return <input ref={inputRef} {...inputProps} />;
        };

        const createBoxElement = () => {
            const iconProps = mergeProps(
                {
                    className: cx('icon')
                },
                ptm('icon')
            );
            const boxProps = mergeProps(
                {
                    className: cx('box', { checked }),
                    'data-p-highlight': checked,
                    'data-p-disabled': props.disabled
                },
                ptm('box')
            );

            const icon = checked ? props.icon || <CheckIcon {...iconProps} /> : null;
            const checkboxIcon = IconUtils.getJSXIcon(icon, { ...iconProps }, { props, checked });

            return <div {...boxProps}>{checkboxIcon}</div>;
        };

        return (
            <ComponentProvider value={checkbox}>
                <div ref={elementRef} {...rootProps}>
                    {createInputElement()}
                    {createBoxElement()}
                </div>
                {hasTooltip && <Tooltip target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />}
            </ComponentProvider>
        );
    })
);

Checkbox.displayName = 'Checkbox';
