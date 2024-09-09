import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/confirmpopup';
import { defaultProps } from './ConfirmPopup.props';

export const useConfirmPopup = createSafeComponent(defaultProps, style);
