export const defaultProps = {
    __TYPE: 'Panel',
    header: null,
    footer: null,
    toggleable: null,
    toggleButtonProps: {
        severity: 'secondary',
        text: true,
        rounded: true
    },
    collapsed: null,
    expandIcon: null,
    collapseIcon: null,
    icons: null,
    transitionOptions: null,
    // templates
    headerTemplate: null,
    footerTemplate: null,
    toggleIconTemplate: null,
    // events
    onExpand: null,
    onCollapse: null,
    onToggle: null
};
