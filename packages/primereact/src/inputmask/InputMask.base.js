import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/inputmask';
import { defaultProps } from './InputMask.props';

export const useInputMask = createSafeComponent(defaultProps, style);
