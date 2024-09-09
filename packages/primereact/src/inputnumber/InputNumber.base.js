import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/inputnumber';
import { defaultProps } from './InputNumber.props';

export const useInputNumber = createSafeComponent(defaultProps, style);
