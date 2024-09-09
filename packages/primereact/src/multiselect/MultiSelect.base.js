import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/multiselect';
import { defaultProps } from './MultiSelect.props';

export const useMultiSelect = createSafeComponent(defaultProps, style);
