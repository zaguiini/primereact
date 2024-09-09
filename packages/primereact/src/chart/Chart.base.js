import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/chart';
import { defaultProps } from './Chart.props';

export const useChart = createSafeComponent(defaultProps, style);
