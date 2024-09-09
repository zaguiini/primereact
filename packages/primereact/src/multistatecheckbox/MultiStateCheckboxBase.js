import { ComponentBase } from '../componentbase/ComponentBase';
import { classNames } from '../utils/Utils';

const classes = {
    icon: ({ icon }) =>
        classNames('p-checkbox-icon p-c', {
            [`${icon}`]: true
        }),
    root: ({ props }) => classNames('p-multistatecheckbox p-checkbox p-component', props.classNames)
};

const inlineStyles = {
    checkbox: ({ selectedOption }) => selectedOption && selectedOption.style
};

export const MultiStateCheckboxBase = ComponentBase.extend({
    defaultProps: {},
    css: {
        classes,
        inlineStyles
    }
});
