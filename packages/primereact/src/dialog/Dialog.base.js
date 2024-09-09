import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/dialog';
import { defaultProps } from './Dialog.props';

export const useDialog = createSafeComponent(defaultProps, style);
