import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { ToggleButton } from 'primereact/togglebutton';
import { useState } from 'react';

export function DisabledDoc(props) {
    const [checked, setChecked] = useState(false);

    const code = {
        basic: `
<ToggleButton disabled checked={checked} onChange={(e) => setChecked(e.value)} />
        `,
        javascript: `
import React, { useState } from "react";
import { ToggleButton } from 'primereact/togglebutton';

export default function DisabledDemo() {
    const [checked, setChecked] = useState(false);

    return (
        <div className="card flex justify-center">
            <ToggleButton disabled checked={checked} onChange={(e) => setChecked(e.value)} className="w-32" />
        </div>
    );
}
        `,
        typescript: `
import React, { useState } from "react";
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';

export default function DisabledDemo() {
    const [checked, setChecked] = useState<boolean>(false);

    return (
        <div className="card flex justify-center">
            <ToggleButton disabled checked={checked} onChange={(e: ToggleButtonChangeEvent) => setChecked(e.value)} className="w-32" />
        </div>
    );
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    When <i>disabled</i> is present, the element cannot be edited and focused.
                </p>
            </DocSectionText>
            <div className="card flex justify-center">
                <ToggleButton disabled checked={checked} onChange={(e) => setChecked(e.value)} className="w-32" />
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
