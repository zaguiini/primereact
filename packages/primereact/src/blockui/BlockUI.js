import { Component, ComponentProvider } from '@primereact/core/component';
import { PrimeReactContext } from '@primereact/core/config';
import { useMountEffect, useUnmountEffect, useUpdateEffect } from '@primereact/hooks';
import { addClass, blockBodyScroll, classNames, hasCSSAnimation, mergeProps, resolve, unblockBodyScroll, ZIndex } from '@primeuix/utils';
import { Portal } from 'primereact/portal';
import * as React from 'react';

import { useBlockUI } from './BlockUI.base';

export const BlockUI = React.forwardRef((inProps, inRef) => {
    const config = React.useContext(PrimeReactContext);
    const [visibleState, setVisibleState] = React.useState(inProps.blocked);
    const state = {
        visible: visibleState
    };

    const blockui = useBlockUI(inProps, inRef, state);
    const { props, ptm, ptmi, cx, ref, isUnstyled } = blockui;

    const elementRef = React.useRef(null);
    const maskRef = React.useRef(null);
    const activeElementRef = React.useRef(null);

    const block = () => {
        setVisibleState(true);
        activeElementRef.current = document.activeElement;
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
        setVisibleState(false);

        if (props.fullScreen) {
            unblockBodyScroll();
            activeElementRef.current && activeElementRef.current.focus();
        }

        props.onUnblocked && props.onUnblocked();
    };

    const onPortalMounted = () => {
        if (props.fullScreen) {
            blockBodyScroll();
            activeElementRef.current && activeElementRef.current.blur();
        }

        if (props.autoZIndex) {
            const key = props.fullScreen ? 'modal' : 'overlay';

            ZIndex.set(key, maskRef.current, config.autoZIndex, props.baseZIndex || config.zIndex[key]);
        }

        props.onBlocked && props.onBlocked();
    };

    useMountEffect(() => {
        visibleState && block();
    });

    useUpdateEffect(() => {
        props.blocked ? block() : unblock();
    }, [props.blocked]);

    useUnmountEffect(() => {
        props.fullScreen && unblockBodyScroll();

        ZIndex.clear(maskRef.current);
    });

    React.useImperativeHandle(ref, () => ({
        props,
        block,
        unblock,
        getElement: () => elementRef.current
    }));

    const createMask = () => {
        if (visibleState) {
            const appendTo = props.fullScreen ? document.body : 'self';
            const maskProps = mergeProps(
                {
                    className: cx('mask'),
                    style: {
                        position: props.fullScreen ? 'fixed' : 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%'
                    }
                },
                ptm('mask')
            );
            const content = props.template ? resolve(props.template, props) : null;
            const mask = (
                <div ref={maskRef} {...maskProps}>
                    {content}
                </div>
            );

            return <Portal element={mask} appendTo={appendTo} onMounted={onPortalMounted} />;
        }

        return null;
    };

    const mask = createMask();

    const rootProps = mergeProps(
        {
            id: props.id,
            ref: elementRef,
            style: props.style,
            className: classNames(cx('root'), props.className),
            'aria-busy': visibleState
        },
        ptmi('root')
    );

    return (
        <ComponentProvider pIf={props.pIf} value={blockui}>
            <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                {props.children}
                {mask}
            </Component>
        </ComponentProvider>
    );
});

BlockUI.displayName = 'BlockUI';
