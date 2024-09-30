import { Component, ComponentProvider } from '@primereact/core/component';
import { isNotEmpty, mergeProps } from '@primeuix/utils';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useInputText } from './InputText.base';

export const InputText = React.memo(
    React.forwardRef((inProps, inRef) => {
        const inputtext = useInputText(inProps, inRef);
        const {
            attrs,
            props,
            state,
            ptm,
            ptmi,
            cx,
            id,
            // element refs
            elementRef,
            // methods
            onBeforeInput,
            onInput,
            onKeyDown,
            onPaste
        } = inputtext;

        const rootProps = mergeProps(
            {
                id,
                type: 'text',
                className: cx('root'),
                'aria-invalid': props.invalid || undefined,
                onBeforeInput,
                onInput,
                onKeyDown,
                onPaste
            },
            ptmi('root', {
                context: {
                    filled: state.filled,
                    disabled: attrs.disabled || attrs.disabled === ''
                }
            })
        );

        return (
            <ComponentProvider pIf={props.pIf} value={inputtext}>
                <Component as={props.as || 'input'} {...rootProps} ref={elementRef} />
                <Tooltip pIf={isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />
            </ComponentProvider>
        );
    })
);

InputText.displayName = 'InputText';
