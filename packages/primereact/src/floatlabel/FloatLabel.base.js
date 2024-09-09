import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/floatlabel';
import { defaultProps } from './FloatLabel.props';

export const useFloatLabel = createSafeComponent(defaultProps, style);
