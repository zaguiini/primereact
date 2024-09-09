import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/colorpicker';
import { defaultProps } from './ColorPicker.props';

export const useColorPicker = createSafeComponent(defaultProps, style);
