import { Component, ComponentProvider } from '@primereact/core/component';
import { resolve } from '@primeuix/utils';
import { InputText } from 'primereact/inputtext';
import * as React from 'react';
import { useInputOtp } from './InputOtp.base';

export const InputOtp = React.memo(
    React.forwardRef((inProps, inRef) => {
        const inputotp = useInputOtp(inProps, inRef);
        const {
            props,
            state,
            ptm,
            ptmi,
            cx,
            id,
            // element refs
            elementRef,
            // methods
            getTemplateAttrs,
            getTemplateEvents,
            onClick,
            // computed
            inputMode,
            inputType
        } = inputotp;

        const createInput = (index) => {
            const events = getTemplateEvents(index - 1);

            return (
                <InputText
                    key={index}
                    defaultValue={state.tokens[index - 1]}
                    type={inputType}
                    className={cx('pcInputText')}
                    inputMode={inputMode}
                    variant={props.variant}
                    readOnly={props.readOnly}
                    disabled={props.disabled}
                    invalid={props.invalid}
                    tabIndex={props.tabIndex}
                    unstyled={props.unstyled}
                    {...events}
                    onClick={onClick}
                    pt={ptm('pcInputText')}
                />
            );
        };

        const createContent = () => {
            const items = [];
            for (let i in props.length) {
                const item = resolve(props.children, { events: getTemplateEvents(i - 1), attrs: getTemplateAttrs(i - 1) }) || createInput(i);

                items.push(item);
            }

            return items;
        };

        const content = createContent();

        const rootProps = mergeProps(
            {
                id,
                className: cx('root')
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={inputotp}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {content}
                </Component>
            </ComponentProvider>
        );
    })
);

InputOtp.displayName = 'InputOtp';
