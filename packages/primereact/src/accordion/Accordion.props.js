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
    children: undefined
};

export const defaultAccordionPanelProps = {
    __TYPE: 'AccordionPanel',
    value: undefined,
    disabled: false
};

export const defaultAccordionHeaderProps = {
    __TYPE: 'AccordionHeader'
};

export const defaultAccordionContentProps = {
    __TYPE: 'AccordionContent'
};
