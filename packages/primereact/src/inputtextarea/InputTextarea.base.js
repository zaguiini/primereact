import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/inputtextarea';
import { defaultProps } from './InputTextarea.props';

export const useInputTextarea = createSafeComponent(defaultProps, style);
