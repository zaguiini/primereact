import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/autocomplete';
import { defaultProps } from './AutoComplete.props';

export const useAutoComplete = createSafeComponent(defaultProps, style);
