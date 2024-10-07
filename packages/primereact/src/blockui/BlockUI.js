import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps, resolve } from '@primeuix/utils';
import { Portal } from 'primereact/portal';
import * as React from 'react';
import { useBlockUI } from './BlockUI.base';

export const BlockUI = React.forwardRef((inProps, inRef) => {
    const blockui = useBlockUI(inProps, inRef, state);
    const {
        id,
        props,
        state,
        ptm,
        ptmi,
        cx,
        // element refs
        elementRef,
        maskRef,
        // methods
        onPortalMounted
    } = blockui;

    const createMask = () => {
        const appendTo = props.fullScreen ? document.body : 'self';
        const content = resolve(props.template, blockui);

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

        return (
            <Portal pIf={state.visible} appendTo={appendTo} onMounted={onPortalMounted}>
                <div {...maskProps} ref={maskRef}>
                    {content}
                </div>
            </Portal>
        );
    };

    const mask = createMask();

    const rootProps = mergeProps(
        {
            id,
            className: cx('root'),
            'aria-busy': state.visible
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
