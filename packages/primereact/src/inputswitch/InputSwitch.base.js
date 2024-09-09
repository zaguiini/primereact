import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/inputswitch';
import { defaultProps } from './InputSwitch.props';

export const useInputSwitch = createSafeComponent(defaultProps, style);
