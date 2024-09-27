import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/editor';
import { defaultProps } from './Editor.props';

export const useEditor = withComponent(
    ({ elementRef, id, props, parent, $primereact }) => {
        //@todo
    },
    defaultProps,
    style
);
