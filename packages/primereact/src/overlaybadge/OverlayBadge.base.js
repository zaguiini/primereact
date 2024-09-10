import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/overlaybadge';
import { defaultProps } from './OverlayBadge.props';

export const useOverlayBadge = createSafeComponent(defaultProps, style);
