import { resolve } from '@primeuix/utils';
import * as React from 'react';
import { ComponentContext } from './Component.context';

// @todo: add omit(inProps, ['pIf']);
export const Component = React.forwardRef((inProps, ref) => {
    const context = React.useContext(ComponentContext);

    if (inProps.pIf === false) return null;

    const { as, asChild, pIf, instance = context, children, options, ...rest } = inProps || {};
    const asComponent = asChild ? React.Fragment : as;

    return asComponent ? React.createElement(asComponent, { ref, ...rest }, resolve(children, { ...rest, ...options }, instance)) : null; // @todo: check params
});

/* @todo: Remove
export const Slot = React.forwardRef((inProps, ref) => {
    const context = React.useContext(ComponentContext);

    if (inProps.pIf === false) return null;

    const { name, pIf, instance = context, children, render, ...rest } = inProps || {};
    const content = resolve(instance?.$slots?.[name] || instance?.props?.[name], { instance, default: children, ...rest });

    //return resolve(instance?.$slots?.[name] || instance?.props?.[name], { instance, default: children, ...rest }) ?? children;
    return resolve(render, { instance, content, default: children, ...rest }) ?? content ?? children;
});

export const Template = React.forwardRef((inProps, ref) => {
    const context = React.useContext(ComponentContext) || {};

    if (inProps.pIf === false) return null;

    const { slot, pFor, instance = context || {}, children } = inProps || {};

    if (slot) {
        instance.$slots ||= {};
        instance.$slots[slot] = children;

        return null;
    }

    return isArray(pFor) ? pFor.map((value, index) => resolve(children, { value, index })) : isObject(pFor) ? Object.entries(pFor).map(([key, value], index) => resolve(children, { key, value, index })) : resolve(children, { instance });
});*/
