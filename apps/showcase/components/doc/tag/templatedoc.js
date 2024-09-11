import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { Tag } from 'primereact/tag';

export function TemplateDoc(props) {
    const code = {
        basic: `
<Tag style={{background: 'linear-gradient(-225deg,#AC32E4 0%,#7918F2 48%,#4801FF 100%)'}}>
    <div className="flex items-center gap-2">
        <img alt="Country" src="/images/flag/flag_placeholder.png" className="flag flag-it" style={{ width: '18px' }}/>
        <span className="text-base">Italy</span>
        <i className="pi pi-times text-xs"></i>
    </div>
</Tag>
        `,
        javascript: `
import React from 'react';
import { Tag } from 'primereact/tag';

export default function TemplateDemo() {
    return (
        <Tag style={{background: 'linear-gradient(-225deg,#AC32E4 0%,#7918F2 48%,#4801FF 100%)'}}>
            <div className="flex items-center gap-2">
                <img alt="Country" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
                    className="flag flag-it" style={{ width: '18px' }}/>
                <span className="text-base">Italy</span>
                <i className="pi pi-times text-xs"></i>
            </div>
        </Tag>
    );
}
        `,
        typescript: `
import React from 'react';
import { Tag } from 'primereact/tag';

export default function TemplateDemo() {
    return (
        <Tag style={{background: 'linear-gradient(-225deg,#AC32E4 0%,#7918F2 48%,#4801FF 100%)'}}>
            <div className="flex items-center gap-2">
                <img alt="Country" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
                    className="flag flag-it" style={{ width: '18px' }}/>
                <span className="text-base">Italy</span>
                <i className="pi pi-times text-xs"></i>
            </div>
        </Tag>
    );
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>Children of the component are passed as the content for templating.</p>
            </DocSectionText>
            <div className="card flex justify-center">
                <Tag style={{ border: '2px solid var(--border-color)', background: 'transparent', color: 'var(--text-color)' }}>
                    <div className="flex items-center gap-2 px-1">
                        <img alt="Country" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" class="flag flag-it" style={{ width: '18px' }} />
                        <span className="text-base">Italy</span>
                    </div>
                </Tag>
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
