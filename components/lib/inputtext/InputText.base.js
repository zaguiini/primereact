import { createSafeComponent } from '../component/createSafeComponent';
import { defaultProps } from './InputText.props';
import { style } from './InputText.style';

export const useInputText = createSafeComponent(defaultProps, style);
