import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/card';
import { defaultProps } from './Card.props';

export const useCard = createSafeComponent(defaultProps, style);
