
const classes = {
    root: ({ instance, props }) => [
        'p-accordionpanel',
        {
            'p-accordionpanel-active': instance.active,
            'p-disabled': props.disabled
        }
    ]
};

export const style = {
    name: 'accordionpanel',
    classes
};
