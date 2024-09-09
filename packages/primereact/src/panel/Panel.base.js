import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/panel';
import { defaultProps } from './Panel.props';

export const usePanel = createSafeComponent(defaultProps, style);
