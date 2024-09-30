import { Component, ComponentProvider } from '@primereact/core/component';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useTextarea } from './Textarea.base';

export const Textarea = React.memo(
    React.forwardRef((inProps, inRef) => {
        const textarea = useTextarea(inProps, inRef);
        const {
            props,
            attrs,
            ptm,
            ptmi,
            cx,
            id,
            // element refs
            elementRef,
            // methods
            onFocus,
            onBlur,
            onKeyUp,
            onKeyDown,
            onBeforeInput,
            onInput,
            onPaste
        } = textarea;

        const rootProps = mergeProps(
            {
                id,
                className: cx('root'),
                'aria-invalid': props.invalid || undefined,
                onFocus,
                onBlur,
                onKeyUp,
                onKeyDown,
                onBeforeInput,
                onInput,
                onPaste
            },
            ptmi('root', {
                context: {
                    disabled: attrs.disabled || attrs.disabled === ''
                }
            })
        );

        return (
            <ComponentProvider pIf={props.pIf} value={textarea}>
                <Component as={props.as || 'textarea'} {...rootProps} ref={elementRef} />
                <Tooltip pIf={isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />
            </ComponentProvider>
        );
    })
);

Textarea.displayName = 'Textarea';
