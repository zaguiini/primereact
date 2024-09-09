import { ComponentBase } from '../componentbase/ComponentBase';
import { ObjectUtils } from '../utils/Utils';

export const RowBase = ComponentBase.extend({
    defaultProps: {},
    getCProp: (row, name) => ObjectUtils.getComponentProp(row, name, RowBase.defaultProps)
});
