import { useTimeout } from '@primereact/hooks';
import { CheckIcon } from '@primereact/icons/check';
import { ExclamationTriangleIcon } from '@primereact/icons/exclamationtriangle';
import { InfoCircleIcon } from '@primereact/icons/infocircle';
import { TimesIcon } from '@primereact/icons/times';
import { TimesCircleIcon } from '@primereact/icons/timescircle';
import { isAttributeNotEquals, mergeProps } from '@primeuix/utils';
import { Ripple } from 'primereact/ripple';
import * as React from 'react';
import { classNames } from '../utils/Utils';

export const ToastMessage = React.memo(
    React.forwardRef((inProps, inRef) => {
        const { messageInfo = { message }, toast } = inProps;
        const {
            props,
            ptm,
            cx,
            $primereact,
            // methods
            onClose: onToastClose
        } = toast;

        // states
        const [focused, setFocused] = React.useState(false);
        const [clearTimer] = useTimeout(
            () => {
                onClose();
            },
            message.life || 3000,
            !message.sticky && !focused
        );

        const onClose = () => {
            clearTimer();
            onToastClose?.(messageInfo);
        };

        const onClick = (event) => {
            if (isAttributeNotEquals(event.target, 'data-pc-section', 'closebutton') && isAttributeNotEquals(event.target, 'data-pc-section', 'closeicon')) {
                props.onClick?.(message);
            }
        };

        const onMouseEnter = (event) => {
            props.onMouseEnter?.(event);

            // do not continue if the user has canceled the event
            if (event.defaultPrevented) {
                return;
            }

            // stop timer while user has focused message
            if (!sticky) {
                clearTimer();
                setFocused(true);
            }
        };

        const onMouseLeave = (event) => {
            props.onMouseLeave?.(event);

            // do not continue if the user has canceled the event
            if (event.defaultPrevented) {
                return;
            }

            // restart timer when user has left message
            if (!message.sticky) {
                setFocused(false);
            }
        };

        const createCloseContent = () => {
            if (message.closable !== false) {
                const buttonIconProps = mergeProps(
                    {
                        className: cx('closeIcon')
                    },
                    ptm('closeIcon')
                );

                const icon = <Icon as={message.closeIcon || props.closeIcon || <TimesIcon />} {...buttonIconProps} />;

                const closeAriaLabel = $primereact.config?.locale?.aria?.close;

                const closeButtonProps = mergeProps(
                    {
                        type: 'button',
                        className: cx('closeButton'),
                        autoFocus: true,
                        'aria-label': closeAriaLabel,
                        onClick: onClose
                    },
                    ptm('closeButton')
                );

                const buttonContainerProps = mergeProps({}, ptm('buttonContainer'));

                return (
                    <div {...buttonContainerProps}>
                        <button {...closeButtonProps}>
                            {icon}
                            <Ripple />
                        </button>
                    </div>
                );
            }

            return null;
        };

        const createMessageIcon = () => {
            let icon;

            switch (severity) {
                case 'info':
                    icon = <InfoCircleIcon />;
                    break;
                case 'warn':
                    icon = <ExclamationTriangleIcon />;
                    break;
                case 'error':
                    icon = <TimesCircleIcon />;
                    break;
                case 'success':
                    icon = <CheckIcon />;
                    break;
                default:
                    break;
            }

            const messageIconProps = mergeProps(
                {
                    className: cx('messageIcon')
                },
                ptm('messageIcon')
            );

            return <Icon as={message.icon || icon} {...messageIconProps} />;
        };

        const createMessage = () => {
            const messageIcon = createMessageIcon();

            const detailProps = mergeProps(
                {
                    className: cx('detail')
                },
                ptm('detail')
            );

            const summaryProps = mergeProps(
                {
                    className: cx('summary')
                },
                ptm('summary')
            );

            const textProps = mergeProps(
                {
                    className: cx('messageText')
                },
                ptm('messageText')
            );

            return (
                <>
                    {messageIcon}
                    <div {...textProps}>
                        <span {...summaryProps}>{message.summary}</span>
                        {message.detail && <div {...detailProps}>{message.detail}</div>}
                    </div>
                </>
            );
        };

        const createContent = () => {
            const content = resolve(message.template, { message }, toast) || createMessage();
            const closeContent = createCloseContent();

            const messageContentProps = mergeProps(
                {
                    style: contentStyle,
                    className: classNames(cx('messageContent'), message.contentClassName)
                },
                ptm('messageContent')
            );

            return (
                <div {...messageContentProps}>
                    {content}
                    {closeContent}
                </div>
            );
        };

        const content = resolve(message.content || props.contentTemplate, { message, closeCallback: onClose }, toast) || createContent();

        const messageProps = mergeProps(
            {
                style,
                className: classNames(cx('message', { severity: message.severity }), message.className),
                role: 'alert',
                'aria-live': 'assertive',
                'aria-atomic': 'true',
                onClick,
                onMouseEnter: onMouseEnter,
                onMouseLeave: onMouseLeave
            },
            ptm('message')
        );

        return (
            <div {...messageProps} ref={inRef}>
                {content}
            </div>
        );
    })
);

ToastMessage.displayName = 'ToastMessage';
