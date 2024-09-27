import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useButtonGroup } from './ButtonGroup.base';

export const ButtonGroup = React.memo(
    React.forwardRef((inProps, inRef) => {
        const buttongroup = useButtonGroup(inProps, inRef);
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
        } = buttongroup;

        const rootProps = mergeProps(
            {
                ref,
                className: cx('root'),
                role: 'group'
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={buttongroup}>
                <Component as={props.as || 'span'} {...rootProps} ref={elementRef}>
                    {props.children}
                </Component>
            </ComponentProvider>
        );
    })
);

ButtonGroup.displayName = 'ButtonGroup';
