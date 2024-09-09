import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/progressspinner';
import { defaultProps } from './ProgressSpinner.props';

export const useProgressSpinner = createSafeComponent(defaultProps, style);
