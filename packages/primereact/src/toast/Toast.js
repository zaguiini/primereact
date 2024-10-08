import { ComponentProvider } from '@primereact/core/component';
import { CSSTransition } from 'primereact/csstransition';
import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { useToast } from './Toast.base';
import { ToastMessage } from './ToastMessage';

export const Toast = React.memo(
    React.forwardRef((inProps, inRef) => {
        const toast = useToast(inProps, inRef);
        const {
            id,
            props,
            state,
            ptm,
            ptmi,
            cx,
            // element refs
            elementRef,
            // methods
            onEntered,
            onExited
        } = toast;

        const transitionProps = mergeProps(
            {
                classNames: 'p-toast-message',
                timeout: { enter: 300, exit: 300 },
                options: props.transitionOptions,
                unmountOnExit: true,
                onEntered,
                onExited
            },
            ptm('transition')
        );

        const rootProps = mergeProps(
            {
                id,
                style: sx('root'),
                className: cx('root'),
                onClick: onContainerClick
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={toast}>
                <Portal appendTo={props.appendTo}>
                    <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                        <TransitionGroup>
                            {state.messages?.map((messageInfo, index) => {
                                const messageRef = React.createRef();

                                return (
                                    <CSSTransition nodeRef={messageRef} key={messageInfo._pId} {...transitionProps}>
                                        <ToastMessage messageInfo={messageInfo} toast={toast} ref={messageRef} />
                                    </CSSTransition>
                                );
                            })}
                        </TransitionGroup>
                    </Component>
                </Portal>
            </ComponentProvider>
        );
    })
);

Toast.displayName = 'Toast';
