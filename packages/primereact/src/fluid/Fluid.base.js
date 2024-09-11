import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/fluid';
import { defaultProps } from './Fluid.props';

export const useFluid = createSafeComponent(defaultProps, style);
