import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/panel';
import { defaultProps } from './Panel.props';

export const usePanel = withComponent(
    ({ elementRef, id, props, parent, $primereact }) => {
        //@todo
    },
    defaultProps,
    style
);
