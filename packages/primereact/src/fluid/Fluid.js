import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useFluid } from './Fluid.base';

export const Fluid = React.memo(
    React.forwardRef((inProps, inRef) => {
        const fluid = useFluid(inProps, inRef);
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
            ptmi,
            cx,
            ref
        } = fluid;

        const rootProps = mergeProps(
            {
                ref,
                className: cx('root')
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={fluid}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {props.children}
                </Component>
            </ComponentProvider>
        );
    })
);

Fluid.displayName = 'Fluid';
