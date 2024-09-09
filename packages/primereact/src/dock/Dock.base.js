import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/dock';
import { defaultProps } from './Dock.props';

export const useDock = createSafeComponent(defaultProps, style);
