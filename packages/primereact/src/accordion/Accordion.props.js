export const defaultProps = {
    __TYPE: 'Accordion',
    value: undefined,
    multiple: false,
    tabIndex: 0,
    selectOnFocus: false,
    expandIcon: undefined,
    collapseIcon: undefined,
    activeIndex: null,
    transitionOptions: null,
    onTabOpen: null,
    onTabClose: null,
    onTabChange: null,
    onChange: null,
    children: undefined
};

export const defaultAccordionPanelProps = {
    __TYPE: 'AccordionPanel',
    value: undefined,
    disabled: false,
    transitionOptions: null
};

export const defaultAccordionHeaderProps = {
    __TYPE: 'AccordionHeader',
    toggleIcon: undefined
};

export const defaultAccordionContentProps = {
    __TYPE: 'AccordionContent'
};
