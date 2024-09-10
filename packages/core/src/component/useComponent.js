import * as React from 'react';
import { useComponentPT } from './useComponentPT';
import { useComponentStyle } from './useComponentStyle';

export const useComponent = ({ props, attrs, state, style }, inRef) => {
    const ref = React.useRef(inRef); // @todo
    const ptx = useComponentPT({ props, attrs, state }, ref);
    const stx = useComponentStyle({ props, attrs, state, style }, ref);
    const instance = {
        ref,
        name: props.__TYPE,
        props,
        attrs,
        state,
        style,
        parent: {}, // @todo
        ...ptx,
        ...stx
    };

    // @todo: refactor for styleclass
    /*React.useImperativeHandle(ref, () => ({
        instance,
        getElement: () => ref.current
    }));*/

    React.useEffect(() => {
        // @todo: move to utils (maybe: @primeuix/utils)
        const combinedRefs = (innerRef, forwardRef) => {
            if (innerRef && forwardRef) {
                if (typeof forwardRef === 'function') {
                    forwardRef(innerRef.current);
                } else {
                    forwardRef.current = innerRef.current;
                }
            }
        };

        combinedRefs(ref, inRef);
    }, [ref, inRef]);

    return instance;
};
