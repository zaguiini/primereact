import { ComponentProvider } from '@primereact/core/component';
import { PrimeReactContext } from '@primereact/core/config';
import { useUpdateEffect } from '@primereact/hooks';
import { ObjectUtils } from 'primereact/utils';
import * as React from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';
import { useCSSTransition } from './CSSTransition.base';

export const CSSTransition = React.forwardRef((inProps, inRef) => {
    const context = React.useContext(PrimeReactContext);
    const csstransition = useCSSTransition(inProps, inRef);
    const { props } = csstransition;

    const disabled = props.disabled || (props.options && props.options.disabled) || !context?.cssTransition;

    const onEnter = (node, isAppearing) => {
        inProps.onEnter && inProps.onEnter(node, isAppearing); // component
        inProps.options && inProps.options.onEnter && inProps.options.onEnter(node, isAppearing); // user option
    };

    const onEntering = (node, isAppearing) => {
        inProps.onEntering && inProps.onEntering(node, isAppearing); // component
        inProps.options && inProps.options.onEntering && inProps.options.onEntering(node, isAppearing); // user option
    };

    const onEntered = (node, isAppearing) => {
        inProps.onEntered && inProps.onEntered(node, isAppearing); // component
        inProps.options && inProps.options.onEntered && inProps.options.onEntered(node, isAppearing); // user option
    };

    const onExit = (node) => {
        inProps.onExit && inProps.onExit(node); // component
        inProps.options && inProps.options.onExit && inProps.options.onExit(node); // user option
    };

    const onExiting = (node) => {
        inProps.onExiting && inProps.onExiting(node); // component
        inProps.options && inProps.options.onExiting && inProps.options.onExiting(node); // user option
    };

    const onExited = (node) => {
        inProps.onExited && inProps.onExited(node); // component
        inProps.options && inProps.options.onExited && inProps.options.onExited(node); // user option
    };

    useUpdateEffect(() => {
        if (disabled) {
            // no animation
            const node = ObjectUtils.getRefElement(inProps.nodeRef);

            if (inProps.in) {
                onEnter(node, true);
                onEntering(node, true);
                onEntered(node, true);
            } else {
                onExit(node);
                onExiting(node);
                onExited(node);
            }
        }
    }, [inProps.in]);

    if (disabled) {
        return inProps.in ? inProps.children : null;
    }

    const immutableProps = { nodeRef: inProps.nodeRef, in: inProps.in, onEnter, onEntering, onEntered, onExit, onExiting, onExited };
    const mutableProps = { classNames: inProps.classNames, timeout: inProps.timeout, unmountOnExit: inProps.unmountOnExit };
    const mergedProps = { ...mutableProps, ...(inProps.options || {}), ...immutableProps };

    return (
        <ComponentProvider value={csstransition}>
            <ReactCSSTransition {...mergedProps}>{inProps.children}</ReactCSSTransition>
        </ComponentProvider>
    );
});

CSSTransition.displayName = 'CSSTransition';
