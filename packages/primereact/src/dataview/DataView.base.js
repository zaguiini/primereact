import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/dataview';
import { defaultProps } from './DataView.props';

export const useDataView = createSafeComponent(defaultProps, style);
