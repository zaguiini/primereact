import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/splitter';
import { defaultPanelProps, defaultProps } from './Splitter.props';

export const useSplitter = withComponent(
    ({ elementRef, id, props, parent, $primereact }) => {
        //@todo
    },
    defaultProps,
    style
);

export const useSplitterPanel = withComponent(({ elementRef, id, props, parent, $primereact }) => {
    //@todo
}, defaultPanelProps);
