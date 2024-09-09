import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/scrollpanel';
import { defaultProps } from './ScrollPanel.props';

export const useSrollPanel = createSafeComponent(defaultProps, style);
