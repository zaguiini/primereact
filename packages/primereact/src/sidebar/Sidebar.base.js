import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/sidebar';
import { defaultProps } from './Sidebar.props';

export const useSidebar = createSafeComponent(defaultProps, style);
