import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/column';
import { defaultProps } from './Column.props';

export const useColumn = createSafeComponent(defaultProps, style);
