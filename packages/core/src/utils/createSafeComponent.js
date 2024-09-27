import { globalProps, useComponent } from '@primereact/core/component';
import { useProps } from '@primereact/hooks';
// @todo - remove
export const createSafeComponent = (defaultProps, style) => {
    return (inProps, ref, state = {}) => {
        const { props, attrs } = useProps(inProps, { ...globalProps, ...defaultProps });

        return useComponent({ props, attrs, state, style }, ref);
    };
};
