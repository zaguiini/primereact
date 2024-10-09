import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/accordion';
import { defaultProps } from './Accordion.props';

export const useAccordion = withComponent(
    ({ elementRef, id, props, parent, $primereact }) => {
        //@todo
    },
    defaultProps,
    style
);

export const useAccordionPanel = withComponent(({ elementRef, id, props, parent, $primereact }) => {
    //@todo
}, defaultProps);

export const useAccordionHeader = withComponent(({ elementRef, id, props, parent, $primereact }) => {
    //@todo
}, defaultProps);

export const useAccordionContent = withComponent(({ elementRef, id, props, parent, $primereact }) => {
    //@todo
}, defaultProps);
