import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { useOverlayScrollListener } from '@/components/lib/hooks/Hooks';
import { Button } from 'primereact/button';
import { useEffect, useRef, useState } from 'react';

export function BasicDoc(props) {
    const [visible, setVisible] = useState(false);
    const buttonRef = useRef(null);

    const handleScroll = () => {
        setVisible(false);
    };

    const [bindOverlayScrollListener, unbindOverlayScrollListener] = useOverlayScrollListener({
        target: buttonRef.current,
        listener: handleScroll,
        options: { passive: true },
        when: visible
    });

    useEffect(() => {
        bindOverlayScrollListener();

        return () => {
            unbindOverlayScrollListener();
        };
    }, [bindOverlayScrollListener, unbindOverlayScrollListener]);

    const code = {
        basic: `
const [bindOverlayScrollListener, unbindOverlayScrollListener] = useOverlayScrollListener({
    target: buttonRef.current,
    listener: handleScroll,
    options: { passive: true },
    when: visible
});
        `,
        javascript: `
import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useOverlayScrollListener } from '@primereact/hooks';

export default function BasicDemo() {
    const [visible, setVisible] = useState(false);
    const buttonRef = useRef(null);

    const handleScroll = () => {
        setVisible(false);
    };

    const [bindOverlayScrollListener, unbindOverlayScrollListener] = useOverlayScrollListener({
        target: buttonRef.current,
        listener: handleScroll,
        options: { passive: true },
        when: visible
    });

    useEffect(() => {
        bindOverlayScrollListener();

        return () => {
            unbindOverlayScrollListener();
        };
    }, [bindOverlayScrollListener, unbindOverlayScrollListener]);

    return (
        <div className="card flex flex-col justify-center items-center gap-2">
                <div className="w-80 h-60 p-4 border-surface rounded-border border overflow-auto">
                    <div className="h-[30rem]">
                        <div className="relative">
                            <Button ref={buttonRef} onClick={() => setVisible(true)} label="Show" />
                            {visible ? <div className="absolute rounded-border shadow p-8 bg-surface-0 dark:bg-surface-900 z-20 whitespace-nowrap animate-scalein origin-top">Popup Content</div> : null}
                        </div>
                    </div>
                </div>
            </div>
    )
}
        `,
        typescript: `
import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useOverlayScrollListener } from '@primereact/hooks';

export default function BasicDemo() {
    const [visible, setVisible] = useState(false);
    const buttonRef = useRef(null);

    const handleScroll = () => {
        setVisible(false);
    };

    const [bindOverlayScrollListener, unbindOverlayScrollListener] = useOverlayScrollListener({
        target: buttonRef.current,
        listener: handleScroll,
        options: { passive: true },
        when: visible
    });

    useEffect(() => {
        bindOverlayScrollListener();

        return () => {
            unbindOverlayScrollListener();
        };
    }, [bindOverlayScrollListener, unbindOverlayScrollListener]);

    return (
        <div className="card flex flex-col justify-center items-center gap-2">
                <div className="w-80 h-60 p-4 border-surface rounded-border border overflow-auto">
                    <div className="h-[30rem]">
                        <div className="relative">
                            <Button ref={buttonRef} onClick={() => setVisible(true)} label="Show" />
                            {visible ? <div className="absolute rounded-border shadow p-8 bg-surface-0 dark:bg-surface-900 z-20 whitespace-nowrap animate-scalein origin-top">Popup Content</div> : null}
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
                <p>When any ancestor component of the button is scrolled, the overlay gets hidden. This is especially useful to avoid alignment issues when the overlay is attached to the document body via a Portal.</p>
            </DocSectionText>
            <div className="card flex flex-col justify-center items-center gap-2">
                <div className="w-80 h-60 p-4 border-surface rounded-border border overflow-auto">
                    <div className="h-[30rem]">
                        <div className="relative">
                            <Button ref={buttonRef} onClick={() => setVisible(true)} label="Show" />
                            {visible ? <div className="absolute rounded-border shadow p-8 bg-surface-0 dark:bg-surface-900 z-20 whitespace-nowrap animate-scalein origin-top">Popup Content</div> : null}
                        </div>
                    </div>
                </div>
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
