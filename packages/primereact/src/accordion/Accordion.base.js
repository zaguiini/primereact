import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/accordion';
import { defaultProps } from './Accordion.props';

export const useAccordion = withComponent(
    ({ elementRef, id, props, parent, $primereact }) => {
        // states
        const [activeIndexState, setActiveIndexState] = useState(props.activeIndex);
        const [valueState, setValueState] = useState(props.value);
        const value = props.onChange ? props.value : valueState;

        // methods
        const isItemActive = (value) => {
            return this.multiple ? this.d_value?.includes(value) : this.d_value === value;
        };
        const updateValue = (newValue) => {
            const active = this.isItemActive(newValue);

            if (this.multiple) {
                if (active) {
                    this.d_value = this.d_value.filter((v) => v !== newValue);
                } else {
                    if (this.d_value) this.d_value.push(newValue);
                    else this.d_value = [newValue];
                }
            } else {
                this.d_value = active ? null : newValue;
            }

            this.$emit('update:value', this.d_value);

            // @deprecated since v4.
            this.$emit('update:activeIndex', this.multiple ? this.d_value?.map(Number) : Number(this.d_value));
            this.$emit(active ? 'tab-close' : 'tab-open', { originalEvent: undefined, index: Number(newValue) });
        },
        // @deprecated since v4. Use new structure instead.
        isAccordionTab(child) {
            return child.type.name === 'AccordionTab';
        },
        getTabProp(tab, name) {
            return tab.props ? tab.props[name] : undefined;
        },
        getKey(tab, index) {
            return this.getTabProp(tab, 'header') || index;
        },
        getHeaderPT(tab, index) {
            return {
                root: mergeProps({ onClick: (event) => this.onTabClick(event, index) }, this.getTabProp(tab, 'headerProps'), this.getTabPT(tab, 'header', index)),
                toggleicon: mergeProps(this.getTabProp(tab, 'headeractionprops'), this.getTabPT(tab, 'headeraction', index))
            };
        },
        getContentPT(tab, index) {
            return {
                root: mergeProps(this.getTabProp(tab, 'contentProps'), this.getTabPT(tab, 'toggleablecontent', index)),
                transition: this.getTabPT(tab, 'transition', index),
                content: this.getTabPT(tab, 'content', index)
            };
        },
        getTabPT(tab, key, index) {
            const count = this.tabs.length;
            const tabMetaData = {
                props: tab.props || {},
                parent: {
                    instance: this,
                    props: this.$props,
                    state: this.$data
                },
                context: {
                    index,
                    count,
                    first: index === 0,
                    last: index === count - 1,
                    active: this.isItemActive(`${index}`)
                }
            };

            return mergeProps(this.ptm(`accordiontab.${key}`, tabMetaData), this.ptmo(this.getTabProp(tab, 'pt'), key, tabMetaData));
        },
        onTabClick(event, index) {
            this.$emit('tab-click', { originalEvent: event, index });
        }
    },
    defaultProps,
    style
);

export const useAccordionPanel = withComponent(({ props, attrs, parent }) => {
    // computed
    const active = parent.$pc.Accordion.isItemActive(props.value);
    const a11yAttrs = {
        'data-pc-name': 'accordionpanel',
        'data-p-disabled': attrs.disabled,
        'data-p-active': active
    };

    return {
        // computed
        active,
        a11yAttrs
    };
}, defaultProps);

