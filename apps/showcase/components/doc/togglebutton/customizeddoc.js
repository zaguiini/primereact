import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { ToggleButton } from 'primereact/togglebutton';
import { useState } from 'react';

export function CustomizedDoc(props) {
    const [checked, setChecked] = useState(false);

    const code = {
        basic: `
<ToggleButton onLabel="I confirm" offLabel="I reject" onIcon="pi pi-check" offIcon="pi pi-times"
    checked={checked} onChange={(e) => setChecked(e.value)} />
        `,
        javascript: `
import React, { useState } from "react";
import { ToggleButton } from 'primereact/togglebutton';

export default function CustomizedDemo() {
    const [checked, setChecked] = useState(false);

    return (
        <div className="card flex justify-center">
            <ToggleButton onLabel="I confirm" offLabel="I reject" onIcon="pi pi-check" offIcon="pi pi-times"
                checked={checked} onChange={(e) => setChecked(e.value)} className="w-36" />
        </div>
    );
}
        `,
        typescript: `
import React, { useState } from "react";
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';

export default function CustomizedDemo() {
    const [checked, setChecked] = useState<boolean>(false);

    return (
        <div className="card flex justify-center">
            <ToggleButton onLabel="I confirm" offLabel="I reject" onIcon="pi pi-check" offIcon="pi pi-times"
                checked={checked} onChange={(e:  ToggleButtonChangeEvent) => setChecked(e.value)} className="w-36" />
        </div>
    );
    `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    Icons and Labels can be customized using <i>onLabel</i>, <i>offLabel</i>, <i>onIcon</i> and <i>offIcon</i> properties.
                </p>
            </DocSectionText>
            <div className="card flex justify-center">
                <ToggleButton onLabel="I confirm" offLabel="I reject" onIcon="pi pi-check" offIcon="pi pi-times" checked={checked} onChange={(e) => setChecked(e.value)} className="w-36" />
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
