import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { ProgressSpinner } from 'primereact/progressspinner';

export function BasicDoc(props) {
    const code = {
        basic: `
<ProgressSpinner />
        `,
        javascript: `
import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function BasicDemo() {
    return (
        <div className="card flex justify-center">
            <ProgressSpinner />
        </div>
    );
}
        `,
        typescript: `
import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function BasicDemo() {
    return (
        <div className="card flex justify-center">
            <ProgressSpinner />
        </div>
    );
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>An infinite spin animation is displayed by default.</p>
            </DocSectionText>
            <div className="card flex justify-center">
                <ProgressSpinner />
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
