import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/row';
import { defaultProps } from './Row.props';

export const useRow = createSafeComponent(defaultProps, style);
