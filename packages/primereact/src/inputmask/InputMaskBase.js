import { ComponentBase } from '../componentbase/ComponentBase';
import { classNames } from '../utils/Utils';

const classes = {
    root: ({ props, context }) =>
        classNames('p-inputmask', {
            'p-filled': props.filled,
            'p-invalid': props.invalid,
            'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
        })
};

export const InputMaskBase = ComponentBase.extend({
    defaultProps: {},
    css: {
        classes
    }
});
