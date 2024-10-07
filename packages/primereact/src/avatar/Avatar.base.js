import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/avatar';
import * as React from 'react';
import { defaultProps } from './Avatar.props';

export const useAvatar = withComponent(
    ({ props }) => {
        // states
        const [imageFailed, setImageFailed] = React.useState(false);
        const state = {
            imageFailed
        };

        // methods
        const onImageError = (event) => {
            if (props.imageFallback === 'default') {
                if (!props.onImageError) {
                    // fallback to label or icon
                    setImageFailed(true);
                    event.target.src = null;
                }
            } else {
                // try fallback as an image
                event.target.src = props.imageFallback;
            }

            props.onImageError?.(event);
        };

        return {
            state,
            // methods
            onImageError
        };
    },
    defaultProps,
    style
);
