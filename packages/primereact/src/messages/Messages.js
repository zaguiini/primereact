import { Component, ComponentProvider } from '@primereact/core/component';
import { CSSTransition } from 'primereact/csstransition';
import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { ObjectUtils } from '../utils/Utils';
import { useMessages } from './Messages.base';
import { MessagesBase } from './MessagesBase';
import { UIMessage } from './UIMessage';

let messageIdx = 0;

export const Messages = React.memo(
    React.forwardRef((inProps, inRef) => {
        const [messagesState, setMessagesState] = React.useState([]);
        const elementRef = React.useRef(null);
        const state = {
            messages: messagesState
        };

        const messages = useMessages(inProps, inRef, state);
        const { props, ptm, ptmi, cx, ref } = messages;

        const show = (messageInfo) => {
            if (messageInfo) {
                setMessagesState((prev) => assignIdentifiers(prev, messageInfo, true));
            }
        };

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
            setMessagesState([]);
        };

        const replace = (messageInfo) => {
            setMessagesState((prev) => assignIdentifiers(prev, messageInfo, false));
        };

        const remove = (messageInfo) => {
            // allow removal by ID or by message equality
            const removeMessage = messageInfo._pId ? messageInfo._pId : messageInfo.message || messageInfo;

            setMessagesState((prev) => prev.filter((msg) => msg._pId !== messageInfo._pId && !ObjectUtils.deepEquals(msg.message, removeMessage)));

            props.onRemove && props.onRemove(messageInfo.message || removeMessage);
        };

        const onClose = (messageInfo) => {
            remove(messageInfo);
        };

        React.useImperativeHandle(ref, () => ({
            props,
            show,
            replace,
            remove,
            clear,
            getElement: () => elementRef.current
        }));

        const rootProps = mergeProps(
            {
                id: props.id,
                className: props.className,
                style: props.style
            },
            MessagesBase.getOtherProps(props),
            ptCallbacks.ptm('root')
        );

        const transitionProps = mergeProps(
            {
                classNames: ptCallbacks.cx('uimessage.transition'),
                unmountOnExit: true,
                timeout: { enter: 300, exit: 300 },
                options: props.transitionOptions
            },
            ptCallbacks.ptm('transition')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={messages}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    <TransitionGroup>
                        {messagesState &&
                            messagesState.map((message, index) => {
                                const messageRef = React.createRef();

                                return (
                                    <CSSTransition nodeRef={messageRef} key={message._pId} {...transitionProps}>
                                        <UIMessage hostName="Messages" ref={messageRef} message={message} onClick={props.onClick} onClose={onClose} ptCallbacks={ptCallbacks} metaData={metaData} index={index} />
                                    </CSSTransition>
                                );
                            })}
                    </TransitionGroup>
                </Component>
            </ComponentProvider>
        );
    })
);

Messages.displayName = 'Messages';
