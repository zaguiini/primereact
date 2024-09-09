import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/cascadeselect';
import { defaultProps } from './CascadeSelect.props';

export const useCascadeSelect = createSafeComponent(defaultProps, style);
