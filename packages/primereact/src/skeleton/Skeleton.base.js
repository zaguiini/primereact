import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/skeleton';
import { defaultProps } from './Skeleton.props';

export const useSkeleton = createSafeComponent(defaultProps, style);
