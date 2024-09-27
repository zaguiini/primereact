import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/styleclass';
import { defaultProps } from './StyleClass.props';

export const useStyleClass = withComponent(
    ({ elementRef, id, props, parent, $primereact }) => {
        //@todo
    },
    defaultProps,
    style
);
