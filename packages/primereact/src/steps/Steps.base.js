import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/steps';
import { defaultProps } from './Steps.props';

export const useSteps = createSafeComponent(defaultProps, style);
