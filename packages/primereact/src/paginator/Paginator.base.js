import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/paginator';
import { defaultProps } from './Paginator.props';

export const usePaginator = createSafeComponent(defaultProps, style);
