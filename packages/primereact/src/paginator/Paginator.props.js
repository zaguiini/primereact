export const defaultProps = {
    __TYPE: 'Paginator',
    __parentMetadata: null,
    totalRecords: 0,
    rows: 0,
    first: 0,
    pageLinkSize: 5,
    rowsPerPageOptions: null,
    alwaysShow: true,
    style: null,
    className: null,
    template: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
    onPageChange: null,
    leftContent: null,
    rightContent: null,
    dropdownAppendTo: null,
    currentPageReportTemplate: '({currentPage} of {totalPages})',
    children: undefined
};
