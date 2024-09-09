import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/inputtext';
import { defaultProps } from './InputText.props';

export const useInputText = createSafeComponent(defaultProps, style);
