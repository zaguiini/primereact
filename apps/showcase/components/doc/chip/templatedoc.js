import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { Chip } from 'primereact/chip';

export function TemplateDoc(props) {
    const content = (
        <>
            <span className="bg-primary text-primary-contrast rounded-full w-8 h-8 flex items-center justify-center">P</span>
            <span className="ml-2 font-medium">PRIME</span>
        </>
    );

    const code = {
        basic: `
<Chip template={content} />
        `,
        javascript: `
import React from 'react';
import { Chip } from 'primereact/chip';

export default function TemplateDemo() {
    const content = (
        <>
            <span className="bg-primary text-primary-contrast rounded-full w-8 h-8 flex items-center justify-center">P</span>
            <span className="ml-2 font-medium">PRIME</span>
        </>
    );

    return (
        <div className="card">
            <Chip className="pl-0 pr-4" template={content} />
        </div>
    );
}
        `,
        typescript: `
import React from 'react';
import { Chip } from 'primereact/chip';

export default function TemplateDemo() {
    const content = (
        <>
            <span className="bg-primary text-primary-contrast rounded-full w-8 h-8 flex items-center justify-center">P</span>
            <span className="ml-2 font-medium">PRIME</span>
        </>
    );

    return (
        <div className="card">
            <Chip className="pl-0 pr-4" template={content} />
        </div>
    );
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    The <i>template</i> property allows displaying custom content inside a chip.
                </p>
            </DocSectionText>
            <div className="card">
                <Chip className="pl-0 pr-4" template={content} />
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
