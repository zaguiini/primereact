import { useProps } from '../hooks/useProps';
import { globalProps } from './Component.props';

export const withComponent = (callback, defaultProps) => {
    return (inProps, ref) => {
        const { props, attrs } = useProps(inProps, { ...globalProps, ...defaultProps });

        return callback(props, attrs, ref);
    };
};
