import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/datascroller';
import { defaultProps } from './DataScroller.props';

export const useDataScroller = createSafeComponent(defaultProps, style);
