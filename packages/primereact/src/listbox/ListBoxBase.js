import { ComponentBase } from '../componentbase/ComponentBase';
import { classNames } from '../utils/Utils';

const classes = {
    itemGroup: 'p-listbox-item-group',
    emptyMessage: 'p-listbox-empty-message',
    list: 'p-listbox-list',
    wrapper: ({ props }) => classNames('p-listbox-list-wrapper', props.listClassName),
    root: ({ props }) =>
        classNames(
            'p-listbox p-component',
            {
                'p-disabled': props.disabled,
                'p-invalid': props.invalid
            },
            props.className
        ),
    item: ({ props }) =>
        classNames(
            'p-listbox-item',
            {
                'p-highlight': props.selected,
                'p-focus': props.focusedOptionIndex === props.index,
                'p-disabled': props.disabled
            },
            props.option.className
        ),
    filterContainer: 'p-listbox-filter-container',
    filterIcon: 'p-listbox-filter-icon',
    filterInput: 'p-listbox-filter',
    header: 'p-listbox-header'
};

const styles = `
@layer primereact {
    .p-listbox-list-wrapper {
        overflow: auto;
    }

    .p-listbox-list {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .p-listbox-item {
        cursor: pointer;
        position: relative;
        overflow: hidden;
        outline: none;
    }

    .p-listbox-filter-container {
        position: relative;
    }

    .p-listbox-filter-icon {
        position: absolute;
        top: 50%;
        margin-top: -.5rem;
    }

    .p-listbox-filter {
        width: 100%;
    }
}
`;

const inlineStyles = {
    itemGroup: ({ scrollerOptions }) => ({ height: scrollerOptions.props ? scrollerOptions.props.itemSize : undefined }),
    list: ({ options, props }) => (props.virtualScrollerOptions ? options.style : undefined)
};

export const ListBoxBase = ComponentBase.extend({
    defaultProps: {},
    css: {
        classes,
        styles,
        inlineStyles
    }
});
