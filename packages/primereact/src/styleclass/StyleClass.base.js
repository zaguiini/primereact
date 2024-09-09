import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/styleclass';
import { defaultProps } from './StyleClass.props';

export const useStyleClass = createSafeComponent(defaultProps, style);
