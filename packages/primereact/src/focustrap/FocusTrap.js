import { ComponentProvider } from '@primereact/core/component';
import { mergeProps, resolve } from '@primeuix/utils';
import React from 'react';
import { useFocusTrap } from './FocusTrap.base';

export const FocusTrap = React.memo(
    React.forwardRef((inProps, inRef) => {
        const focustrap = useFocusTrap(inProps, inRef);
        const {
            props,
            ptm,
            // element refs
            firstFocusableElementRef,
            lastFocusableElementRef,
            // methods
            onFirstHiddenElementFocus,
            onLastHiddenElementFocus
        } = focustrap;

        const createFocusableElement = (hiddenRef, key, onFocus) => {
            const hiddenProps = mergeProps(
                {
                    className: 'p-hidden-accessible p-hidden-focusable',
                    tabIndex: props.tabIndex,
                    role: 'presentation',
                    'aria-hidden': true,
                    'data-p-hidden-accessible': true,
                    'data-p-hidden-focusable': true,
                    onFocus
                },
                ptm(key)
            );

            return <span {...hiddenProps} ref={hiddenRef} />;
        };

        const firstFocusableElement = createFocusableElement(firstFocusableElementRef, 'firstFocusableElement', onFirstHiddenElementFocus);
        const lastFocusableElement = createFocusableElement(lastFocusableElementRef, 'lastFocusableElement', onLastHiddenElementFocus);

        if (firstFocusableElementRef.current && lastFocusableElementRef.current) {
            firstFocusableElementRef.current.$_pfocustrap_lasthiddenfocusableelement = lastFocusableElementRef.current;
            lastFocusableElementRef.current.$_pfocustrap_firsthiddenfocusableelement = firstFocusableElementRef.current;
        }

        const content = resolve(props.template || props.children, focustrap);

        return (
            <ComponentProvider pIf={props.pIf} value={focustrap}>
                {firstFocusableElement}
                {content}
                {lastFocusableElement}
            </ComponentProvider>
        );
    })
);

FocusTrap.displayName = 'FocusTrap';
