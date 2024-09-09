import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/ripple';
import { defaultProps } from './Ripple.props';

export const useRipple = createSafeComponent(defaultProps, style);
