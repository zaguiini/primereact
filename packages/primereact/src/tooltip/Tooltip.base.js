import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/tooltip';
import { defaultProps } from './Tooltip.props';

export const useTooltip = createSafeComponent(defaultProps, style);
