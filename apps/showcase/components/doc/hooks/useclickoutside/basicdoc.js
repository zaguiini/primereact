import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { useClickOutside } from '@/components/lib/hooks/Hooks';
import { Button } from 'primereact/button';
import { useRef, useState } from 'react';

export function BasicDoc(props) {
    const [visible, setVisible] = useState(false);
    const overlayRef = useRef(null);

    useClickOutside(overlayRef, () => {
        setVisible(false);
    });

    const code = {
        basic: `
<div className="relative">
    <Button onClick={() => setVisible(true)} label="Show" />
    {visible ? (
        <div ref={overlayRef} className="absolute rounded-border shadow p-8 bg-surface-0 dark:bg-surface-900 z-20 whitespace-nowrap animate-scalein origin-top">
            Popup Content
        </div>
    ) : null}
</div>
        `,
        javascript: `
import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { useClickOutside } from '@primereact/hooks';

export default function BasicDemo() {
    const [visible, setVisible] = useState(false);
    const overlayRef = useRef(null);

    useClickOutside(overlayRef, () => {
        setVisible(false);
    });

    return (
        <div className="relative">
            <Button onClick={() => setVisible(true)} label="Show" />
            {visible ? (
                <div ref={overlayRef} className="absolute rounded-border shadow p-8 bg-surface-0 dark:bg-surface-900 z-20 whitespace-nowrap animate-scalein origin-top">
                    Popup Content
                </div>
            ) : null}
        </div>
    )
}
        `,
        typescript: `
import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { useClickOutside } from '@primereact/hooks';

export default function BasicDemo() {
    const [visible, setVisible] = useState<boolean>(false);
    const overlayRef = useRef(null);

    useClickOutside(overlayRef, () => {
        setVisible(false);
    });

    return (
        <div className="relative">
            <Button onClick={() => setVisible(true)} label="Show" />
            {visible ? (
                <div ref={overlayRef} className="absolute rounded-border shadow p-8 bg-surface-0 dark:bg-surface-900 z-20 whitespace-nowrap animate-scalein origin-top">
                    Popup Content
                </div>
            ) : null}
        </div>
    )
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>Click the button to display a popup and click outside to hide it.</p>
            </DocSectionText>

            <div className="card flex justify-center">
                <div className="relative">
                    <Button onClick={() => setVisible(true)} label="Show" />
                    {visible ? (
                        <div ref={overlayRef} className="absolute rounded-border shadow p-8 bg-surface-0 dark:bg-surface-900 z-20 whitespace-nowrap animate-scalein origin-top">
                            Popup Content
                        </div>
                    ) : null}
                </div>
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
