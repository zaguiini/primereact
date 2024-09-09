import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/tristatecheckbox';
import { defaultProps } from './TriStateCheckbox.props';

export const useTriStateCheckbox = createSafeComponent(defaultProps, style);
