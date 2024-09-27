import { ComponentProvider } from '@primereact/core/component';
import { useMountEffect } from '@primereact/hooks';
import React from 'react';
import { DomHandler } from '../utils/Utils';
import { useFocusTrap } from './FocusTrap.base';

export const FocusTrap = React.memo(
    React.forwardRef((inProps, inRef) => {
        const targetRef = React.useRef(null);
        const firstFocusableElementRef = React.useRef(null);
        const lastFocusableElementRef = React.useRef(null);

        const focustrap = useFocusTrap(inProps, inRef);
        const {
            props,
            state,
            ptm,
            ptmi,
            cx,
            id,
            // element refs
            elementRef,
            focusInputRef,
            clearIconRef,
            // methods
            onFocus,
            onBlur,
            onKeyDown,
            onEditableInput,
            onContainerClick,
            onClearClick,
            // computed
            selectedOption,
            label: labelText,
            editableInputValue,
            focusedOptionId,
            isClearIconVisible,
            ptm,
            ptmi,
            cx,
            ref
        } = focustrap;

        React.useImperativeHandle(ref, () => ({
            props,
            getInk: () => firstFocusableElementRef.current,
            getTarget: () => targetRef.current
        }));

        useMountEffect(() => {
            if (!props.disabled) {
                targetRef.current = getTarget();
                setAutoFocus(targetRef.current, props);
            }
        });

        const getTarget = () => {
            return firstFocusableElementRef.current && firstFocusableElementRef.current.parentElement;
        };

        /**
         * This method sets the auto focus on the first focusable element within the target element.
         * It first tries to find a focusable element using the autoFocusSelector. If no such element is found,
         * it then tries to find a focusable element using the firstFocusableSelector.
         * If the autoFocus prop is set to true and a focusable element is found, it sets the focus on that element.
         *
         * @param {HTMLElement} target - The target element within which to find a focusable element.
         */
        const setAutoFocus = (target) => {
            const { autoFocusSelector = '', firstFocusableSelector = '', autoFocus = false } = props || {};
            const defaultAutoFocusSelector = `${getComputedSelector(autoFocusSelector)}`;
            const computedAutoFocusSelector = `[autofocus]${defaultAutoFocusSelector}, [data-pc-autofocus='true']${defaultAutoFocusSelector}`;

            let focusableElement = DomHandler.getFirstFocusableElement(target, computedAutoFocusSelector);

            autoFocus && !focusableElement && (focusableElement = DomHandler.getFirstFocusableElement(target, getComputedSelector(firstFocusableSelector)));

            DomHandler.focus(focusableElement);
        };

        const getComputedSelector = (selector) => {
            return `:not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])${selector ?? ''}`;
        };

        const onFirstHiddenElementFocus = (event) => {
            const { currentTarget, relatedTarget } = event;

            const focusableElement =
                relatedTarget === currentTarget.$_pfocustrap_lasthiddenfocusableelement || !targetRef.current?.contains(relatedTarget)
                    ? DomHandler.getFirstFocusableElement(currentTarget.parentElement, getComputedSelector(currentTarget.$_pfocustrap_focusableselector))
                    : currentTarget.$_pfocustrap_lasthiddenfocusableelement;

            DomHandler.focus(focusableElement);
        };

        const onLastHiddenElementFocus = (event) => {
            const { currentTarget, relatedTarget } = event;

            const focusableElement =
                relatedTarget === currentTarget.$_pfocustrap_firsthiddenfocusableelement || !targetRef.current?.contains(relatedTarget)
                    ? DomHandler.getLastFocusableElement(currentTarget.parentElement, getComputedSelector(currentTarget.$_pfocustrap_focusableselector))
                    : currentTarget.$_pfocustrap_firsthiddenfocusableelement;

            DomHandler.focus(focusableElement);
        };

        const createHiddenFocusableElements = () => {
            const { tabIndex = 0 } = props || {};

            const createFocusableElement = (onFocus, section) => {
                return (
                    <span
                        ref={section === 'firstfocusableelement' ? firstFocusableElementRef : lastFocusableElementRef}
                        className={'p-hidden-accessible p-hidden-focusable'}
                        tabIndex={tabIndex}
                        role={'presentation'}
                        aria-hidden={true}
                        data-p-hidden-accessible={true}
                        data-p-hidden-focusable={true}
                        onFocus={onFocus}
                        data-pc-section={section}
                    />
                );
            };

            const firstFocusableElement = createFocusableElement(onFirstHiddenElementFocus, 'firstfocusableelement');
            const lastFocusableElement = createFocusableElement(onLastHiddenElementFocus, 'lastfocusableelement');

            if (firstFocusableElement.ref.current && lastFocusableElement.ref.current) {
                firstFocusableElement.ref.current.$_pfocustrap_lasthiddenfocusableelement = lastFocusableElement.ref.current;
                lastFocusableElement.ref.current.$_pfocustrap_firsthiddenfocusableelement = firstFocusableElement.ref.current;
            }

            return (
                <ComponentProvider pIf={props.pIf} value={focustrap}>
                    {firstFocusableElement}
                    {props.children}
                    {lastFocusableElement}
                </ComponentProvider>
            );
        };

        return createHiddenFocusableElements();
    })
);

export default FocusTrap;
