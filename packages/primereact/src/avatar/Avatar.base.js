import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/avatar';
import { defaultProps } from './Avatar.props';

export const useAvatar = createSafeComponent(defaultProps, style);
