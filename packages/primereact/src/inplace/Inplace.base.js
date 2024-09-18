import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/inplace';
import { contentDefaultProps, defaultProps, displayDefaultProps } from './Inplace.props';

export const useInplace = createSafeComponent(defaultProps, style);
export const useInplaceDisplay = createSafeComponent(displayDefaultProps);
export const useInplaceContent = createSafeComponent(contentDefaultProps);