export const useAccordionHeader = withComponent(({ props, parent }) => {
    // parent components
    const $pcAccordion = parent.$pc?.Accordion || {};
    const $pcAccordionPanel = parent.$pc?.AccordionPanel || {};

    // methods
    const onFocus = () => {
        $pcAccordion.props?.selectOnFocus && changeActiveValue();
    };
    const onClick = () => {
        changeActiveValue();
    };
    const onKeyDown = (event) => {
        switch (event.code) {
            case 'ArrowDown':
                onArrowDownKey(event);
                break;

            case 'ArrowUp':
                onArrowUpKey(event);
                break;

            case 'Home':
                onHomeKey(event);
                break;

            case 'End':
                onEndKey(event);
                break;

            case 'Enter':
            case 'NumpadEnter':
            case 'Space':
                onEnterKey(event);
                break;

            default:
                break;
        }
    };
    const onArrowDownKey = (event) => {
        const nextPanel = findNextPanel(findPanel(event.currentTarget));

        nextPanel ? changeFocusedPanel(event, nextPanel) : onHomeKey(event);
        event.preventDefault();
    };
    const onArrowUpKey = (event) => {
        const prevPanel = findPrevPanel(findPanel(event.currentTarget));

        prevPanel ? changeFocusedPanel(event, prevPanel) : onEndKey(event);
        event.preventDefault();
    };
    const onHomeKey = (event) => {
        const firstPanel = findFirstPanel();

        changeFocusedPanel(event, firstPanel);
        event.preventDefault();
    };
    const onEndKey = (event) => {
        const lastPanel = findLastPanel();

        changeFocusedPanel(event, lastPanel);
        event.preventDefault();
    };
    const onEnterKey = (event) => {
        changeActiveValue();
        event.preventDefault();
    };
    const findPanel = (headerElement) => {
        return headerElement?.closest('[data-pc-name="accordionpanel"]');
    };
    const findHeader = (panelElement) => {
        return findSingle(panelElement, '[data-pc-name="accordionheader"]');
    };
    const findNextPanel = (panelElement, selfCheck = false) => {
        const element = selfCheck ? panelElement : panelElement.nextElementSibling;

        return element ? (getAttribute(element, 'data-p-disabled') ? findNextPanel(element) : findHeader(element)) : null;
    };
    const findPrevPanel = (panelElement, selfCheck = false) => {
        const element = selfCheck ? panelElement : panelElement.previousElementSibling;

        return element ? (getAttribute(element, 'data-p-disabled') ? findPrevPanel(element) : findHeader(element)) : null;
    };
    const findFirstPanel = () => {
        return findNextPanel($pcAccordion.$el?.firstElementChild, true);
    };
    const findLastPanel = () => {
        return findPrevPanel($pcAccordion.$el?.lastElementChild, true);
    };
    const changeActiveValue = () => {
        $pcAccordion.updateValue?.($pcAccordionPanel.value);
    };
    const changeFocusedPanel = (event, element) => {
        focus(findHeader(element));
    };

    // computed
    const id = `${$pcAccordion.id}_accordionheader_${$pcAccordionPanel.value}`;
    const active = $pcAccordionPanel.active;
    const ariaControls = `${$pcAccordion.id}_accordioncontent_${$pcAccordionPanel.value}`;
    const asAttrs = props.as === 'button' ? { type: 'button', disabled: $pcAccordionPanel.disabled } : undefined;
    const a11yAttrs = {
        id,
        tabindex: $pcAccordion.tabindex,
        'aria-expanded': active,
        'aria-controls': ariaControls,
        'data-pc-name': 'accordionheader',
        'data-p-disabled': $pcAccordionPanel.disabled,
        'data-p-active': active,
        onFocus,
        onKeyDown
    };
    const inAttrs = mergeProps(asAttrs, a11yAttrs);

    return {
        // methods
        onFocus,
        onClick,
        onKeyDown,
        // computed
        id,
        active,
        ariaControls,
        asAttrs,
        a11yAttrs,
        inAttrs
    };
}, defaultProps);

export const useAccordionContent = withComponent(({ parent }) => {
    // parent components
    const $pcAccordion = parent.$pc?.Accordion || {};
    const $pcAccordionPanel = parent.$pc?.AccordionPanel || {};

    // computed
    const id = `${$pcAccordion.id}_accordioncontent_${$pcAccordionPanel.value}`;
    const active = $pcAccordionPanel.active;
    const ariaLabelledby = `${$pcAccordion.id}_accordionheader_${$pcAccordionPanel.value}`;
    const a11yAttrs = {
        id,
        role: 'region',
        'aria-labelledby': ariaLabelledby,
        'data-pc-name': 'accordioncontent',
        'data-p-active': active
    };

    return {
        // computed
        id,
        active,
        ariaLabelledby,
        a11yAttrs
    };
}, defaultProps);
