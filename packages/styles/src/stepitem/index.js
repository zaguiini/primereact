
const classes = {
    root: ({ instance }) => [
        'p-stepitem',
        {
            'p-stepitem-active': instance.isActive
        }
    ]
};

export const style = {
    name: 'stepitem',
    classes
};
