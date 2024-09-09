import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/confirmdialog';
import { defaultProps } from './ConfirmDialog.props';

export const useConfirmDialog = createSafeComponent(defaultProps, style);
