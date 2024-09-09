import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/panelmenu';
import { defaultProps } from './PanelMenu.props';

export const usePanelMenu = createSafeComponent(defaultProps, style);
