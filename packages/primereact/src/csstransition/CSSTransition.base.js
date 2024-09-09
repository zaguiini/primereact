import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/csstransition';
import { defaultProps } from './CSSTransition.props';

export const useCSSTransition = createSafeComponent(defaultProps, style);
