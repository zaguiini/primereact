import { ComponentProvider } from '@primereact/core/component';
import { PrimeReactContext } from '@primereact/core/config';
import { useMountEffect, useUnmountEffect, useUpdateEffect } from '@primereact/hooks';
import { getTargetElement, isClient, resolve } from '@primeuix/utils';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { usePortal } from './Portal.base';

export const Portal = React.memo((inProps) => {
    const config = React.useContext(PrimeReactContext);
    const portal = usePortal(inProps);
    const { props } = portal;

    const [mountedState, setMountedState] = React.useState(props.visible && isClient());

    useMountEffect(() => {
        if (isClient() && !mountedState) {
            setMountedState(true);
            props.onMounted?.();
        }
    });

    useUpdateEffect(() => {
        props.onMounted?.();
    }, [mountedState]);

    useUnmountEffect(() => {
        props.onUnmounted?.();
    });

    const element = props.element || props.children;

    if (props.disabled) {
        return element;
    }

    if (element && mountedState) {
        const appendTo = getTargetElement(resolve(props.appendTo || config?.appendTo)) || document.body;
        const content = appendTo === 'self' ? element : ReactDOM.createPortal(element, appendTo);

        return (
            <ComponentProvider pIf={props.pIf} value={portal}>
                {content}
            </ComponentProvider>
        );
    }

    return null;
});

Portal.displayName = 'Portal';
