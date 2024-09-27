import { Component, ComponentProvider } from '@primereact/core/component';
import { classNames, mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useBadge } from './Badge.base';

export const Badge = React.memo(
    React.forwardRef((inProps, inRef) => {
        const badge = useBadge(inProps, inRef);
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
            isClearIconVisible
        } = badge;

        const rootProps = mergeProps(
            {
                ref,
                style: props.style,
                className: classNames(cx('root'), props.className)
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={badge}>
                <Component as={props.as || 'span'} {...rootProps} ref={elementRef}>
                    {props.value}
                </Component>
            </ComponentProvider>
        );
    })
);

Badge.displayName = 'Badge';
