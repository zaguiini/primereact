import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useInplace, useInplaceContent, useInplaceDisplay } from './Inplace.base';

export const Inplace = React.forwardRef((inProps, inRef) => {
    const inplace = useInplace(inProps, inRef);
    const {
        id,
        props,
        ptmi,
        // element refs
        elementRef
    } = inplace;

    const rootProps = mergeProps(
        {
            id,
            className: cx('root'),
            'aria-live': 'polite'
        },
        ptmi('root')
    );

    return (
        <ComponentProvider pIf={props.pIf} value={inplace}>
            <Component as={props.as || 'div'} {...rootProps} children={props.template || props.children} ref={elementRef} />
        </ComponentProvider>
    );
});

export const InplaceDisplay = (inProps) => {
    const inplaceDisplay = useInplaceDisplay(inProps);
    const {
        id,
        props,
        ptmi,
        parent,
        // element refs
        elementRef,
        // methods
        onClick,
        onKeyDown,
        // computed
        tabIndex,
        active
    } = inplaceDisplay;

    const rootProps = mergeProps(
        {
            id,
            className: parent.cx('display'),
            tabIndex,
            role: 'button',
            onClick,
            onKeyDown
        },
        parent.ptm('pcInplaceDisplay'),
        ptmi('root')
    );

    return (
        <ComponentProvider pIf={props.pIf} value={inplaceDisplay}>
            <Component pIf={active} as={props.as || 'div'} children={props.template || props.children} {...rootProps} ref={elementRef} />
        </ComponentProvider>
    );
};

export const InplaceContent = (inProps) => {
    const inplaceContent = useInplaceContent(inProps);
    const {
        id,
        props,
        ptmi,
        parent,
        // element refs
        elementRef,
        // computed
        active
    } = inplaceContent;

    const rootProps = mergeProps(
        {
            id,
            className: parent.cx('content')
        },
        parent.ptm('pcInplaceContent'),
        ptmi('root')
    );

    return (
        <ComponentProvider pIf={props.pIf} value={inplaceContent}>
            <Component pIf={active} as={props.as || 'div'} children={props.template || props.children} {...rootProps} ref={elementRef} />
        </ComponentProvider>
    );
};

Inplace.displayName = 'Inplace';

InplaceDisplay.displayName = 'InplaceDisplay';

InplaceContent.displayName = 'InplaceContent';
