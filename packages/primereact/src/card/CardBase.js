import { ComponentBase } from '../componentbase/ComponentBase';

const classes = {
    root: 'p-card p-component',
    header: 'p-card-header',
    title: 'p-card-title',
    subTitle: 'p-card-subtitle',
    content: 'p-card-content',
    footer: 'p-card-footer',
    body: 'p-card-body'
};

const styles = `
@layer primereact {
    .p-card-header img {
        width: 100%;
    }
}
`;

export const CardBase = ComponentBase.extend({
    defaultProps: {},
    css: {
        classes,
        styles
    }
});
