import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/inputotp';
import { defaultProps } from './InputOtp.props';

export const useInputOtp = createSafeComponent(defaultProps, style);
