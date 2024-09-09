import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/splitbutton';
import { defaultProps } from './SplitButton.props';

export const useSplitButton = createSafeComponent(defaultProps, style);
