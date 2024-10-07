import { Component, ComponentProvider } from '@primereact/core/component';
import { isNotEmpty } from '@primeuix/utils';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useListbox } from './ListBox.base';

export const ListBox = React.memo(
    React.forwardRef((inProps, inRef) => {
        const listbox = useListbox(inProps, inRef);
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
        } = listbox;

        return (
            <ComponentProvider pIf={props.pIf} value={listbox}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}></Component>
                <Tooltip pIf={isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />
            </ComponentProvider>
        );
    })
);

ListBox.displayName = 'ListBox';
