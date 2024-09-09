import { ComponentBase } from '../componentbase/ComponentBase';

export const ChartBase = ComponentBase.extend({
    defaultProps: {},
    css: {
        classes: {
            root: 'p-chart'
        },
        inlineStyles: {
            root: ({ props }) =>
                Object.assign(
                    {
                        width: props.width,
                        height: props.height
                    },
                    props.style
                )
        },
        styles: `
        @layer primereact {
            .p-chart {
                position: relative
            }
        }
        `
    }
});
