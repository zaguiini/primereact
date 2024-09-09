import { ObjectUtils } from '../utils/Utils';

export const StyleClassBase = {
    defaultProps: {},
    getProps: (props) => ObjectUtils.getMergedProps(props, StyleClassBase.defaultProps),
    getOtherProps: (props) => ObjectUtils.getDiffProps(props, StyleClassBase.defaultProps)
};
