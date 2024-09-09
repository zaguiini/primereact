import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/deferredcontent';
import { defaultProps } from './DeferredContent.props';

export const useDeferredContent = createSafeComponent(defaultProps, style);
