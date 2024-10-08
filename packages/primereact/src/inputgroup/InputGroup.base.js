import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/inputgroup';
import { isEmpty } from '@primeuix/utils';
import { defaultProps } from './InputGroup.props';

export const useInputGroup = withComponent(
    ({ props, parent }) => {
        //computed
        const hasFluid = isEmpty(props.fluid) ? !!parent?.$pc?.Fluid : props.fluid;

        return {
            // computed
            hasFluid
        };
    },
    defaultProps,
    style
);
