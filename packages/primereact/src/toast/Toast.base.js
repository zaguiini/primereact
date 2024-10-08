import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/toast';
import { deepEquals, ZIndex } from '@primeuix/utils';
import * as React from 'react';
import { defaultProps } from './Toast.props';

let messageIdx = 0;

export const useToast = withComponent(
    ({ elementRef, props, $primereact }) => {
        // states
        const [messages, setMessages] = React.useState([]);
        const state = {
            messages
        };

        // methods
        const assignIdentifiers = (currentState, messageInfo, copy) => {
            let messages;

            if (Array.isArray(messageInfo)) {
                const multipleMessages = messageInfo.reduce((acc, message) => {
                    acc.push({ _pId: messageIdx++, message });

                    return acc;
                }, []);

                if (copy) {
                    messages = currentState ? [...currentState, ...multipleMessages] : multipleMessages;
                } else {
                    messages = multipleMessages;
                }
            } else {
                const message = { _pId: messageIdx++, message: messageInfo };

                if (copy) {
                    messages = currentState ? [...currentState, message] : [message];
                } else {
                    messages = [message];
                }
            }

            return messages;
        };
        const clear = () => {
            ZIndex.clear(elementRef.current);
            setMessages([]);
        };
        const show = (messageInfo) => {
            if (messageInfo) {
                setMessages((prevMessages) => assignIdentifiers(prevMessages, messageInfo, true));
            }
        };
        const replace = (messageInfo) => {
            setMessages((prevMessages) => assignIdentifiers(prevMessages, messageInfo, false));
        };
        const remove = (messageInfo) => {
            // allow removal by ID or by message equality
            const removeMessage = messageInfo._pId ? messageInfo._pId : messageInfo.message || messageInfo;

            setMessages((prevMessages) => prevMessages.filter((msg) => msg._pId !== messageInfo._pId && !deepEquals(msg.message, removeMessage)));

            props.onRemove?.(messageInfo.message || removeMessage);
        };
        const onClose = (messageInfo) => {
            remove(messageInfo);
        };
        const onEntered = () => {
            props.onShow?.();
        };
        const onExited = () => {
            messagesState.length === 1 && ZIndex.clear(elementRef.current);

            props.onHide?.();
        };

        // effects
        useUpdateEffect(() => {
            if (props.autoZIndex || $primereact.config.autoZIndex) {
                ZIndex.set('toast', elementRef.current, props.baseZIndex || $primereact.config.zIndex.toast);
            }
        }, [messages, props.baseZIndex]);

        useUnmountEffect(() => {
            ZIndex.clear(elementRef.current);
        });

        return {
            state,
            // methods
            clear,
            show,
            replace,
            remove,
            onClose,
            onEntered,
            onExited
        };
    },
    defaultProps,
    style
);
