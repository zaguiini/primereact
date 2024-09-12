import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { useMove } from '../../../../components/lib/hooks/Hooks';

export function HorizontalDoc(props) {
    const { ref, x } = useMove({ initialValue: { x: 0.2 } });

    const code = {
        basic: `
const { ref, x } = useMove({ initialValue: { x: 0.2 } });
        `,
        javascript: `
import React from 'react';
import {useMove } from '@primereact/hooks';

export default function HorizontalDemo() {
    const { ref, x } = useMove({ initialValue: { x: 0.2 } });

    return (
        <div className="card flex flex-col items-center gap-4">
            <div ref={ref} className="flex items-center justify-center relative bg-surface-50 dark:bg-surface-950 w-56 z-10" style={{ height: '8px' }}>
                <div className="absolute bg-teal-500 z-20"
                    style={{
                        left: 0,
                        width: \`\${x * 100}%\`,
                        height: '8px'
                    }}>
                </div>
                <div className="absolute block rounded-full border-solid border-2 border-teal-500 -ml-2 bg-surface-0 dark:bg-surface-900 z-30"
                    style={{
                        width: '18px',
                        height: '18px',
                        left: \`calc(\${x * 100}%)\`,
                        cursor: 'grab'
                    }}>
                </div>
            </div>
            <span className="text-xl">
                Value: <strong>{Math.round(x * 100)}</strong>
            </span>
        </div>
    )
}
        `,
        typescript: `
import React from 'react';
import {useMove } from '@primereact/hooks';

export default function HorizontalDemo() {
    const { ref, x } = useMove({ initialValue: { x: 0.2 } });

    return (
        <div className="card flex flex-col items-center gap-4">
            <div ref={ref} className="flex items-center justify-center relative bg-surface-50 dark:bg-surface-950 w-56 z-10" style={{ height: '8px' }}>
                <div className="absolute bg-teal-500 z-20"
                    style={{
                        left: 0,
                        width: \`\${x * 100}%\`,
                        height: '8px'
                    }}>
                </div>
                <div className="absolute block rounded-full border-solid border-2 border-teal-500 -ml-2 bg-surface-0 dark:bg-surface-900 z-30"
                    style={{
                        width: '18px',
                        height: '18px',
                        left: \`calc(\${x * 100}%)\`,
                        cursor: 'grab'
                    }}>
                </div>
            </div>
            <span className="text-xl">
                Value: <strong>{Math.round(x * 100)}</strong>
            </span>
        </div>
    )
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>A horizontal slider implementation by utilizing the x-axis only.</p>
            </DocSectionText>
            <div className="card flex flex-col items-center gap-4">
                <div ref={ref} className="flex items-center justify-center relative bg-surface-50 dark:bg-surface-950 w-56 z-10" style={{ height: '8px' }}>
                    <div
                        className="absolute bg-teal-500 z-20"
                        style={{
                            left: 0,
                            width: `${x * 100}%`,
                            height: '8px'
                        }}
                    />
                    <div
                        className="absolute block rounded-full border-solid border-2 border-teal-500 -ml-2 bg-surface-0 dark:bg-surface-900 z-30"
                        style={{
                            width: '18px',
                            height: '18px',
                            left: `calc(${x * 100}%)`,
                            cursor: 'grab'
                        }}
                    />
                </div>
                <span className="text-xl">
                    Value: <strong>{Math.round(x * 100)}</strong>
                </span>
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
