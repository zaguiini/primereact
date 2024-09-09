import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/treeselect';
import { defaultProps } from './TreeSelect.props';

export const useTreeSelect = createSafeComponent(defaultProps, style);
