import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/selectbutton';
import { defaultProps } from './SelectButton.props';

export const useSelectButton = createSafeComponent(defaultProps, style);
