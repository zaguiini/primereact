import { ComponentProvider } from '@primereact/core/component';
import { PrimeReactContext } from '@primereact/core/config';
import { useUpdateEffect } from '@primereact/hooks';
import { toElement } from '@primeuix/utils';
import * as React from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';
import { useCSSTransition } from './CSSTransition.base';

export const CSSTransition = React.forwardRef((inProps, inRef) => {
    const config = React.useContext(PrimeReactContext);
    const csstransition = useCSSTransition(inProps, inRef);

    // It supports all the props of react-transition-group/CSSTransition so everything is in props object of instance.
    csstransition.props = { ...csstransition.props, ...csstransition.attrs };
    csstransition.attrs = {};

    const { props } = csstransition;

    const disabled = props.disabled || (props.options && props.options.disabled) || !config?.cssTransition;

    const onEnter = (node, isAppearing) => {
        props.onEnter?.(node, isAppearing); // component
        props.options?.onEnter?.(node, isAppearing); // user option
    };

    const onEntering = (node, isAppearing) => {
        props.onEntering?.(node, isAppearing); // component
        props.options?.onEntering?.(node, isAppearing); // user option
    };

    const onEntered = (node, isAppearing) => {
        props.onEntered?.(node, isAppearing); // component
        props.options?.onEntered?.(node, isAppearing); // user option
    };

    const onExit = (node) => {
        props.onExit?.(node); // component
        props.options?.onExit?.(node); // user option
    };

    const onExiting = (node) => {
        props.onExiting?.(node); // component
        props.options?.onExiting?.(node); // user option
    };

    const onExited = (node) => {
        props.onExited?.(node); // component
        props.options?.onExited?.(node); // user option
    };

    useUpdateEffect(() => {
        if (disabled) {
            // no animation
            const node = toElement(props.nodeRef);

            if (props.in) {
                onEnter(node, true);
                onEntering(node, true);
                onEntered(node, true);
            } else {
                onExit(node);
                onExiting(node);
                onExited(node);
            }
        }
    }, [props.in]);

    if (disabled) {
        return props.in ? props.children : null;
    }

    const immutableProps = { nodeRef: props.nodeRef, in: props.in, onEnter, onEntering, onEntered, onExit, onExiting, onExited };
    const mutableProps = { classNames: props.classNames, timeout: props.timeout, unmountOnExit: props.unmountOnExit };
    const mergedProps = { ...mutableProps, ...(props.options || {}), ...immutableProps };

    return (
        <ComponentProvider value={csstransition}>
            <ReactCSSTransition {...mergedProps}>{props.children}</ReactCSSTransition>
        </ComponentProvider>
    );
});

CSSTransition.displayName = 'CSSTransition';
