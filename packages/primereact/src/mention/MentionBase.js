import { ComponentBase } from '../componentbase/ComponentBase';
import { classNames } from '../utils/Utils';

const classes = {
    item: ({ isSelected }) =>
        classNames('p-mention-item', {
            'p-highlight': isSelected
        }),
    items: 'p-mention-items',
    panel: ({ props }) => classNames('p-mention-panel p-component', props.panelClassName),
    input: ({ props }) => classNames('p-mention-input', props.inputClassName),
    root: ({ props, isFilled, focusedState }) =>
        classNames('p-mention p-component p-inputwrapper', {
            'p-inputwrapper-filled': isFilled,
            'p-inputwrapper-focus': focusedState
        }),
    transition: 'p-connected-overlay'
};

const styles = `
@layer primereact {
    .p-mention {
        display: inline-flex;
        position: relative;
    }

    .p-autocomplete-loader {
        position: absolute;
        top: 50%;
        margin-top: -.5rem;
    }

    .p-mention .p-mention-panel {
        min-width: 100%;
    }

    .p-mention-panel {
        position: absolute;
        top: 0;
        left: 0;
        overflow: auto;
    }

    .p-mention-items {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    .p-mention-item {
        cursor: pointer;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
    }

    .p-fluid .p-mention {
        display: flex;
    }
}
`;

export const MentionBase = ComponentBase.extend({
    defaultProps: {},
    css: {
        classes,
        styles
    }
});
