import { ComponentBase } from '../componentbase/ComponentBase';
import { classNames } from '../utils/Utils';

const classes = {
    root: ({ props, checked }) =>
        classNames('p-inputswitch p-component', {
            'p-highlight': checked,
            'p-disabled': props.disabled,
            'p-invalid': props.invalid
        }),
    input: 'p-inputswitch-input',
    slider: 'p-inputswitch-slider'
};

export const InputSwitchBase = ComponentBase.extend({
    defaultProps: {},
    css: {
        classes
    }
});
