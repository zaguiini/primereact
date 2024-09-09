import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/slider';
import { defaultProps } from './Slider.props';

export const useSlider = createSafeComponent(defaultProps, style);
