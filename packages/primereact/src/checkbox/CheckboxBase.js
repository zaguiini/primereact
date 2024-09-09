import { ComponentBase } from '../componentbase/ComponentBase';
import { classNames } from '../utils/Utils';

const classes = {
    box: 'p-checkbox-box',
    input: 'p-checkbox-input',
    icon: 'p-checkbox-icon',
    root: ({ props, checked, context }) =>
        classNames('p-checkbox p-component', {
            'p-highlight': checked,
            'p-disabled': props.disabled,
            'p-invalid': props.invalid,
            'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
        })
};

export const CheckboxBase = ComponentBase.extend({
    defaultProps: {},
    css: {
        classes
    }
});
