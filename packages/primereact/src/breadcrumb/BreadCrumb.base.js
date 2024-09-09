import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/breadcrumb';
import { defaultProps } from './BreadCrumb.props';

export const useBreadCrumb = createSafeComponent(defaultProps, style);
