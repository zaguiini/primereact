import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/chips';
import { defaultProps } from './Chips.props';

export const useChips = createSafeComponent(defaultProps, style);
