import { ComponentBase } from '../componentbase/ComponentBase';
import { classNames } from '../utils/Utils';

const classes = {
    root: ({ props, isRowSelectionMode }) =>
        classNames('p-treetable p-component', {
            'p-treetable-hoverable-rows': props.rowHover,
            'p-treetable-selectable': isRowSelectionMode(),
            'p-treetable-resizable': props.resizableColumns,
            'p-treetable-resizable-fit': props.resizableColumns && props.columnResizeMode === 'fit',
            'p-treetable-striped': props.stripedRows,
            'p-treetable-gridlines': props.showGridlines
        }),
    loadingIcon: 'p-treetable-loading-icon',
    loadingWrapper: 'p-treetable-loading',
    loadingOverlay: 'p-treetable-loading-overlay p-component-overlay',
    header: 'p-treetable-header',
    footer: 'p-treetable-footer',
    resizeHelper: 'p-column-resizer-helper',
    reorderIndicatorUp: 'p-treetable-reorder-indicator-up',
    reorderIndicatorDown: 'p-treetable-reorder-indicator-down',
    wrapper: 'p-treetable-wrapper',
    table: ({ props }) =>
        classNames('p-treetable-table', {
            'p-treetable-scrollable-table': props.scrollable,
            'p-treetable-resizable-table': props.resizableColumns,
            'p-treetable-resizable-table-fit': props.resizableColumns && props.columnResizeMode === 'fit'
        }),
    scrollableWrapper: 'p-treetable-wrapper p-treetable-scrollable-wrapper',
    thead: 'p-treetable-thead',
    tbody: 'p-treetable-tbody',
    tfoot: 'p-treetable-tfoot',
    emptyMessage: 'p-treetable-emptymessage',
    bodyCell: ({ bodyProps: props, editingState, align }) =>
        classNames({
            'p-editable-column': props.editor,
            'p-cell-editing': props.editor ? editingState : false,
            [`p-align-${align}`]: !!align
        }),
    sortBadge: 'p-sortable-column-badge',
    headerTitle: 'p-column-title',
    headerContent: 'p-column-header-content',
    headerCell: ({ headerProps: props, frozen, column, options, getColumnProp, sorted, align }) =>
        options.filterOnly
            ? classNames('p-filter-column', { 'p-frozen-column': frozen })
            : classNames({
                  'p-sortable-column': getColumnProp(column, 'sortable'),
                  'p-highlight': sorted,
                  'p-frozen-column': frozen,
                  'p-resizable-column': props.resizableColumns && getColumnProp(column, 'resizeable'),
                  'p-reorderable-column': props.reorderableColumns && getColumnProp(column, 'reorderable') && !frozen,
                  [`p-align-${align}`]: !!align
              }),
    columnResizer: 'p-column-resizer p-clickable',
    sortIcon: 'p-sortable-column-icon',
    row: ({ isSelected, rowProps: props }) => ({
        'p-highlight': isSelected(),
        'p-highlight-contextmenu': props.contextMenuSelectionKey && props.contextMenuSelectionKey === props.node.key,
        'p-row-odd': props.rowIndex % 2 !== 0
    }),
    rowCheckbox: ({ partialChecked }) => classNames('p-treetable-checkbox', { 'p-indeterminate': partialChecked }),
    rowToggler: 'p-treetable-toggler p-link p-unselectable-text',
    rowTogglerIcon: 'p-treetable-toggler-icon',
    scrollableBody: 'p-treetable-scrollable-body',
    scrollableHeaderTable: 'p-treetable-scrollable-header-table',
    scrollableHeaderBox: 'p-treetable-scrollable-header-box',
    scrollableHeader: 'p-treetable-scrollable-header',
    scrollableBodyTable: 'p-treetable-scrollable-body-table',
    scrollableFooter: 'p-treetable-scrollable-footer',
    scrollableFooterBox: 'p-treetable-scrollable-footer-box',
    scrollableFooterTable: 'p-treetable-scrollable-footer-table',
    scrollable: ({ scrolaableProps: props }) => classNames('p-treetable-scrollable-view', { 'p-treetable-frozen-view': props.frozen, 'p-treetable-unfrozen-view': !props.frozen && props.frozenWidth }),
    scrollableColgroup: 'p-treetable-scrollable-colgroup'
};

export const TreeTableBase = ComponentBase.extend({
    defaultProps: {},
    css: {
        classes
    }
});
