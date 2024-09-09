import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/listbox';
import { defaultProps } from './Listbox.props';

export const useListbox = createSafeComponent(defaultProps, style);
