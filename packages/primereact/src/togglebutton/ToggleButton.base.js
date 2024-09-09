import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/togglebutton';
import { defaultProps } from './ToggleButton.props';

export const useToggleButton = createSafeComponent(defaultProps, style);
