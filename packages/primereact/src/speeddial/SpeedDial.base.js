import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/speeddial';
import { defaultProps } from './SpeedDial.props';

export const useSpeedDial = createSafeComponent(defaultProps, style);
