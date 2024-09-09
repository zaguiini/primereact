import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/accordion';
import { defaultProps } from './Accordion.props';

export const useAccordion = createSafeComponent(defaultProps, style);
