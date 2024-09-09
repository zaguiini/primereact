import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/fieldset';
import { defaultProps } from './Fieldset.props';

export const useFieldset = createSafeComponent(defaultProps, style);
