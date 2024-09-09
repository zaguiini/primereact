import { ObjectUtils } from '../utils/Utils';

export const CSSTransitionBase = {
    defaultProps: {},
    getProps: (props) => ObjectUtils.getMergedProps(props, CSSTransitionBase.defaultProps),
    getOtherProps: (props) => ObjectUtils.getDiffProps(props, CSSTransitionBase.defaultProps)
};
