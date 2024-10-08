import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/button';
import { isEmpty, mergeProps } from '@primeuix/utils';
import { defaultProps } from './Button.props';

export const useButton = withComponent(
    ({ props, attrs, parent }) => {
        // computed
        const disabled = attrs.disabled || attrs.disabled === '' || props.loading;
        const defaultAriaLabel = props.label ? props.label + (props.badge ? ' ' + props.badge : '') : attrs['aria-label'];
        const hasIcon = props.icon;
        const asAttrs = !props.as ? { type: 'button', disabled } : undefined;
        const a11yAttrs = {
            'aria-label': defaultAriaLabel,
            'data-pc-name': 'button',
            'data-p-disabled': disabled,
            'data-p-severity': props.severity
        };
        const inAttrs = mergeProps(asAttrs, a11yAttrs);
        const hasFluid = isEmpty(props.fluid) ? !!parent.$pc.Fluid : props.fluid;

        return {
            // computed
            disabled,
            defaultAriaLabel,
            hasIcon,
            asAttrs,
            a11yAttrs,
            inAttrs,
            hasFluid
        };
    },
    defaultProps,
    style
);
