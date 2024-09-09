import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/tabview';
import { defaultProps } from './TabView.props';

export const useTabView = createSafeComponent(defaultProps, style);
