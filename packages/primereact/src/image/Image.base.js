import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/image';
import { defaultProps } from './Image.props';

export const useImage = createSafeComponent(defaultProps, style);
