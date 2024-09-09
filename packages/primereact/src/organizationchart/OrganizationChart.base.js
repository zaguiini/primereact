import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/organizationchart';
import { defaultProps } from './OrganizationChart.props';

export const useOrganizationChart = createSafeComponent(defaultProps, style);
