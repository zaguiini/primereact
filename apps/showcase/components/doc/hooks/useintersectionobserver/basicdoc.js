import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { useIntersectionObserver } from '@/components/lib/hooks/Hooks';
import { classNames } from '@/components/lib/utils/Utils';
import { useRef } from 'react';

export function BasicDoc(props) {
    const elementRef = useRef(null);
    const visible = useIntersectionObserver(elementRef);

    const code = {
        basic: `
const elementRef = useRef(null);
const visible = useIntersectionObserver(elementRef);
        `,
        javascript: `
import React, { useRef } from 'react';
import { useIntersectionObserver } from '@primereact/hooks';
import { classNames } from 'primereact/utils';

export default function BasicDemo() {
    const elementRef = useRef(null);
    const visible = useIntersectionObserver(elementRef);

    return (
        <div className="card flex flex-col items-center">
            <div className="text-xl font-bold mb-4">{visible ? 'Visible' : 'Not Visible'}</div>
            <div className="border-dashed border-surface rounded-border w-80 overflow-y-scroll p-4" style={{ height: '300px' }}>
                <div className="flex items-center" style={{ height: '900px' }}>
                    <div ref={elementRef} className={classNames('w-full h-32 rounded-border p-4 text-white font-bold bg-primary text-primary-contrast flex items-center justify-center')}>
                        <i className="pi pi-prime text-4xl"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
        `,
        typescript: `
import React, { useRef } from 'react';
import { useIntersectionObserver } from '@primereact/hooks';
import { classNames } from 'primereact/utils';

export default function BasicDemo() {
    const elementRef = useRef(null);
    const visible = useIntersectionObserver(elementRef);

    return (
        <div className="card flex flex-col items-center">
            <div className="text-xl font-bold mb-4">{visible ? 'Visible' : 'Not Visible'}</div>
            <div className="border-dashed border-surface rounded-border w-80 overflow-y-scroll p-4" style={{ height: '300px' }}>
                <div className="flex items-center" style={{ height: '900px' }}>
                    <div ref={elementRef} className={classNames('w-full h-32 rounded-border p-4 text-white font-bold bg-primary text-primary-contrast flex items-center justify-center')}>
                        <i className="pi pi-prime text-4xl"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>Scroll the parent to view the child element.</p>
            </DocSectionText>
            <div className="card flex flex-col items-center">
                <div className="text-xl font-bold mb-4">{visible ? 'Visible' : 'Not Visible'}</div>
                <div className="border-dashed border-surface rounded-border w-80 overflow-y-scroll p-4" style={{ height: '300px' }}>
                    <div className="flex items-center" style={{ height: '900px' }}>
                        <div ref={elementRef} className={classNames('w-full h-32 rounded-border p-4 text-white font-bold bg-primary text-primary-contrast flex items-center justify-center')}>
                            <i className="pi pi-prime text-4xl" />
                        </div>
                    </div>
                </div>
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
