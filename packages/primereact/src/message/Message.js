import { Component, ComponentProvider } from '@primereact/core/component';
import { CheckIcon } from '@primereact/icons/check';
import { ExclamationTriangleIcon } from '@primereact/icons/exclamationtriangle';
import { InfoCircleIcon } from '@primereact/icons/infocircle';
import { TimesCircleIcon } from '@primereact/icons/timescircle';
import * as React from 'react';
import { IconUtils, ObjectUtils, classNames } from '../utils/Utils';
import { MessageBase } from './MessageBase';

export const Message = React.memo(
    React.forwardRef((inProps, inRef) => {
        const message = useMessage(inProps, inRef);
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
        } = message;

        const elementRef = React.useRef(null);

        const createContent = () => {
            if (props.content) {
                return ObjectUtils.getJSXElement(props.content, props);
            }

            const text = ObjectUtils.getJSXElement(props.text, props);

            const iconProps = mergeProps(
                {
                    className: cx('icon')
                },
                ptm('icon')
            );

            let icon = props.icon;

            if (!icon) {
                switch (props.severity) {
                    case 'info':
                        icon = <InfoCircleIcon {...iconProps} />;
                        break;
                    case 'warn':
                        icon = <ExclamationTriangleIcon {...iconProps} />;
                        break;
                    case 'error':
                        icon = <TimesCircleIcon {...iconProps} />;
                        break;
                    case 'success':
                        icon = <CheckIcon {...iconProps} />;
                        break;
                    default:
                        break;
                }
            }

            const messageIcon = IconUtils.getJSXIcon(icon, { ...iconProps }, { props });

            const textProps = mergeProps(
                {
                    className: cx('text')
                },
                ptm('text')
            );

            return (
                <>
                    {messageIcon}
                    <span {...textProps}>{text}</span>
                </>
            );
        };

        React.useImperativeHandle(ref, () => ({
            props,
            getElement: () => elementRef.current
        }));

        const content = createContent();

        const rootProps = mergeProps(
            {
                className: classNames(props.className, cx('root')),
                style: props.style,
                role: 'alert',
                'aria-live': 'polite',
                'aria-atomic': 'true'
            },
            MessageBase.getOtherProps(props),
            ptm('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={message}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {content}
                </Component>
            </ComponentProvider>
        );
    })
);

Message.displayName = 'Message';
