import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/menubar';
import { defaultProps } from './Menubar.props';

export const useMenubar = createSafeComponent(defaultProps, style);
