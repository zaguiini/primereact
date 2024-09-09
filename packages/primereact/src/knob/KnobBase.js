import { ComponentBase } from '../componentbase/ComponentBase';
import { classNames } from '../utils/Utils';

export const KnobBase = ComponentBase.extend({
    defaultProps: {},
    css: {
        classes: {
            range: 'p-knob-range',
            value: 'p-knob-value',
            label: 'p-knob-text',
            root: ({ props }) =>
                classNames('p-knob p-component', {
                    'p-disabled': props.disabled
                })
        },
        styles: `
        @keyframes dash-frame {
            100% {
                stroke-dashoffset: 0;
            }
        }
        @layer primereact {
            .p-knob-range {
                fill: none;
                transition: stroke .1s ease-in;
            }
            .p-knob-value {
                animation-name: dash-frame;
                animation-fill-mode: forwards;
                fill: none;
            }
            .p-knob-text {
                font-size: 1.3rem;
                text-align: center;
            }
        }
        `
    }
});
