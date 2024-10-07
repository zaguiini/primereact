export const defaultProps = {
    __TYPE: 'Fieldset',
    legend: null,
    toggleable: null,
    toggleButtonProps: {
        severity: 'secondary',
        text: true,
        rounded: true
    },
    collapsed: null,
    expandIcon: null,
    collapseIcon: null,
    transitionOptions: null,
    // templates
    legendTemplate: null,
    toggleIconTemplate: null,
    // events
    onExpand: null,
    onCollapse: null,
    onToggle: null
};
