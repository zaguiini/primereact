import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/timeline';
import { defaultProps } from './Timeline.props';

export const useTimeline = createSafeComponent(defaultProps, style);
