import { withComponent } from '@primereact/core/component';
import { useMountEffect, useUnmountEffect, useUpdateEffect } from '@primereact/hooks';
import { style } from '@primereact/styles/blockui';
import { addClass, ZIndex } from '@primeuix/utils';
import { toValue } from 'primereact/utils';
import { defaultProps } from './BlockUI.props';

export const useBlockUI = withComponent(
    ({ props, $primereact, isUnstyled }) => {
        // states
        const [visible, setVisible] = React.useState(props.blocked);
        const state = {
            visible
        };

        // refs
        const activeElement = React.useRef(null);

        // element refs
        const maskRef = React.useRef(null);

        // methods
        const block = () => {
            setVisible(true);
            activeElement.current = document.activeElement;
        };
        const unblock = () => {
            !isUnstyled && addClass(maskRef.current, 'p-overlay-mask-leave');

            if (hasCSSAnimation(maskRef.current) > 0) {
                maskRef.current.addEventListener('animationend', () => {
                    removeMask();
                });
            } else {
                removeMask();
            }
        };
        const removeMask = () => {
            ZIndex.clear(maskRef.current);
            setVisible(false);

            if (props.fullScreen) {
                unblockBodyScroll();
                activeElement.current?.focus();
            }

            props.onUnblocked?.();
        };
        const onPortalMounted = () => {
            if (props.fullScreen) {
                blockBodyScroll();
                activeElement.current?.blur();
            }

            if (props.autoZIndex || $primereact.config.autoZIndex) {
                const key = props.fullScreen ? 'modal' : 'overlay';

                ZIndex.set(key, maskRef.current, props.baseZIndex || $primereact.config.zIndex[key]);
            }

            props.onBlocked?.();
        };

        // effects
        useMountEffect(() => {
            visible && block();
        });

        useUpdateEffect(() => {
            props.blocked ? block() : unblock();
        }, [props.blocked]);

        useUnmountEffect(() => {
            props.fullScreen && unblockBodyScroll();

            ZIndex.clear(maskRef.current);
        });

        return {
            state,
            // refs
            activeElement: toValue(activeElement),
            // element refs
            maskRef,
            // methods
            block,
            unblock,
            removeMask,
            onPortalMounted
        };
    },
    defaultProps,
    style
);
