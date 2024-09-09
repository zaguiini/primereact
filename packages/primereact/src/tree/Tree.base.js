import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/tree';
import { defaultProps } from './Tree.props';

export const useTree = createSafeComponent(defaultProps, style);
