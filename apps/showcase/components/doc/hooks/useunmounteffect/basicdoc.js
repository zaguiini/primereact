import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { useUnmountEffect } from '@/components/lib/hooks/Hooks';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';

export function BasicDoc(props) {
    const [hidden, setHidden] = useState(false);
    const toast = useRef(null);

    const DynamicBox = () => {
        useUnmountEffect(() => {
            toast.current && toast.current.show({ severity: 'info', summary: 'Unmounted' });
        });

        return <div className="w-32 h-32 rounded-border bg-primary text-primary-contrast border border-primary mb-4 flex justify-center items-center">Mounted</div>;
    };

    const code = {
        basic: `
useUnmountEffect(() => {
    toast.current && toast.current.show({ severity: 'info', summary: 'Unmounted' });
});
        `,
        javascript: `
import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { useUnmountEffect, useMountEffect } from '@primereact/hooks';

export default function BasicDemo() {
    const [hidden, setHidden] = useState(false);
    const toast = useRef(null);

    const DynamicBox = () => {
        useUnmountEffect(() => {
            toast.current && toast.current.show({ severity: 'info', summary: 'Unmounted' });
        });

        return <div className="w-32 h-32 rounded-border bg-primary text-primary-contrast border border-primary mb-4 flex justify-center items-center">Mounted</div>;
    };

    return (
        <>
            <Toast ref={toast} />
            <div className="card flex flex-col items-center">
                {!hidden ? <DynamicBox /> : <div className="w-32 h-32 rounded-border bg-surface-0 dark:bg-surface-900 border border-surface border-dashed mb-4 flex justify-center items-center">Unmounted</div>}
                <Button label={hidden ? 'Mount' : 'Unmount'} onClick={() => setHidden(() => !hidden)} className="p-button-outlined w-40" />
            </div>
        </>
    )
}
        `,
        typescript: `
import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { useUnmountEffect, useMountEffect } from '@primereact/hooks';

export default function BasicDemo() {
    const [hidden, setHidden] = useState<boolean>(false);
    const toast = useRef(null);

    const DynamicBox = () => {
        useUnmountEffect(() => {
            toast.current && toast.current.show({ severity: 'info', summary: 'Unmounted' });
        });

        return <div className="w-32 h-32 rounded-border bg-primary text-primary-contrast border border-primary mb-4 flex justify-center items-center">Mounted</div>;
    };

    return (
        <>
            <Toast ref={toast} />
            <div className="card flex flex-col items-center">
                {!hidden ? <DynamicBox /> : <div className="w-32 h-32 rounded-border bg-surface-0 dark:bg-surface-900 border border-surface border-dashed mb-4 flex justify-center items-center">Unmounted</div>}
                <Button label={hidden ? 'Mount' : 'Unmount'} onClick={() => setHidden(() => !hidden)} className="p-button-outlined w-40" />
            </div>
        </>
    )
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>A messages is displayed at browser console when the box is unmounted.</p>
            </DocSectionText>
            <Toast ref={toast} />
            <div className="card flex flex-col items-center">
                {!hidden ? <DynamicBox /> : <div className="w-32 h-32 rounded-border bg-surface-0 dark:bg-surface-900 border border-surface border-dashed mb-4 flex justify-center items-center">Unmounted</div>}
                <Button label={hidden ? 'Mount' : 'Unmount'} onClick={() => setHidden(() => !hidden)} className="p-button-outlined w-40" />
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
