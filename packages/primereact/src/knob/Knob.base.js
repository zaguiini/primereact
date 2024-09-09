import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/knob';
import { defaultProps } from './Knob.props';

export const useKnob = createSafeComponent(defaultProps, style);
