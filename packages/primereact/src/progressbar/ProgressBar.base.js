import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/progressbar';
import { defaultProps } from './ProgressBar.props';

export const useProgressBar = createSafeComponent(defaultProps, style);
