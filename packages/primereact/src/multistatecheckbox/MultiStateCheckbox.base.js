import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/multistatecheckbox';
import { defaultProps } from './MultiStateCheckbox.props';

export const useMultiStateCheckbox = createSafeComponent(defaultProps, style);
