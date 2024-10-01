import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useColorPicker } from './ColorPicker.base';
import { ColorPickerOverlay } from './ColorPickerOverlay';

export const ColorPicker = React.memo(
    React.forwardRef((inProps, inRef) => {
        const colorpicker = useColorPicker(inProps, inRef);
        const {
            id,
            props,
            ptm,
            cx,
            // element refs
            elementRef,
            inputRef,
            // methods
            onInputClick,
            onInputKeyDown
        } = colorpicker;

        const createInput = () => {
            if (!props.inline) {
                const inputProps = mergeProps(
                    {
                        id: props.inputId,
                        type: 'text',
                        className: cx('preview'),
                        style: props.inputStyle,
                        readOnly: true,
                        tabIndex: props.tabIndex,
                        disabled: props.disabled,
                        onClick: onInputClick,
                        onKeyDown: onInputKeyDown
                    },
                    ptm('preview')
                );

                return <input {...inputProps} ref={inputRef} />;
            }

            return null;
        };

        const input = createInput();

        const rootProps = mergeProps(
            {
                id,
                className: cx('root')
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={colorpicker}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {input}
                    <ColorPickerOverlay colorpicker={colorpicker} />
                </Component>
                <Tooltip pIf={isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />
            </ComponentProvider>
        );
    })
);

ColorPicker.displayName = 'ColorPicker';
