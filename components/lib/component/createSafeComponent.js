import { useProps } from '../hooks/useProps';
import { globalProps } from './Component.props';
import { useComponent } from './useComponent';

export const createSafeComponent = (defaultProps, style) => {
    return (inProps, ref, state) => {
        const { props, attrs } = useProps(inProps, { ...globalProps, ...defaultProps });

        return useComponent({ props, attrs, state, style }, ref);
    };
};
