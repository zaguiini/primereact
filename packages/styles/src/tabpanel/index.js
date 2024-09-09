
const classes = {
    root: ({ instance }) => [
        'p-tabpanel',
        {
            'p-tabpanel-active': instance.active
        }
    ]
};

export const style = {
    name: 'tabpanel',
    classes
};
