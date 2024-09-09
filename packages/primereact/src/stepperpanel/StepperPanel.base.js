import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/stepperpanel';
import { defaultProps } from './StepperPanel.props';

export const useStepperPanel = createSafeComponent(defaultProps, style);
