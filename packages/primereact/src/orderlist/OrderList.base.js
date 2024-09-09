import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/orderlist';
import { defaultProps } from './OrderList.props';

export const useOrderList = createSafeComponent(defaultProps, style);
