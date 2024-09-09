import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { Ripple } from '@/components/lib/ripple/Ripple';

export function BasicDoc(props) {
    const code = {
        basic: `
<div className="bg-primary text-primary-contrast flex select-none justify-center items-center shadow rounded-border p-12 font-bold p-ripple">
    Click Me
    <Ripple />
</div>
        `,
        javascript: `
import React from 'react';
import { Ripple } from 'primereact/ripple';

export default function BasicDemo() {
    return (
        <div className="card flex justify-center items-center">
            <div className="bg-primary text-primary-contrast flex select-none justify-center items-center shadow rounded-border p-12 font-bold p-ripple">
                Click Me
                <Ripple />
            </div>
        </div>
    );
}
        `,
        typescript: `
import React from 'react';
import { Ripple } from 'primereact/ripple';

export default function BasicDemo() {
    return (
        <div className="card flex justify-center items-center">
            <div className="bg-primary text-primary-contrast flex select-none justify-center items-center shadow rounded-border p-12 font-bold p-ripple">
                Click Me
                <Ripple />
            </div>
        </div>
    );
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    Ripple is enabled by adding the component as a child and applying <i>p-ripple</i> class to the element.
                </p>
            </DocSectionText>
            <div className="card flex justify-center items-center">
                <div className="bg-primary text-primary-contrast flex select-none justify-center items-center shadow rounded-border p-12 font-bold p-ripple">
                    Click Me
                    <Ripple />
                </div>
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
