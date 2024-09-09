import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/menu';
import { defaultProps } from './Menu.props';

export const useMenu = createSafeComponent(defaultProps, style);
