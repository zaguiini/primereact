import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/focustrap';
import { defaultProps } from './FocusTrap.props';

export const useFocusTrap = createSafeComponent(defaultProps, style);
