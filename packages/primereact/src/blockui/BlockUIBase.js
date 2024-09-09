import { ComponentBase } from '../componentbase/ComponentBase';
import { classNames } from '../utils/Utils';

const classes = {
    root: 'p-blockui-container',
    mask: ({ props }) =>
        classNames('p-blockui p-component-overlay p-component-overlay-enter', {
            'p-blockui-document': props.fullScreen
        })
};

const styles = `
@layer primereact {
    .p-blockui-container {
        position: relative;
    }

    .p-blockui {
        opacity: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .p-blockui.p-component-overlay {
        position: absolute;
    }

    .p-blockui-document.p-component-overlay {
        position: fixed;
    }
}
`;

export const BlockUIBase = ComponentBase.extend({
    defaultProps: {},
    css: {
        classes,
        styles
    }
});
