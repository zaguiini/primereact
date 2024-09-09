import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/tabmenu';
import { defaultProps } from './TabMenu.props';

export const useTabMenu = createSafeComponent(defaultProps, style);
