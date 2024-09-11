import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { Skeleton } from 'primereact/skeleton';

export function CardDoc(props) {
    const code = {
        basic: `
<div className="rounded-border border border-surface p-6 bg-surface-0 dark:bg-surface-900">
    <div className="flex mb-4">
        <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
        <div>
            <Skeleton width="10rem" className="mb-2"></Skeleton>
            <Skeleton width="5rem" className="mb-2"></Skeleton>
            <Skeleton height=".5rem"></Skeleton>
        </div>
    </div>
    <Skeleton width="100%" height="150px"></Skeleton>
    <div className="flex justify-between mt-4">
        <Skeleton width="4rem" height="2rem"></Skeleton>
        <Skeleton width="4rem" height="2rem"></Skeleton>
    </div>
</div>
        `,
        javascript: `
import React from 'react';
import { Skeleton } from 'primereact/skeleton';

export default function CardDemo() {
    return (
        <div className="card">
            <div className="rounded-border border border-surface p-6 bg-surface-0 dark:bg-surface-900">
                <div className="flex mb-4">
                    <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                    <div>
                        <Skeleton width="10rem" className="mb-2"></Skeleton>
                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                        <Skeleton height=".5rem"></Skeleton>
                    </div>
                </div>
                <Skeleton width="100%" height="150px"></Skeleton>
                <div className="flex justify-between mt-4">
                    <Skeleton width="4rem" height="2rem"></Skeleton>
                    <Skeleton width="4rem" height="2rem"></Skeleton>
                </div>
            </div>
        </div>
    );
}
        `,
        typescript: `
import React from 'react';
import { Skeleton } from 'primereact/skeleton';

export default function CardDemo() {
    return (
        <div className="card">
            <div className="rounded-border border border-surface p-6 bg-surface-0 dark:bg-surface-900">
                <div className="flex mb-4">
                    <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                    <div>
                        <Skeleton width="10rem" className="mb-2"></Skeleton>
                        <Skeleton width="5rem" className="mb-2"></Skeleton>
                        <Skeleton height=".5rem"></Skeleton>
                    </div>
                </div>
                <Skeleton width="100%" height="150px"></Skeleton>
                <div className="flex justify-between mt-4">
                    <Skeleton width="4rem" height="2rem"></Skeleton>
                    <Skeleton width="4rem" height="2rem"></Skeleton>
                </div>
            </div>
        </div>
    );
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>Sample Card implementation using different Skeleton components and PrimeFlex CSS utilities.</p>
            </DocSectionText>
            <div className="card">
                <div className="rounded-border border border-surface p-6 bg-surface-0 dark:bg-surface-900">
                    <div className="flex mb-4">
                        <Skeleton shape="circle" size="4rem" className="mr-2" />
                        <div>
                            <Skeleton width="10rem" className="mb-2" />
                            <Skeleton width="5rem" className="mb-2" />
                            <Skeleton height=".5rem" />
                        </div>
                    </div>
                    <Skeleton width="100%" height="150px" />
                    <div className="flex justify-between mt-4">
                        <Skeleton width="4rem" height="2rem" />
                        <Skeleton width="4rem" height="2rem" />
                    </div>
                </div>
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
