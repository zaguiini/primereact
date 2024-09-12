import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { useIntersectionObserver } from '@/components/lib/hooks/Hooks';
import { classNames } from '@/components/lib/utils/Utils';
import { useRef } from 'react';

export function ThresholdDoc(props) {
    const elementRef = useRef(null);
    const visible = useIntersectionObserver(elementRef, { threshold: 0.5 });

    const code = {
        basic: `
const elementRef = useRef(null);
const visible = useIntersectionObserver(elementRef, { threshold: 0.5 });
        `,
        javascript: `
import React, { useRef } from 'react';
import { useIntersectionObserver } from '@primereact/hooks';
import { classNames } from 'primereact/utils';

export default function ThresholdDemo() {
    const elementRef = useRef(null);
    const visible = useIntersectionObserver(elementRef, { threshold: 0.5 });

    return (
        <div className="card flex flex-col items-center">
            <div className="text-xl font-bold mb-4">{visible ? 'Visible' : 'Not Visible'}</div>
            <div className="border-dashed border-surface rounded-border w-80 overflow-y-scroll p-4" style={{ height: '300px' }}>
                <div className="flex items-center" style={{ height: '900px' }}>
                    <div ref={elementRef} className={classNames('w-full h-32 rounded-border p-4 font-bold border border-primary flex items-center justify-center transition-all duration-300', { 'bg-primary text-primary-contrast': visible })}>
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

export default function ThresholdDemo() {
    const elementRef = useRef(null);
    const visible = useIntersectionObserver(elementRef, { threshold: 0.5 });

    return (
        <div className="card flex flex-col items-center">
            <div className="text-xl font-bold mb-4">{visible ? 'Visible' : 'Not Visible'}</div>
            <div className="border-dashed border-surface rounded-border w-80 overflow-y-scroll p-4" style={{ height: '300px' }}>
                <div className="flex items-center" style={{ height: '900px' }}>
                    <div ref={elementRef} className={classNames('w-full h-32 rounded-border p-4 font-bold border border-primary flex items-center justify-center transition-all duration-300', { 'bg-primary text-primary-contrast': visible })}>
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
                <p>
                    The <i>threshold</i> option defines the percentage of how much of the element should be visible, for example <i>0.5</i> means at least half of the element.
                </p>
            </DocSectionText>
            <div className="card flex flex-col items-center">
                <div className="text-xl font-bold mb-4">{visible ? 'Visible' : 'Not Visible'}</div>
                <div className="border-dashed border-surface rounded-border w-80 overflow-y-scroll p-4" style={{ height: '300px' }}>
                    <div className="flex items-center" style={{ height: '900px' }}>
                        <div ref={elementRef} className={classNames('w-full h-32 rounded-border p-4 font-bold border border-primary flex items-center justify-center transition-all duration-300', { 'bg-primary text-primary-contrast': visible })}>
                            <i className="pi pi-prime text-4xl" />
                        </div>
                    </div>
                </div>
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
