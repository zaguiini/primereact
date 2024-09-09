import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/message';
import { defaultProps } from './Message.props';

export const useMessage = createSafeComponent(defaultProps, style);
