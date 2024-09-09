import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/checkbox';
import { defaultProps } from './Checkbox.props';

export const useCheckbox = createSafeComponent(defaultProps, style);
