import { ComponentBase } from '../componentbase/ComponentBase';
import { classNames } from '../utils/Utils';

const classes = {
    root: ({ props, focusedState, stacked, horizontal, vertical }) =>
        classNames('p-inputnumber p-component p-inputwrapper', {
            'p-inputwrapper-filled': props.value != null && props.value.toString().length > 0,
            'p-inputwrapper-focus': focusedState,
            'p-inputnumber-buttons-stacked': stacked,
            'p-inputnumber-buttons-horizontal': horizontal,
            'p-inputnumber-buttons-vertical': vertical,
            'p-invalid': props.invalid
        }),
    input: ({ props, context }) =>
        classNames('p-inputnumber-input', {
            'p-variant-filled': props.variant ? props.variant === 'filled' : context && context.inputStyle === 'filled'
        }),
    buttonGroup: 'p-inputnumber-button-group',
    incrementButton: ({ props }) =>
        classNames('p-inputnumber-button p-inputnumber-button-up p-button p-button-icon-only p-component', {
            'p-disabled': props.disabled
        }),
    incrementIcon: 'p-button-icon',
    decrementButton: ({ props }) =>
        classNames('p-inputnumber-button p-inputnumber-button-down p-button p-button-icon-only p-component', {
            'p-disabled': props.disabled
        }),
    decrementIcon: 'p-button-icon'
};

const styles = `
@layer primereact {
    .p-inputnumber {
        display: inline-flex;
    }

    .p-inputnumber-button {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
    }

    .p-inputnumber-buttons-stacked .p-button.p-inputnumber-button .p-button-label,
    .p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button .p-button-label {
        display: none;
    }

    .p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-up {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        padding: 0;
    }

    .p-inputnumber-buttons-stacked .p-inputnumber-input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-down {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: 0;
        padding: 0;
    }

    .p-inputnumber-buttons-stacked .p-inputnumber-button-group {
        display: flex;
        flex-direction: column;
    }

    .p-inputnumber-buttons-stacked .p-inputnumber-button-group .p-button.p-inputnumber-button {
        flex: 1 1 auto;
    }

    .p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-up {
        order: 3;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .p-inputnumber-buttons-horizontal .p-inputnumber-input {
        order: 2;
        border-radius: 0;
    }

    .p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-down {
        order: 1;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .p-inputnumber-buttons-vertical {
        flex-direction: column;
    }

    .p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-up {
        order: 1;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        width: 100%;
    }

    .p-inputnumber-buttons-vertical .p-inputnumber-input {
        order: 2;
        border-radius: 0;
        text-align: center;
    }

    .p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-down {
        order: 3;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        width: 100%;
    }

    .p-inputnumber-input {
        flex: 1 1 auto;
    }

    .p-fluid .p-inputnumber {
        width: 100%;
    }

    .p-fluid .p-inputnumber .p-inputnumber-input {
        width: 1%;
    }

    .p-fluid .p-inputnumber-buttons-vertical .p-inputnumber-input {
        width: 100%;
    }
}
`;

export const InputNumberBase = ComponentBase.extend({
    defaultProps: {},
    css: {
        classes,
        styles
    }
});
