import { Component, ComponentProvider } from '@primereact/core/component';
import { useMountEffect } from '@primereact/hooks';
import { CheckIcon } from '@primereact/icons/check';
import { TimesIcon } from '@primereact/icons/times';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { ariaLabel } from '../api/Api';
import { DomHandler, IconUtils, ObjectUtils, classNames } from '../utils/Utils';
import { useTriStateCheckbox } from './TriStateCheckbox.base';
import { TriStateCheckboxBase } from './TriStateCheckboxBase';

export const TriStateCheckbox = React.memo(
    React.forwardRef((inProps, inRef) => {
        const tristatecheckbox = useTriStateCheckbox(inProps, inRef);
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
            isClearIconVisible,
            ptm,
            ptmi,
            cx,
            ref
        } = tristatecheckbox;

        const elementRef = React.useRef(null);

        const onChange = (event) => {
            if (props.disabled || props.readOnly) {
                return;
            }

            let newValue;

            if (props.value === null || props.value === undefined) {
                newValue = true;
            } else if (props.value === true) {
                newValue = false;
            } else if (props.value === false) {
                newValue = null;
            }

            if (props.onChange) {
                props.onChange({
                    originalEvent: event,
                    value: newValue,
                    stopPropagation: () => {
                        event?.stopPropagation();
                    },
                    preventDefault: () => {
                        event?.preventDefault();
                    },
                    target: {
                        name: props.name,
                        id: props.id,
                        value: newValue
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

        const onKeyDown = (e) => {
            if (e.code === 'Enter' || e.code === 'NumpadEnter' || e.code === 'Space') {
                onChange(e);
                e.preventDefault();
            }
        };

        React.useImperativeHandle(ref, () => ({
            props,
            focus: () => DomHandler.focusFirstElement(elementRef.current),
            getElement: () => elementRef.current
        }));

        useMountEffect(() => {
            if (props.autoFocus) {
                DomHandler.focusFirstElement(elementRef.current);
            }
        });

        const hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
        const otherProps = TriStateCheckboxBase.getOtherProps(props);
        const ariaProps = ObjectUtils.reduceKeys(otherProps, DomHandler.ARIA_PROPS);
        const checkIconProps = mergeProps(
            {
                className: cx('checkIcon')
            },
            ptm('checkIcon')
        );
        const uncheckIconProps = mergeProps(
            {
                className: cx('checkIcon')
            },
            ptm('uncheckIcon')
        );

        let icon;

        if (props.value === false) {
            icon = props.uncheckIcon || <TimesIcon {...uncheckIconProps} />;
        } else if (props.value === true) {
            icon = props.checkIcon || <CheckIcon {...checkIconProps} />;
        }

        const checkIcon = IconUtils.getJSXIcon(icon, { ...checkIconProps }, { props });

        const ariaValueLabel = props.value ? ariaLabel('trueLabel') : props.value === false ? ariaLabel('falseLabel') : ariaLabel('nullLabel');
        const ariaChecked = props.value ? 'true' : 'false';

        const boxProps = mergeProps(
            {
                className: cx('box'),
                tabIndex: props.disabled ? '-1' : props.tabIndex,
                onFocus: onFocus,
                onBlur: onBlur,
                onKeyDown: onKeyDown,
                role: 'checkbox',
                'aria-checked': ariaChecked,
                ...ariaProps
            },
            ptm('box')
        );

        const srOnlyAriaProps = mergeProps(
            {
                className: 'p-sr-only p-hidden-accessible',
                'aria-live': 'polite'
            },
            ptm('srOnlyAria')
        );

        const rootProps = mergeProps(
            {
                className: classNames(props.className, cx('root', { context })),
                style: props.style,
                'data-p-disabled': props.disabled
            },
            TriStateCheckboxBase.getOtherProps(props),
            ptm('root')
        );

        const inputProps = mergeProps(
            {
                id: props.inputId,
                className: cx('input'),
                type: 'checkbox',
                'aria-invalid': props.invalid,
                disabled: props.disabled,
                readOnly: props.readOnly,
                value: props.value,
                checked: props.value,
                onChange: onChange
            },
            ptm('input')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={tristatecheckbox}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    <input {...inputProps} />
                    <span {...srOnlyAriaProps}>{ariaValueLabel}</span>
                    <div {...boxProps}>{checkIcon}</div>
                </Component>
                <Tooltip pIf={isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />
            </ComponentProvider>
        );
    })
);

TriStateCheckbox.displayName = 'TriStateCheckbox';
