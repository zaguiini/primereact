import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/mention';
import { defaultProps } from './Mention.props';

export const useMention = createSafeComponent(defaultProps, style);
