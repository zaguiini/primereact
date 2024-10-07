import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/scrolltop';
import { ZIndex } from '@primeuix/utils';
import * as React from 'react';
import { defaultProps } from './ScrollTop.props';

export const useScrollTop = withComponent(
    ({ props, $primereact }) => {
        // states
        const [visible, setVisible] = React.useState(false);
        const state = {
            visible
        };

        // element refs
        const scrollElementRef = React.useRef(null);

        // bindings
        const [bindParentScrollListener] = useEventListener({
            target: () => scrollElementRef.current && scrollElementRef.current.parentElement,
            type: 'scroll',
            listener: (event) => {
                checkVisibility(event.currentTarget.scrollTop);
            }
        });

        const [bindDocumentScrollListener] = useEventListener({
            target: 'window',
            type: 'scroll',
            listener: (event) => {
                checkVisibility(getWindowScrollTop());
            }
        });

        // methods
        const checkVisibility = (scrollY) => {
            setVisible(scrollY > props.threshold);
        };

        const onClick = () => {
            const scrollElement = props.target === 'window' ? window : scrollElementRef.current.parentElement;

            scrollElement.scroll({
                top: 0,
                behavior: props.behavior
            });
        };

        const onEnter = () => {
            ZIndex.set('overlay', scrollElementRef.current, $primereact.config.zIndex.overlay);
        };

        const onEntered = () => {
            props.onShow?.();
        };

        const onExited = () => {
            ZIndex.clear(scrollElementRef.current);

            props.onHide?.();
        };

        // computed
        const scrollTopAriaLabel = ''; //localeOption('aria') ? localeOption('aria').scrollTop : undefined; @todo: check localeOption

        // effects
        React.useEffect(() => {
            if (props.target === 'window') bindDocumentScrollListener();
            else if (props.target === 'parent') bindParentScrollListener();
        }, []);

        useUnmountEffect(() => {
            ZIndex.clear(scrollElementRef.current);
        });

        return {
            state,
            // element refs
            scrollElementRef,
            // methods
            checkVisibility,
            onClick,
            onEnter,
            onEntered,
            onExited,
            // computed
            scrollTopAriaLabel
        };
    },
    defaultProps,
    style
);
