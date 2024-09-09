import { ComponentBase } from '../componentbase/ComponentBase';
import { classNames } from '../utils/Utils';

const classes = {
    root: ({ props }) =>
        classNames('p-tree p-component', {
            'p-tree-selectable': props.selectionMode,
            'p-tree-loading': props.loading,
            'p-disabled': props.disabled
        }),
    loadingOverlay: 'p-tree-loading-overlay p-component-overlay',
    loadingIcon: 'p-tree-loading-icon',
    filterContainer: 'p-tree-filter-container',
    input: 'p-tree-filter p-inputtext p-component',
    searchIcon: 'p-tree-filter-icon',
    container: 'p-tree-container',
    node: ({ isLeaf }) =>
        classNames('p-treenode', {
            'p-treenode-leaf': isLeaf
        }),
    content: ({ nodeProps: props, checked, selected, isCheckboxSelectionMode }) =>
        classNames('p-treenode-content', {
            'p-treenode-selectable': props.selectionMode && props.node.selectable !== false,
            'p-highlight': isCheckboxSelectionMode() ? checked : selected,
            'p-highlight-contextmenu': props.contextMenuSelectionKey && props.contextMenuSelectionKey === props.node.key,
            'p-disabled': props.disabled
        }),
    toggler: 'p-tree-toggler p-link',
    togglerIcon: 'p-tree-toggler-icon',
    nodeCheckbox: ({ partialChecked }) => classNames({ 'p-indeterminate': partialChecked }),
    nodeIcon: 'p-treenode-icon',
    label: 'p-treenode-label',
    subgroup: 'p-treenode-children',
    checkIcon: 'p-checkbox-icon',
    emptyMessage: 'p-treenode p-tree-empty-message',
    droppoint: 'p-treenode-droppoint',
    header: 'p-tree-header',
    footer: 'p-tree-footer'
};

const styles = `
    .p-tree-container {
        margin: 0;
        padding: 0;
        list-style-type: none;
        overflow: auto;
    }

    .p-treenode-children {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }

    .p-treenode-selectable {
        cursor: pointer;
        user-select: none;
    }

    .p-tree-toggler {
        cursor: pointer;
        user-select: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        overflow: hidden;
        position: relative;
    }

    .p-treenode-leaf > .p-treenode-content .p-tree-toggler {
        visibility: hidden;
    }

    .p-treenode-content {
        display: flex;
        align-items: center;
    }

    .p-tree-filter {
        width: 100%;
    }

    .p-tree-filter-container {
        position: relative;
        display: block;
        width: 100%;
    }

    .p-tree-filter-icon {
        position: absolute;
        top: 50%;
        margin-top: -.5rem;
    }

    .p-tree-loading {
        position: relative;
        min-height: 4rem;
    }

    .p-tree .p-tree-loading-overlay {
        position: absolute;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

`;

export const TreeBase = ComponentBase.extend({
    defaultProps: {},
    css: {
        classes
    }
});
