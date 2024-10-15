import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/inputtext';
import { isEmpty, isNotEmpty } from '@primeuix/utils';
import * as React from 'react';
import { defaultProps } from './InputText.props';

export const useInputText = withComponent(
    ({ props, parent }) => {
        // states
        const [filled, setFilled] = React.useState(false);
        const state = {
            filled
        };

        // methods
        const onKeyDown = (event) => {
            props.onKeyDown?.(event);

            if (props.keyfilter) {
                KeyFilter.onKeyPress(event, props.keyfilter, props.validateOnly);
            }
        };
        const onBeforeInput = (event) => {
            props.onBeforeInput?.(event);

            if (props.keyfilter) {
                KeyFilter.onBeforeInput(event, props.keyfilter, props.validateOnly);
            }
        };
        const onInput = (event) => {
            const target = event.target;
            let validatePattern = true;

            if (props.keyfilter && props.validateOnly) {
                validatePattern = KeyFilter.validate(event, props.keyfilter);
            }

            props.onInput?.(event, validatePattern);

            // for uncontrolled changes
            setFilled(isNotEmpty(target.value));
        };
        const onPaste = (event) => {
            props.onPaste && props.onPaste(event);

            if (props.keyfilter) {
                KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
            }
        };

        // computed
        const hasFluid = isEmpty(props.fluid) ? !!parent?.$pc?.Fluid : props.fluid;

        // effects
        React.useEffect(() => {
            setFilled(isNotEmpty(props.value) || isNotEmpty(props.defaultValue));
        }, [props.value, props.defaultValue]);

        return {
            state,
            // methods
            onBeforeInput,
            onInput,
            onKeyDown,
            onPaste,
            // computed
            filled, // compatibility with Prime*
            hasFluid
        };
    },
    defaultProps,
    style
);
