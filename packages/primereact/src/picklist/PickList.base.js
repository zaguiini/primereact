import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/picklist';
import { defaultProps } from './PickList.props';

export const usePickList = createSafeComponent(defaultProps, style);
