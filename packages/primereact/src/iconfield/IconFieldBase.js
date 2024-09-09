import { ComponentBase } from '../componentbase/ComponentBase';
import { classNames } from '../utils/Utils';

const classes = {
    root: ({ props }) =>
        classNames('p-icon-field', {
            'p-icon-field-right': props.iconPosition === 'right',
            'p-icon-field-left': props.iconPosition === 'left'
        })
};

export const IconFieldBase = ComponentBase.extend({
    defaultProps: {},

    css: {
        classes
    }
});
