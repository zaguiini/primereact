import { useEffect, useRef } from 'react';

export function CodeHighlight(props) {
    const codeRef = useRef();
    const languageClassName = `language-${props.lang || 'jsx'}`;

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Prism) {
            window.Prism.highlightElement(codeRef.current);
        }
    }, [props.children]);

    return (
        <pre style={props.style} tabIndex="-1">
            <code ref={codeRef} className={languageClassName}>
                {props.children}
            </code>
        </pre>
    );
}
