import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/tieredmenu';
import { defaultProps } from './TieredMenu.props';

export const useTieredMenu = createSafeComponent(defaultProps, style);
