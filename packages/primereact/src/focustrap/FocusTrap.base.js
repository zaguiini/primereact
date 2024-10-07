import { withComponent } from '@primereact/core/component';
import { useEventListener, useMountEffect } from '@primereact/hooks';
import { style } from '@primereact/styles/focustrap';
import { getFirstFocusableElement, getLastFocusableElement, isFocusableElement, isNotEmpty } from '@primeuix/utils';
import { toValue } from 'primereact/utils';
import * as React from 'react';
import { defaultProps } from './FocusTrap.props';

export const useFocusTrap = withComponent(
    ({ elementRef, props }) => {
        // refs
        const mutationObserver = React.useRef(null);

        // element refs
        const firstFocusableElementRef = React.useRef(null);
        const lastFocusableElementRef = React.useRef(null);

        // bindings
        const [bindFocusInListener, unbindFocusInListener] = useEventListener({
            target: elementRef,
            type: 'focusin',
            listener: props.onFocusIn,
            when: !props.disabled
        });

        const [bindFocusOutListener, unbindFocusOutListener] = useEventListener({
            target: elementRef,
            type: 'focusout',
            listener: props.onFocusOut,
            when: !props.disabled
        });

        // methods
        const getComputedSelector = (selector) => {
            return `:not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])${selector ?? ''}`;
        };
        const bind = () => {
            mutationObserver.current = new MutationObserver((mutationList) => {
                mutationList.forEach((mutation) => {
                    if (mutation.type === 'childList' && !elementRef.current.contains(document.activeElement)) {
                        const findNextFocusableElement = (_el) => {
                            const focusableElement = isFocusableElement(_el)
                                ? isFocusableElement(_el, getComputedSelector(_el.$_pfocustrap_focusableselector))
                                    ? _el
                                    : getFirstFocusableElement(elementRef.current, getComputedSelector(_el.$_pfocustrap_focusableselector))
                                : getFirstFocusableElement(_el);

                            return isNotEmpty(focusableElement) ? focusableElement : _el.nextSibling && findNextFocusableElement(_el.nextSibling);
                        };

                        focus(findNextFocusableElement(mutation.nextSibling));
                    }
                });
            });

            mutationObserver.current.disconnect();
            mutationObserver.current.observe(elementRef.current, {
                childList: true
            });

            bindFocusInListener();
            bindFocusOutListener();
        };
        const unbind = () => {
            mutationObserver.current?.disconnect();
            unbindFocusInListener();
            unbindFocusOutListener();
        };
        const autoFocus = (inProps) => {
            autoElementFocus(elementRef.current, { ...inProps, autoFocus: true });
        };
        const autoElementFocus = (inProps) => {
            const { autoFocusSelector = '', firstFocusableSelector = '', autoFocus = false } = inProps || {};
            const selector = getComputedSelector(autoFocusSelector);
            let focusableElement = getFirstFocusableElement(elementRef.current, `[autofocus]${selector}, [data-p-autofocus="true"]${selector}`);

            autoFocus && !focusableElement && (focusableElement = getFirstFocusableElement(elementRef.current, getComputedSelector(firstFocusableSelector)));
            focus(focusableElement);
        };
        const onFirstHiddenElementFocus = (event) => {
            const { currentTarget, relatedTarget } = event;
            const focusableElement =
                relatedTarget === currentTarget.$_pfocustrap_lasthiddenfocusableelement || !elementRef.current?.contains(relatedTarget)
                    ? getFirstFocusableElement(currentTarget.parentElement, getComputedSelector(currentTarget.$_pfocustrap_focusableselector))
                    : currentTarget.$_pfocustrap_lasthiddenfocusableelement;

            focus(focusableElement);
        };
        const onLastHiddenElementFocus = (event) => {
            const { currentTarget, relatedTarget } = event;
            const focusableElement =
                relatedTarget === currentTarget.$_pfocustrap_firsthiddenfocusableelement || !elementRef.current?.contains(relatedTarget)
                    ? getLastFocusableElement(currentTarget.parentElement, getComputedSelector(currentTarget.$_pfocustrap_focusableselector))
                    : currentTarget.$_pfocustrap_firsthiddenfocusableelement;

            focus(focusableElement);
        };

        // effects
        useMountEffect(() => {
            if (!props.disabled) {
                elementRef.current = firstFocusableElementRef.current?.parentElement;
                autoElementFocus(props);
            }
        });

        React.useEffect(() => {
            elementRef.current = firstFocusableElementRef.current?.parentElement;

            props.disabled ? unbind() : bind();

            return () => unbind();
        }, [props.disabled]);

        return {
            // refs
            mutationObserver: toValue(mutationObserver),
            // element refs
            firstFocusableElementRef,
            lastFocusableElementRef,
            // methods
            autoFocus,
            autoElementFocus,
            onFirstHiddenElementFocus,
            onLastHiddenElementFocus
        };
    },
    defaultProps,
    style
);
