import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/scrolltop';
import { defaultProps } from './ScrollTop.props';

export const useScrollTop = createSafeComponent(defaultProps, style);
