import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/inplace';
import { focus } from '@primeuix/utils';
import { contentDefaultProps, defaultProps, displayDefaultProps } from './Inplace.props';

export const useInplaceDisplay = withComponent(({ elementRef, parent }) => {
    // methods
    const onClick = (event) => {
        parent?.open(event);
    };
    const onKeyDown = (event) => {
        if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space') {
            onClick(event);
            event.preventDefault();
        }
    };

    // effects
    React.useEffect(() => {
        parent?.displayRef.current = elementRef.current;
    }, [elementRef]);

    // computed
    const tabIndex = parent?.props.tabIndex || 0;
    const active = !parent?.state.active;

    return {
        // methods
        onClick,
        onKeyDown,
        // computed
        tabIndex,
        active
    };
}, displayDefaultProps);

export const useInplaceContent = withComponent(({ elementRef, parent }) => {
    parent?.displayRef.current = elementRef.current;

    // methods
    const close = (event) => {
        parent?.close(event);

        setTimeout(() => {
            focus(parent?.displayRef.current);
        }, 0);
    };

    // effects
    React.useEffect(() => {
        parent?.contentRef.current = elementRef.current;
    }, [elementRef]);

    // computed
    const active = !!parent?.state.active;

    return {
        // methods
        close,
        active
    };
}, contentDefaultProps);

export const useInplace = withComponent(
    ({ props }) => {
        // states
        const [activeState, setActiveState] = React.useState(props.active);
        const active = props.onActiveChange ? props.active : activeState;
        const state = {
            active
        };

        // element refs
        const displayRef = React.useRef(null);
        const contentRef = React.useRef(null);

        // methods
        const open = (event) => {
            if (props.disabled) {
                return;
            }

            props.onOpen?.(event);

            if (props.onActiveChange) {
                props.onActiveChange({
                    originalEvent: event,
                    value: true
                });
            } else {
                setActiveState(true);
            }
        };
        const close = (event) => {
            if (props.disabled) {
                return;
            }

            props.onClose?.(event);

            if (props.onActiveChange) {
                props.onActiveChange({
                    originalEvent: event,
                    value: false
                });
            } else {
                setActiveState(false);
            }
        };

        // effects
        useUpdateEffect(() => {
            props.active ? open() : close();
        }, [props.active]);

        return {
            state,
            // element refs
            displayRef,
            contentRef,
            // methods
            open,
            close
        };
    },
    defaultProps,
    style
);
