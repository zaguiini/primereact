import { ComponentBase } from '../componentbase/ComponentBase';
import { ObjectUtils } from '../utils/Utils';

export const ColumnBase = ComponentBase.extend({
    defaultProps: {},
    getCProp: (column, name) => ObjectUtils.getComponentProp(column, name, ColumnBase.defaultProps),
    getCProps: (column) => ObjectUtils.getComponentProps(column, ColumnBase.defaultProps),
    getCOtherProps: (column) => ObjectUtils.getComponentDiffProps(column, ColumnBase.defaultProps)
});
