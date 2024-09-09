import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/toolbar';
import { defaultProps } from './Toolbar.props';

export const useToolbar = createSafeComponent(defaultProps, style);
