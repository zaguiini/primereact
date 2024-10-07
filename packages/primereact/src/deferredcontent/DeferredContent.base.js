import { withComponent } from '@primereact/core/component';
import { useEventListener, useMountEffect } from '@primereact/hooks';
import { style } from '@primereact/styles/deferredcontent';
import { defaultProps } from './DeferredContent.props';

export const useDeferredContent = withComponent(
    ({ elementRef, props }) => {
        // states
        const [loaded, setLoaded] = React.useState(false);
        const state = {
            loaded
        };

        // bindings
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

        // methods
        const shouldLoad = () => {
            if (loaded) {
                return false;
            }

            const rect = elementRef.current.getBoundingClientRect();
            const winHeight = document.documentElement.clientHeight;

            return winHeight >= rect.top;
        };
        const load = (event) => {
            setLoaded(true);
            props.onLoad?.(event);
        };

        // effects
        useMountEffect(() => {
            if (!loaded) {
                shouldLoad() ? load() : bindScrollListener();
            }
        });

        return {
            state,
            // methods
            shouldLoad,
            load
        };
    },
    defaultProps,
    style
);
