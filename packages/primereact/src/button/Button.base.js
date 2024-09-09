import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/button';
import { defaultProps } from './Button.props';

export const useButton = createSafeComponent(defaultProps, style);
