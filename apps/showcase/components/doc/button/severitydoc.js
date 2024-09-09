import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { Button } from 'primereact/button';

export function SeverityDoc(props) {
    const code = {
        basic: `
<Button label="Primary" />
<Button label="Secondary" severity="secondary" />
<Button label="Success" severity="success" />
<Button label="Info" severity="info" />
<Button label="Warning" severity="warning" />
<Button label="Help" severity="help" />
<Button label="Danger" severity="danger" />
        `,
        javascript: `
import React from 'react';
import { Button } from 'primereact/button';

export default function SeverityDemo() {
    return (
        <div className="card flex flex-wrap justify-center gap-4">
            <Button label="Primary" />
            <Button label="Secondary" severity="secondary" />
            <Button label="Success" severity="success" />
            <Button label="Info" severity="info" />
            <Button label="Warning" severity="warning" />
            <Button label="Help" severity="help" />
            <Button label="Danger" severity="danger" />
        </div>
    )
}
        `,
        typescript: `
import React from 'react';
import { Button } from 'primereact/button';

export default function SeverityDemo() {
    return (
        <div className="card flex flex-wrap justify-center gap-4">
            <Button label="Primary" />
            <Button label="Secondary" severity="secondary" />
            <Button label="Success" severity="success" />
            <Button label="Info" severity="info" />
            <Button label="Warning" severity="warning" />
            <Button label="Help" severity="help" />
            <Button label="Danger" severity="danger" />
        </div>
    )
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>Severity defines the type of button.</p>
            </DocSectionText>
            <div className="card flex flex-wrap justify-center gap-4">
                <Button label="Primary" />
                <Button label="Secondary" severity="secondary" />
                <Button label="Success" severity="success" />
                <Button label="Info" severity="info" />
                <Button label="Warning" severity="warning" />
                <Button label="Help" severity="help" />
                <Button label="Danger" severity="danger" />
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
