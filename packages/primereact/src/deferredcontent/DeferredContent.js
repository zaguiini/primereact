import { ComponentProvider } from '@primereact/core/component';
import { useEventListener, useMountEffect } from '@primereact/hooks';
import * as React from 'react';
import { useDeferredContent } from './DeferredContent.base';
import { DeferredContentBase } from './DeferredContentBase';

export const DeferredContent = React.forwardRef((inProps, inRef) => {
    const [loadedState, setLoadedState] = React.useState(false);
    const state = {
        loaded: loadedState
    };
    const elementRef = React.useRef(null);

    const deferredcontent = useDeferredContent(inProps, inRef, state);
    const { props, ptm, ptmi, cx, ref } = deferredcontent;

    const [bindScrollListener, unbindScrollListener] = useEventListener({
        target: 'window',
        type: 'scroll',
        listener: () => {
            if (shouldLoad()) {
                load();
                unbindScrollListener();
            }
        }
    });

    const { ptm } = DeferredContentBase.setMetaData({
        props,
        state: {
            loaded: loadedState
        }
    });

    const shouldLoad = () => {
        if (loadedState) {
            return false;
        }

        const rect = elementRef.current.getBoundingClientRect();
        const winHeight = document.documentElement.clientHeight;

        return winHeight >= rect.top;
    };

    const load = (event) => {
        setLoadedState(true);
        props.onLoad && props.onLoad(event);
    };

    React.useImperativeHandle(ref, () => ({
        props,
        getElement: () => elementRef.current
    }));

    useMountEffect(() => {
        if (!loadedState) {
            shouldLoad() ? load() : bindScrollListener();
        }
    });

    const rootProps = mergeProps(
        {
            ref: elementRef
        },
        DeferredContentBase.getOtherProps(props),
        ptm('root')
    );

    return (
        <ComponentProvider value={deferredcontent}>
            <div {...rootProps}>{loadedState && props.children}</div>
        </ComponentProvider>
    );
});

DeferredContent.displayName = 'DeferredContent';
