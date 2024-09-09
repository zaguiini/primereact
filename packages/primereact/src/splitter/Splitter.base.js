import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/splitter';
import { defaultProps } from './Splitter.props';

export const useSplitter = createSafeComponent(defaultProps, style);
