import { PrimeReactContext } from '@primereact/core/config';
import { getScrollableParents, getTargetElement, isNotEmpty } from '@primeuix/utils';
import * as React from 'react';
import { usePrevious } from './usePrevious';
import { useUnmountEffect } from './useUnmountEffect';

export const useOverlayScrollListener = ({ target, listener, options, when = true }) => {
    const context = React.useContext(PrimeReactContext);
    const targetRef = React.useRef(null);
    const listenerRef = React.useRef(null);
    const scrollableParentsRef = React.useRef([]);
    let prevListener = usePrevious(listener);
    let prevOptions = usePrevious(options);

    const bind = (bindOptions = {}) => {
        if (isNotEmpty(bindOptions.target)) {
            unbind();
            (bindOptions.when || when) && (targetRef.current = getTargetElement(bindOptions.target));
        }

        if (!listenerRef.current && targetRef.current) {
            const hideOnScroll = context?.hideOverlaysOnDocumentScrolling;
            const nodes = (scrollableParentsRef.current = getScrollableParents(targetRef.current, hideOnScroll));

            listenerRef.current = (event) => listener && listener(event);
            nodes.forEach((node) => node.addEventListener('scroll', listenerRef.current, options));
        }
    };

    const unbind = () => {
        if (listenerRef.current) {
            const nodes = scrollableParentsRef.current;

            nodes.forEach((node) => node.removeEventListener('scroll', listenerRef.current, options));

            listenerRef.current = null;
        }
    };

    const dispose = () => {
        unbind();
        // #5927 prevent memory leak by releasing
        scrollableParentsRef.current = null;
        prevListener = null;
        prevOptions = null;
    };

    const updateTarget = React.useCallback(() => {
        if (when) {
            targetRef.current = getTargetElement(target);
        } else {
            unbind();
            targetRef.current = null;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target, when]);

    React.useEffect(() => {
        updateTarget();
    }, [updateTarget]);

    React.useEffect(() => {
        const listenerChanged = `${prevListener}` !== `${listener}`;
        const optionsChanged = prevOptions !== options;
        const listenerExists = listenerRef.current;

        if (listenerExists && (listenerChanged || optionsChanged)) {
            unbind();
            when && bind();
        } else if (!listenerExists) {
            dispose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listener, options, when]);

    useUnmountEffect(() => {
        dispose();
    });

    return [bind, unbind];
};
