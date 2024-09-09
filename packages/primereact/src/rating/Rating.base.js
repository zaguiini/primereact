import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/rating';
import { defaultProps } from './Rating.props';

export const useRating = createSafeComponent(defaultProps, style);
