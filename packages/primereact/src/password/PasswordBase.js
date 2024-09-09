import PrimeReact from '../api/Api';
import { ComponentBase } from '../componentbase/ComponentBase';
import { classNames } from '../utils/Utils';

const classes = {
    root: ({ props, isFilled, focusedState }) =>
        classNames('p-password p-component p-inputwrapper', {
            'p-inputwrapper-filled': isFilled,
            'p-inputwrapper-focus': focusedState,
            'p-input-icon-right': props.toggleMask
        }),
    input: ({ props }) => classNames('p-password-input', props.inputClassName),
    panel: ({ props, context }) =>
        classNames('p-password-panel p-component', props.panelClassName, {
            'p-input-filled': (context && context.inputStyle === 'filled') || PrimeReact.inputStyle === 'filled',
            'p-ripple-disabled': (context && context.ripple === false) || PrimeReact.ripple === false
        }),
    meter: 'p-password-meter',
    meterLabel: ({ strength }) => classNames('p-password-strength', strength),
    info: ({ strength }) => classNames('p-password-info', strength),
    showIcon: 'p-password-show-icon',
    hideIcon: 'p-password-hide-icon',
    transition: 'p-connected-overlay'
};

const styles = `
@layer primereact {
    .p-password {
        position: relative;
        display: inline-flex;
    }

    .p-password-panel {
        position: absolute;
        top: 0;
        left: 0;
    }

    .p-password .p-password-panel {
        min-width: 100%;
    }

    .p-password-meter {
        height: 10px;
    }

    .p-password-strength {
        height: 100%;
        width: 0%;
        transition: width 1s ease-in-out;
    }

    .p-fluid .p-password {
        display: flex;
    }

    .p-password-input::-ms-reveal,
    .p-password-input::-ms-clear {
        display: none;
    }

    .p-password .p-password-show-icon,
    .p-password .p-password-hide-icon {
        line-height: 1.5;
        cursor: pointer;
    }
}
`;

export const PasswordBase = ComponentBase.extend({
    defaultProps: {},
    css: {
        classes,
        styles
    }
});
