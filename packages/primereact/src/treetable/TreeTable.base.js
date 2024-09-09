import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/treetable';
import { defaultProps } from './TreeTable.props';

export const useTreeTable = createSafeComponent(defaultProps, style);
