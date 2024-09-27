export * from './createSafeComponent';
export * from './createSafeContext';

// @todo: move to utils (maybe: @primeuix/utils)
export const combinedRefs = (innerRef, forwardRef) => {
    if (innerRef && forwardRef) {
        if (typeof forwardRef === 'function') {
            forwardRef(innerRef.current);
        } else {
            forwardRef.current = innerRef.current;
        }
    }
};
