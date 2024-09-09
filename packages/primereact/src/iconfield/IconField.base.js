import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/iconfield';
import { defaultProps } from './IconField.props';

export const useIconField = createSafeComponent(defaultProps, style);
