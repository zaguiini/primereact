'use client';
import { classNames } from '@primeuix/utils';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { useCodeEditor } from './codeeditor';
import { CodeHighlight } from './codehighlight';

export function DocSectionCode(props) {
    const [codeMode, setCodeMode] = useState('basic');
    const [codeLang, setCodeLang] = useState(props.code.javascript ? 'javascript' : 'basic');
    const codeEditor = useCodeEditor({ ...props, template: 'vite' });

    useEffect(() => {
        if (props.embedded) {
            codeEditor.openStackBlitz(codeLang);
        }
    }, [codeEditor, codeLang, props.embedded]);

    const toggleCodeMode = (content) => {
        if (codeMode === 'data') {
            setCodeMode('javascript');
        } else {
            setCodeMode(codeMode === 'basic' ? content : 'basic');
        }

        setCodeLang('javascript');
    };

    const copyCode = async () => {
        await navigator.clipboard.writeText(props.code[codeLang]);
    };

    return (
        <>
            {!props.embedded && (
                <div className="doc-section-code">
                    <div className="doc-section-code-buttons animate-scalein animate-duration-300">
                        {codeMode !== 'basic' && !props.hideToggleCode && codeMode !== 'data' && (
                            <>
                                <Button
                                    className={classNames('py-0 px-2 rounded-border h-8 shadow-none', {
                                        'code-active': codeLang === 'javascript' && codeMode !== 'data'
                                    })}
                                    label="JS"
                                    onClick={() => setCodeLang('javascript')}
                                    tooltip="JavaScript Code"
                                    tooltipOptions={{ position: 'bottom', className: 'doc-section-code-tooltip' }}
                                />
                                <Button
                                    className={classNames('py-0 px-2 rounded-border h-8 shadow-none', { 'code-active': codeLang === 'typescript' })}
                                    label="TS"
                                    onClick={() => setCodeLang('typescript')}
                                    tooltip="TypeScript Code"
                                    tooltipOptions={{ position: 'bottom', className: 'doc-section-code-tooltip' }}
                                />
                            </>
                        )}

                        {!props.hideToggleCode && (
                            <Button
                                type="button"
                                onClick={() => toggleCodeMode('javascript')}
                                className="h-8 w-8 p-0 inline-flex items-center justify-center shadow-none"
                                tooltip="Toggle Full Code"
                                tooltipOptions={{ position: 'bottom', className: 'doc-section-code-tooltip' }}
                            >
                                <i className="pi pi-code" />
                            </Button>
                        )}
                        {!props.hideToggleCode && props.code.data ? (
                            <Button
                                type="button"
                                onClick={() => setCodeMode('data')}
                                className="h-8 w-8 p-0 inline-flex items-center justify-center shadow-none"
                                tooltip="View Data"
                                tooltipOptions={{ position: 'bottom', className: 'doc-section-code-tooltip' }}
                            >
                                <i className="pi pi-database" />
                            </Button>
                        ) : null}
                        {!props.hideStackBlitz && (
                            <Button
                                type="button"
                                className="h-8 w-8 p-0 inline-flex items-center justify-center shadow-none"
                                tooltip="Edit in StackBlitz"
                                tooltipOptions={{ position: 'bottom', className: 'doc-section-code-tooltip' }}
                                onClick={() => codeEditor.openStackBlitz(codeLang)}
                            >
                                <svg role="img" viewBox="0 0 13 19" width={13} height={18} fill={'currentColor'} style={{ display: 'block' }}>
                                    <path d="M0 10.6533H5.43896L2.26866 18.1733L12.6667 7.463H7.1986L10.3399 0L0 10.6533Z" />
                                </svg>
                            </Button>
                        )}
                        <Button type="button" onClick={copyCode} className="h-8 w-8 p-0 inline-flex items-center justify-center shadow-none" tooltip="Copy Code" tooltipOptions={{ position: 'bottom', className: 'doc-section-code-tooltip' }}>
                            <i className="pi pi-copy" />
                        </Button>
                    </div>

                    {codeMode === 'basic' && (
                        <div className={props.codeClassName}>
                            <CodeHighlight code {...props}>
                                {props.code.basic}
                            </CodeHighlight>
                        </div>
                    )}
                    {codeMode === 'data' && (
                        <div className={props.codeClassName}>
                            <CodeHighlight code lang={'json'}>
                                {props.code.data}
                            </CodeHighlight>
                        </div>
                    )}
                    {codeMode !== 'basic' && codeLang === 'javascript' && (
                        <div className={props.codeClassName}>
                            <CodeHighlight code>{props.code.javascript}</CodeHighlight>
                        </div>
                    )}
                    {codeMode !== 'basic' && codeLang === 'typescript' && (
                        <div className={props.codeClassName}>
                            <CodeHighlight code lang={'tsx'}>
                                {props.code.typescript}
                            </CodeHighlight>
                        </div>
                    )}
                </div>
            )}
            {props.embedded && <div id="embed" />}
        </>
    );
}
