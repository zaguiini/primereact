import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/toast';
import { defaultProps } from './Toast.props';

export const useToast = createSafeComponent(defaultProps, style);
