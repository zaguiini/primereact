import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { classNames } from '@/components/lib/utils/Utils';
import { Button } from 'primereact/button';
import { useMove } from '../../../../components/lib/hooks/Hooks';

export function BasicDoc(props) {
    const { ref, x, y, active, reset } = useMove({ initialValue: { x: 0.2, y: 0.6 } });

    const code = {
        basic: `
const { ref, x, y, active, reset } = useMove({ initialValue: { x: 0.2, y: 0.6 } });
        `,
        javascript: `
import React from 'react';
import { useMove } from '@primereact/hooks';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

export default function BasicDemo() {
    const { ref, x, y, active, reset } = useMove({ initialValue: { x: 0.2, y: 0.6 } });

    return (
        <div className="card flex flex-col items-center gap-4">
            <div className="flex gap-4 text-xl">
                <span>
                    X: <strong>{\`\${Math.round(x * 100)}\`}</strong>
                </span>
                <span>
                    Y: <strong>{\`\${Math.round(y * 100)}\`}</strong>
                </span>
            </div>
            <div ref={ref} className="relative w-56 h-32 bg-surface-50 dark:bg-surface-950 rounded-border">
                <div className={classNames('absolute rounded-full w-8 h-8 flex items-center justify-center', { 'bg-green-500': active, 'bg-primary text-primary-contrast': !active })}
                    style={{
                        left: \`calc(\${x * 100}% - 1rem)\`,
                        top: \`calc(\${y * 100}% - 1rem)\`,
                        cursor: 'grab'
                    }}>
                    <i className="pi pi-arrows-alt"></i>
                </div>
            </div>
            <Button onClick={reset} label="Reset" className="p-button-outlined"></Button>
        </div>
    )
}
        `,
        typescript: `
import React from 'react';
import { useMove } from '@primereact/hooks';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

export default function BasicDemo() {
    const { ref, x, y, active, reset } = useMove({ initialValue: { x: 0.2, y: 0.6 } });

    return (
        <div className="card flex flex-col items-center gap-4">
            <div className="flex gap-4 text-xl">
                <span>
                    X: <strong>{\`\${Math.round(x * 100)}\`}</strong>
                </span>
                <span>
                    Y: <strong>{\`\${Math.round(y * 100)}\`}</strong>
                </span>
            </div>
            <div ref={ref} className="relative w-56 h-32 bg-surface-50 dark:bg-surface-950 rounded-border">
                <div className={classNames('absolute rounded-full w-8 h-8 flex items-center justify-center', { 'bg-green-500': active, 'bg-primary text-primary-contrast': !active })}
                    style={{
                        left: \`calc(\${x * 100}% - 1rem)\`,
                        top: \`calc(\${y * 100}% - 1rem)\`,
                        cursor: 'grab'
                    }}>
                    <i className="pi pi-arrows-alt"></i>
                </div>
            </div>
            <Button onClick={reset} label="Reset" className="p-button-outlined"></Button>
        </div>
    )
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>Drag the marker over the element to track the position.</p>
            </DocSectionText>
            <div className="card flex flex-col items-center gap-4">
                <div className="flex gap-4 text-xl">
                    <span>
                        X: <strong>{`${Math.round(x * 100)}`}</strong>
                    </span>
                    <span>
                        Y: <strong>{`${Math.round(y * 100)}`}</strong>
                    </span>
                </div>
                <div ref={ref} className="relative w-56 h-32 bg-surface-50 dark:bg-surface-950 rounded-border">
                    <div
                        className={classNames('absolute rounded-full w-8 h-8 flex items-center justify-center', { 'bg-green-500': active, 'bg-primary text-primary-contrast': !active })}
                        style={{
                            left: `calc(${x * 100}% - 1rem)`,
                            top: `calc(${y * 100}% - 1rem)`,
                            cursor: 'grab'
                        }}
                    >
                        <i className="pi pi-arrows-alt" />
                    </div>
                </div>
                <Button onClick={reset} label="Reset" className="p-button-outlined" />
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
