import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/skeleton';
import { defaultProps } from './Skeleton.props';

export const useSkeleton = withComponent(
    ({ props }) => {
        // computed
        const containerStyle = props.size ? { width: props.size, height: props.size, borderRadius: props.borderRadius } : { width: props.width, height: props.height, borderRadius: props.borderRadius };

        return {
            // computed
            containerStyle
        };
    },
    defaultProps,
    style
);
