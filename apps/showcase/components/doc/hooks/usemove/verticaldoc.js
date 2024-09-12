import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { useMove } from '../../../../components/lib/hooks/Hooks';

export function VerticalDoc(props) {
    const { ref, y } = useMove({ initialValue: { y: 0.2 }, mode: 'vertical' });

    const code = {
        basic: `
const { ref, y } = useMove({ initialValue: { y: 0.2 } });
        `,
        javascript: `
import React from 'react';
import {useMove } from '@primereact/hooks';

export default function VerticalDemo() {
    const { ref, y } = useMove({ initialValue: { y: 0.2 }, mode: 'vertical' });

    return (
        <div className="card flex flex-col justify-center items-center gap-4">
            <div ref={ref} className="flex items-center justify-center relative bg-surface-50 dark:bg-surface-950 h-56 z-10" style={{ width: '8px' }}>
                <div className="absolute bg-purple-500 z-20"
                    style={{
                        bottom: 0,
                        width: '8px',
                        height: \`\${y * 100}%\`
                    }}>
                </div>
                <div className='absolute block rounded-full border-solid border-2 border-purple -mb-2 bg-surface-0 dark:bg-surface-900 z-30'
                    style={{
                        width: '18px',
                        height: '18px',
                        bottom: \`calc(\${y * 100}%)\`,
                        cursor: 'grab'
                    }}>
                </div>
            </div>
            <span className="text-xl">
                Value: <strong>{Math.round(y * 100)}</strong>
            </span>
        </div>
    )
}
        `,
        typescript: `
import React from 'react';
import {useMove } from '@primereact/hooks';

export default function VerticalDemo() {
    const { ref, y } = useMove({ initialValue: { y: 0.2 }, mode: 'vertical' });

    return (
        <div className="card flex flex-col justify-center items-center gap-4">
            <div ref={ref} className="flex items-center justify-center relative bg-surface-50 dark:bg-surface-950 h-56 z-10" style={{ width: '8px' }}>
                <div className="absolute bg-purple-500 z-20"
                    style={{
                        bottom: 0,
                        width: '8px',
                        height: \`\${y * 100}%\`
                    }}>
                </div>
                <div className='absolute block rounded-full border-solid border-2 border-purple -mb-2 bg-surface-0 dark:bg-surface-900 z-30'
                    style={{
                        width: '18px',
                        height: '18px',
                        bottom: \`calc(\${y * 100}%)\`,
                        cursor: 'grab'
                    }}>
                </div>
            </div>
            <span className="text-xl">
                Value: <strong>{Math.round(y * 100)}</strong>
            </span>
        </div>
    )
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>A vertical slider implementation by utilizing the y-axis only.</p>
            </DocSectionText>
            <div className="card flex flex-col justify-center items-center gap-4">
                <div ref={ref} className="flex items-center justify-center relative bg-surface-50 dark:bg-surface-950 h-56 z-10" style={{ width: '8px' }}>
                    <div
                        className="absolute bg-purple-500 z-20"
                        style={{
                            bottom: 0,
                            width: '8px',
                            height: `${y * 100}%`
                        }}
                    />
                    <div
                        className="absolute block rounded-full border-solid border-2 border-purple-500 -mb-2 bg-surface-0 dark:bg-surface-900 z-30"
                        style={{
                            width: '18px',
                            height: '18px',
                            bottom: `calc(${y * 100}%)`,
                            cursor: 'grab'
                        }}
                    />
                </div>
                <span className="text-xl">
                    Value: <strong>{Math.round(y * 100)}</strong>
                </span>
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
