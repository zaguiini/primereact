import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/megamenu';
import { defaultProps } from './MegaMenu.props';

export const useMegaMenu = createSafeComponent(defaultProps, style);
