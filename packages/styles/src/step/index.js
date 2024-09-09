
const classes = {
    root: ({ instance }) => [
        'p-step',
        {
            'p-step-active': instance.active,
            'p-disabled': instance.isStepDisabled
        }
    ],
    header: 'p-step-header',
    number: 'p-step-number',
    title: 'p-step-title'
};

export const style = {
    name: 'step',
    classes
};
