
const theme = ({ dt }) => `
.p-blockui {
    position: relative;
}

.p-blockui-mask {
    border-radius: ${dt('blockui.border.radius')};
}

.p-blockui-mask.p-overlay-mask {
    position: absolute;
}

.p-blockui-mask-document.p-overlay-mask {
    position: fixed;
}
`;

const classes = {
    root: 'p-blockui',
    mask: ({ props }) => ['p-blockui-mask p-overlay-mask p-overlay-mask-enter', {
        'p-blockui-mask-document' : props.fullScreen
    }]
};

export const style = {
    name: 'blockui',
    theme,
    classes
};
