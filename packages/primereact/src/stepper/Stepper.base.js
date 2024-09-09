import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/stepper';
import { defaultProps } from './Stepper.props';

export const useStepper = createSafeComponent(defaultProps, style);
