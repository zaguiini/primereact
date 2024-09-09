import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/buttongroup';
import { defaultProps } from './ButtonGroup.props';

export const useButtonGroup = createSafeComponent(defaultProps, style);
