import { Component, ComponentProvider } from '@primereact/core/component';
import { resolve } from '@primeuix/utils';
import * as React from 'react';
import { useDeferredContent } from './DeferredContent.base';

export const DeferredContent = React.forwardRef((inProps, inRef) => {
    const deferredcontent = useDeferredContent(inProps, inRef);
    const {
        id,
        props,
        state,
        ptmi,
        // element refs
        elementRef
    } = deferredcontent;

    const content = state.loaded && resolve(props.template || props.children, deferredcontent);

    const rootProps = mergeProps(
        {
            id
        },
        ptmi('root')
    );

    return (
        <ComponentProvider pIf={props.pIf} value={deferredcontent}>
            <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                {content}
            </Component>
        </ComponentProvider>
    );
});

DeferredContent.displayName = 'DeferredContent';
