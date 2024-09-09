import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/badge';
import { defaultProps } from './Badge.props';

export const useBadge = createSafeComponent(defaultProps, style);
