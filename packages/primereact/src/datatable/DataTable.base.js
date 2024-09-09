import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/datatable';
import { defaultProps } from './DataTable.props';

export const useDataTable = createSafeComponent(defaultProps, style);
