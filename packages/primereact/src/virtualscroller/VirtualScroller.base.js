import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/virtualscroller';
import { defaultProps } from './VirtualScroller.props';

export const useVirtualScroller = createSafeComponent(defaultProps, style);
