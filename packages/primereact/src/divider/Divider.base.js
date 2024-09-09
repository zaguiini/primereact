import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/divider';
import { defaultProps } from './Divider.props';

export const useDivider = createSafeComponent(defaultProps, style);
