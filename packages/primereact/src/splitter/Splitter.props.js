export const defaultProps = {
    __TYPE: 'Splitter',
    layout: 'horizontal',
    gutterSize: 4,
    stateKey: null,
    stateStorage: 'session',
    step: 5,
    // events
    onResize: null,
    onResizeStart: null,
    onResizeEnd: null
};

export const defaultPanelProps = {
    __TYPE: 'SplitterPanel',
    size: null,
    minSize: null
};
