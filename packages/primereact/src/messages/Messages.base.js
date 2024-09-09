import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/messages';
import { defaultProps } from './Messages.props';

export const useMessages = createSafeComponent(defaultProps, style);
