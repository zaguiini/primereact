'use client';
import { PrimeReactContext } from '@primereact/core/config';
import { removeStyleTag } from '@primeuix/utils';
import { useContext, useEffect, useRef, useState } from 'react';
import { addNonce } from '../utils';

let _id = 0;

export const useStyle = (css, options = {}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const styleRef = useRef(null);
    const context = useContext(PrimeReactContext);

    const defaultDocument = DomHandler.isClient() ? window.document : undefined;
    const { document = defaultDocument, manual = false, name = `style_${++_id}`, id = undefined, media = undefined } = options;

    const getCurrentStyleRef = (styleContainer) => {
        const existingStyle = styleContainer.querySelector(`style[data-primereact-style-id="${name}"]`);

        if (existingStyle) {
            return existingStyle;
        }

        if (id !== undefined) {
            const existingElement = document.getElementById(id);

            if (existingElement) {
                return existingElement;
            }
        }

        // finally if not found create the new style
        return document.createElement('style');
    };

    const update = (newCSS) => {
        isLoaded && css !== newCSS && (styleRef.current.textContent = newCSS);
    };

    const load = (_css, options) => {
        if (!document || isLoaded) {
            return;
        }

        const styleContainer = context?.styleContainer || document.head;

        styleRef.current = getCurrentStyleRef(styleContainer);

        if (!styleRef.current.isConnected) {
            styleRef.current.type = 'text/css';

            if (id) {
                styleRef.current.id = id;
            }

            if (media) {
                styleRef.current.media = media;
            }

            addNonce(styleRef.current, context?.nonce);
            styleContainer.appendChild(styleRef.current);

            if (name) {
                styleRef.current.setAttribute('data-primereact-style-id', options?.name || name);
            }
        }

        styleRef.current.textContent = _css || css;

        //setIsLoaded(true);
    };

    const unload = () => {
        if (!document || !styleRef.current) {
            return;
        }

        removeStyleTag(styleRef.current);
        setIsLoaded(false);
    };

    useEffect(() => {
        if (!manual) {
            load();
        }

        // return () => {if (!manual) unload()}; /* @todo */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [manual]);

    return {
        id,
        name,
        update,
        unload,
        load,
        isLoaded
    };
};
