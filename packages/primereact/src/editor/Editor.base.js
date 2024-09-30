import { withComponent } from '@primereact/core/component';
import { useUpdateEffect } from '@primereact/hooks';
import { style } from '@primereact/styles/editor';
import { defaultProps } from './Editor.props';

const QuillJS = (function () {
    try {
        return window.Quill;
    } catch {
        return null;
    }
})();

export const useEditor = withComponent(
    ({ props }) => {
        // states
        const [quillCreated, setQuillCreated] = React.useState(false);
        const state = {
            quillCreated
        };

        // refs
        const quill = React.useRef(null);
        const isQuillLoaded = React.useRef(false);

        // element refs
        const contentRef = React.useRef(null);
        const toolbarRef = React.useRef(null);

        // methods
        const onTextChange = (delta, oldContents, source) => {
            let firstChild = contentRef.current.children[0];
            let html = firstChild ? firstChild.innerHTML : null;
            let text = quill.current.getText();

            if (html === '<p><br></p>') {
                html = null;
            }

            // GitHub #2271 prevent infinite loop on clipboard paste of HTML
            if (source === 'api') {
                const htmlValue = contentRef.current.children[0];
                const editorValue = document.createElement('div');

                editorValue.innerHTML = props.value || '';

                // this is necessary because Quill rearranged style elements
                if (DomHandler.isEqualElement(htmlValue, editorValue)) {
                    return;
                }
            }

            if (props.maxLength) {
                const length = quill.current.getLength();

                if (length > props.maxLength) {
                    quill.current.deleteText(props.maxLength, length);
                }
            }

            if (props.onTextChange) {
                props.onTextChange({
                    htmlValue: html,
                    textValue: text,
                    delta: delta,
                    source: source
                });
            }
        };
        const onSelectionChange = (range, oldRange, source) => {
            if (props.onSelectionChange) {
                props.onSelectionChange({
                    range: range,
                    oldRange: oldRange,
                    source: source
                });
            }
        };
        const initQuill = (quillInstance) => {
            quill.current = quillInstance;

            if (props.value) {
                quillInstance.setContents(
                    quillInstance.clipboard.convert({
                        html: props.value,
                        text: ''
                    })
                );
            }

            setQuillCreated(true);
        };

        // effects
        useMountEffect(() => {
            if (!isQuillLoaded.current) {
                const configuration = {
                    modules: {
                        toolbar: props.showHeader ? toolbarRef.current : false,
                        ...props.modules
                    },
                    placeholder: props.placeholder,
                    readOnly: props.readOnly,
                    theme: props.theme,
                    formats: props.formats
                };

                if (QuillJS) {
                    // GitHub #3097 loaded by script only
                    initQuill(new Quill(contentRef.current, configuration));
                } else {
                    import('quill').then((module) => {
                        if (module && DomHandler.isExist(contentRef.current)) {
                            let quillInstance;

                            if (module.default) {
                                // webpack
                                quillInstance = new module.default(contentRef.current, configuration);
                            } else {
                                // parceljs
                                quillInstance = new module(contentRef.current, configuration);
                            }

                            initQuill(quillInstance);
                        }
                    });
                }

                isQuillLoaded.current = true;
            }
        });
        useUpdateEffect(() => {
            if (quillCreated) {
                quill.current.on('text-change', onTextChange);
                quill.current.on('selection-change', onSelectionChange);

                return () => {
                    quill.current.off('text-change', onTextChange);
                    quill.current.off('selection-change', onSelectionChange);
                };
            }
        });
        useUpdateEffect(() => {
            if (quillCreated) {
                if (quill.current && quill.current.getModule('toolbar')) {
                    props.onLoad && props.onLoad(quill.current);
                }
            }
        }, [quillCreated]);
        useUpdateEffect(() => {
            if (quill.current && !quill.current.hasFocus()) {
                if (props.value) {
                    quill.current.setContents(
                        quill.current.clipboard.convert({
                            html: props.value,
                            text: ''
                        })
                    );
                } else {
                    quill.current.setText('');
                }
            }
        }, [props.value]);

        return {
            // states
            state,
            // refs
            quill: toValue(quill),
            isQuillLoaded: toValue(isQuillLoaded),
            // element refs
            contentRef,
            toolbarRef,
            // methods
            onTextChange,
            onSelectionChange,
            initQuill
        };
    },
    defaultProps,
    style
);
