import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/inplace';
import { defaultProps } from './Inplace.props';

export const useInplace = createSafeComponent(defaultProps, style);
