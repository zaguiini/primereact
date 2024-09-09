import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/inputtext';
import { defaultProps } from './OverlayPanel.props';

export const useOverlayPanel = createSafeComponent(defaultProps, style);
