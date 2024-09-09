
const classes = {
    root: ({ instance, props }) => [
        'p-tab',
        {
            'p-tab-active': instance.active,
            'p-disabled': props.disabled
        }
    ]
};

export const style = {
    name: 'tab',
    classes
};
