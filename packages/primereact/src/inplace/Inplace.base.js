import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/inplace';
import { contentDefaultProps, defaultProps, displayDefaultProps } from './Inplace.props';

export const useInplace = withComponent(
    ({ elementRef, id, props, parent, $primereact }) => {
        //@todo
    },
    defaultProps,
    style
);

export const useInplaceDisplay = withComponent(({ elementRef, id, props, parent, $primereact }) => {
    //@todo
}, displayDefaultProps);

export const useInplaceContent = withComponent(({ elementRef, id, props, parent, $primereact }) => {
    //@todo
}, contentDefaultProps);
