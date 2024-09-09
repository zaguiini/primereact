
const classes = {
    root: ({ instance }) => [
        'p-steppanel',
        {
            'p-steppanel-active': instance.isVertical && instance.active
        }
    ],
    content: 'p-steppanel-content'
};

export const style = {
    name: 'steppanel',
    classes
};
