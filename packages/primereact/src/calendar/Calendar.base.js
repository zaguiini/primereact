import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/calendar';
import { defaultProps } from './Calendar.props';

export const useCalendar = createSafeComponent(defaultProps, style);
