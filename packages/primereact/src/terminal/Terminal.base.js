import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/terminal';
import { defaultProps } from './Terminal.props';

export const useTerminal = createSafeComponent(defaultProps, style);
