import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { Button } from 'primereact/button';

export function IconsDoc(props) {
    const code = {
        basic: `
<Button icon="pi pi-check" />
<Button label="Submit" icon="pi pi-check" />
<Button label="Submit" icon="pi pi-check" iconPos="right" />
        `,
        javascript: `
import React from 'react';
import { Button } from 'primereact/button';

export default function IconsDemo() {
    return (
        <div className="card flex flex-wrap justify-center gap-4">
            <Button icon="pi pi-check" />
            <Button label="Submit" icon="pi pi-check" />
            <Button label="Submit" icon="pi pi-check" iconPos="right" />
        </div>
    )
}
        `,
        typescript: `
import React from 'react';
import { Button } from 'primereact/button';

export default function IconsDemo() {
    return (
        <div className="card flex flex-wrap justify-center gap-4">
            <Button icon="pi pi-check" />
            <Button label="Submit" icon="pi pi-check" />
            <Button label="Submit" icon="pi pi-check" iconPos="right" />
        </div>
    )
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    Icon of a button is specified with <i>icon</i> property and position is configured using <i>iconPos</i> attribute.
                </p>
            </DocSectionText>
            <div className="card flex flex-wrap justify-center gap-4">
                <Button icon="pi pi-check" />
                <Button label="Submit" icon="pi pi-check" />
                <Button label="Submit" icon="pi pi-check" iconPos="right" />
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
