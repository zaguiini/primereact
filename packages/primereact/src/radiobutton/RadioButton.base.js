import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/radiobutton';
import { defaultProps } from './RadioButton.props';

export const useRadioButton = createSafeComponent(defaultProps, style);
