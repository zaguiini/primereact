import { ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import { InputText } from 'primereact/inputtext';
import * as React from 'react';
import { useInputMask } from './InputMask.base';

export const InputMask = React.memo(
    React.forwardRef((inProps, inRef) => {
        const inputmask = useInputMask(inProps, inRef);
        const {
            props,
            ptm,
            ptmi,
            cx,
            id,
            // methods
            onBlur,
            onKeyDown,
            onKeyPress,
            onFocus,
            onInput,
            handleInputChange
        } = inputmask;

        const rootProps = mergeProps(
            {
                className: cx('root')
            },
            ptm('pcInputText'),
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={inputmask}>
                <InputText
                    {...rootProps}
                    ref={ref}
                    id={id}
                    invalid={props.invalid}
                    variant={props.variant}
                    fluid={props.fluid}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    onKeyPress={onKeyPress}
                    onInput={onInput}
                    onCompositionEnd={onInput}
                    onPaste={(e) => handleInputChange(e, true)}
                    tooltip={props.tooltip}
                    tooltipOptions={props.tooltipOptions}
                    unstyled={props.unstyled}
                />
            </ComponentProvider>
        );
    })
);

InputMask.displayName = 'InputMask';
