import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/password';
import { defaultProps } from './Password.props';

export const usePassword = createSafeComponent(defaultProps, style);
