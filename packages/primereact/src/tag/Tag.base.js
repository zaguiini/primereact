import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/tag';
import { defaultProps } from './Tag.props';

export const useTag = createSafeComponent(defaultProps, style);
