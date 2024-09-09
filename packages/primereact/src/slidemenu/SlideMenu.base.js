import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/slidemenu';
import { defaultProps } from './SlideMenu.props';

export const useSlideMenu = createSafeComponent(defaultProps, style);
