import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/columngroup';
import { defaultProps } from './ColumnGroup.props';

export const useColumnGroup = createSafeComponent(defaultProps, style);
