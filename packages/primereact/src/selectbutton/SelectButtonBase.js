import { ComponentBase } from '../componentbase/ComponentBase';
import { classNames } from '../utils/Utils';

const classes = {
    root: ({ props }) => classNames('p-selectbutton p-button-group p-component', { 'p-invalid': props.invalid }),
    button: ({ itemProps: props, focusedState }) =>
        classNames('p-button p-component', {
            'p-highlight': props.selected,
            'p-disabled': props.disabled,
            'p-focus': focusedState
        }),
    label: 'p-button-label p-c'
};

export const SelectButtonBase = ComponentBase.extend({
    defaultProps: {},
    css: {
        classes
    }
});
