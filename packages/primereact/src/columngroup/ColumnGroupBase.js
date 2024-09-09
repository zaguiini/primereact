import { ComponentBase } from '../componentbase/ComponentBase';
import { ObjectUtils } from '../utils/Utils';

export const ColumnGroupBase = ComponentBase.extend({
    defaultProps: {},
    getCProp: (group, name) => ObjectUtils.getComponentProp(group, name, ColumnGroupBase.defaultProps),
    getCProps: (group) => ObjectUtils.getComponentProps(group, ColumnGroupBase.defaultProps)
});
