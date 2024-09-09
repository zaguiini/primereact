import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/chip';
import { defaultProps } from './Chip.props';

export const useChip = createSafeComponent(defaultProps, style);
