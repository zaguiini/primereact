import { ComponentProvider } from '@primereact/core/component';
import { useEventListener, useMergeProps, useMountEffect } from '@primereact/hooks';
import * as React from 'react';
import { PrimeReactContext } from '../api/Api';
import { useDeferredContent } from './DeferredContent.base';
import { DeferredContentBase } from './DeferredContentBase';

export const DeferredContent = React.forwardRef((inProps, inRef) => {
    const deferredcontent = useDeferredContent(inProps, inRef);
    const { props, ptm, ptmi, cx, ref } = deferredcontent;

    const mergeProps = useMergeProps();
    const context = React.useContext(PrimeReactContext);
    const props = DeferredContentBase.getProps(inProps, context);

    const [loadedState, setLoadedState] = React.useState(false);
    const elementRef = React.useRef(null);

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
