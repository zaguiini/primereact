import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/carousel';
import { defaultProps } from './Carousel.props';

export const useCarousel = createSafeComponent(defaultProps, style);
