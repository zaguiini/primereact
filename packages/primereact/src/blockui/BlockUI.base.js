import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/blockui';
import { defaultProps } from './BlockUI.props';

export const useBlockUI = createSafeComponent(defaultProps, style);
