import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/dropdown';
import { defaultProps } from './Dropdown.props';

export const useDropdown = createSafeComponent(defaultProps, style);
