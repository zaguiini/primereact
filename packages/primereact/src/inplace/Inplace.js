import { Component, ComponentProvider } from '@primereact/core/component';
import { useUpdateEffect } from '@primereact/hooks';
import { classNames, mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useInplace, useInplaceContent, useInplaceDisplay } from './Inplace.base';

export const InplaceDisplay = (inProps) => {
    const inplaceDisplay = useInplaceDisplay(inProps);
    const { props, ptmi, parent } = inplaceDisplay;

    const onKeyDown = (event) => {
        if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space') {
            open(event);
            event.preventDefault();
        }
    };

    const rootProps = mergeProps(
        {
            className: parent.cx('display'),
            tabIndex: props.tabIndex || '0',
            role: 'button',
            'aria-label': props.ariaLabel,
            onClick: parent?.ref?.current?.open,
            onKeyDown
        },
        parent.ptm('display'),
        ptmi('root')
    );

    return (
        <ComponentProvider pIf={props.pIf} value={inplaceDisplay}>
            <Component pIf={!parent?.state?.active} as="div" children={props.children} {...rootProps} />
        </ComponentProvider>
    );
};

export const InplaceContent = (inProps) => {
    const inplaceContent = useInplaceContent(inProps);
    const { props, ptmi, parent } = inplaceContent;

    const rootProps = mergeProps(
        {
            className: parent.cx('content')
        },
        parent.ptm('content'),
        ptmi('root')
    );

    return (
        <ComponentProvider pIf={props.pIf} value={inplaceContent}>
            <Component pIf={!!parent?.state?.active} as="div" children={props.children} options={{ close: parent?.ref?.current?.close }} {...rootProps} />
        </ComponentProvider>
    );
};

export const Inplace = React.forwardRef((inProps, inRef) => {
    const [activeState, setActiveState] = React.useState(inProps.active);
    const active = inProps.onToggle ? inProps.active : activeState;
    const state = {
        active
    };

    const inplace = useInplace(inProps, inRef, state);
    const { props, ptmi, cx, ref } = inplace;

    const open = (event) => {
        if (props.disabled) {
            return;
        }

        props.onOpen && props.onOpen(event);

        if (props.onToggle) {
            props.onToggle({
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

        props.onClose && props.onClose(event);

        if (props.onToggle) {
            props.onToggle({
                originalEvent: event,
                value: false
            });
        } else {
            setActiveState(false);
        }
    };

    React.useImperativeHandle(ref, () => ({
        open,
        close
    }));

    useUpdateEffect(() => {
        props.active ? open(null) : close(null);
    }, [props.active]);

    const rootProps = mergeProps(
        {
            ref,
            className: classNames(cx('root'), props.className),
            'aria-live': 'polite'
        },
        ptmi('root')
    );

    return (
        <ComponentProvider pIf={props.pIf} value={inplace}>
            <div {...rootProps}>{props.children}</div>
        </ComponentProvider>
    );
});

InplaceDisplay.displayName = 'InplaceDisplay';

InplaceContent.displayName = 'InplaceContent';

Inplace.displayName = 'Inplace';
