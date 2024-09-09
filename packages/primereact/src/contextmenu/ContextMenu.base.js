import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/contextmenu';
import { defaultProps } from './ContextMenu.props';

export const useContextMenu = createSafeComponent(defaultProps, style);
