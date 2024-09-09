import { ComponentBase } from '../componentbase/ComponentBase';
import { classNames } from '../utils/Utils';

const classes = {
    root: ({ props, context, isFilled }) =>
        classNames('p-inputtextarea p-inputtext p-component', {
            'p-disabled': props.disabled,
            'p-filled': isFilled,
            'p-inputtextarea-resizable': props.autoResize,
            'p-invalid': props.invalid,
            'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
        })
};

const styles = `
@layer primereact {
    .p-inputtextarea-resizable {
        overflow: hidden;
        resize: none;
    }

    .p-fluid .p-inputtextarea {
        width: 100%;
    }
}
`;

export const InputTextareaBase = ComponentBase.extend({
    defaultProps: {},
    css: {
        classes,
        styles
    }
});
