import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/toggleswitch';
import { defaultProps } from './ToggleSwitch.props';

export const useToggleSwitch = createSafeComponent(defaultProps, style);
