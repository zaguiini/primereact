export const defaultProps = {
    __TYPE: 'SpeedDial',
    options: null,
    visible: false,
    direction: 'up',
    transitionDelay: 30,
    type: 'linear',
    radius: 0,
    mask: false,
    disabled: false,
    showIcon: null,
    hideIcon: null,
    hideOnClickOutside: true,
    maskStyle: null,
    maskClassName: null,
    buttonStyle: null,
    buttonClassName: null,
    buttonProps: { rounded: true },
    actionButtonProps: { severity: 'secondary', rounded: true, size: 'small' },
    ariaLabel: null,
    ariaLabelledby: null,
    // templates
    buttonTemplate: null,
    itemTemplate: null, // @todo - optionTemplate
    itemIconTemplate: null,
    iconTemplate: null,
    // events
    onVisibleChange: null,
    onClick: null,
    onShow: null,
    onHide: null
};
