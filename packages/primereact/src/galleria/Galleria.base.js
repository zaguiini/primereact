import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/galleria';
import { defaultProps } from './Galleria.props';

export const useGalleria = createSafeComponent(defaultProps, style);
