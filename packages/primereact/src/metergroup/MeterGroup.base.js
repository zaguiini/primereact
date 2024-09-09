import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/metergroup';
import { defaultProps } from './MeterGroup.props';

export const useMeterGroup = createSafeComponent(defaultProps, style);
