import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { Button } from 'primereact/button';

export function TemplateDoc(props) {
    const code = {
        basic: `
<Button className="bg-slate-600 hover:bg-slate-400 border-slate-700">
    <img alt="logo" src="https://primefaces.org/cdn/primereact/images/primereact-logo-light.svg" className="h-8"></img>
</Button>
        `,
        javascript: `
import React from 'react';
import { Button } from 'primereact/button';

export default function TemplateDemo() {
    return (
        <div className="card flex justify-center">
            <Button className="bg-slate-600 hover:bg-slate-400 border-slate-700">
                <img alt="logo" src="https://primefaces.org/cdn/primereact/images/primereact-logo-light.svg" className="h-8"></img>
            </Button>
        </div>
    )
}
        `,
        typescript: `
import React from 'react';
import { Button } from 'primereact/button';

export default function TemplateDemo() {
    return (
        <div className="card flex justify-center">
            <Button className="bg-slate-600 hover:bg-slate-400 border-slate-700">
                <img alt="logo" src="https://primefaces.org/cdn/primereact/images/primereact-logo-light.svg" className="h-8"></img>
            </Button>
        </div>
    )
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>Custom content inside a button is defined as children.</p>
            </DocSectionText>
            <div className="card flex justify-center">
                <Button className="bg-slate-600 hover:bg-slate-400 border-slate-700">
                    <img alt="logo" src="https://primefaces.org/cdn/primereact/images/primereact-logo-light.svg" className="h-8" />
                </Button>
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
