import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { useOverlayListener } from '@/components/lib/hooks/Hooks';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { useEffect, useRef, useState } from 'react';

export function BasicDoc(props) {
    const [visible, setVisible] = useState(false);
    const buttonRef = useRef(null);
    const overlayRef = useRef(null);

    const handleEvents = (event, options) => {
        if (options.valid) {
            setVisible(false);
        }
    };

    const [bindOverlayListener, unbindOverlayListener] = useOverlayListener({
        target: buttonRef.current,
        overlay: overlayRef.current,
        listener: handleEvents,
        options: { passive: true },
        when: visible
    });

    useEffect(() => {
        bindOverlayListener();

        return () => {
            unbindOverlayListener();
        };
    }, [bindOverlayListener, unbindOverlayListener]);

    const code = {
        basic: `
const [bindOverlayListener, unbindOverlayListener] = useOverlayListener({
    target: buttonRef.current,
    overlay: overlayRef.current,
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
    const overlayRef = useRef(null);

    const handleEvents = (event, options) => {
        if (options.valid) setVisible(false);
    };

    const [bindOverlayListener, unbindOverlayListener] = useOverlayListener({
        target: buttonRef.current,
        overlay: overlayRef.current,
        listener: handleEvents,
        options: { passive: true },
        when: visible
    });

    useEffect(() => {
        bindOverlayListener();

        return () => {
            unbindOverlayListener();
        };
    }, [bindOverlayListener, unbindOverlayListener]);

    return (
        <div className="card flex flex-col justify-center items-center gap-2">
            <div className="w-80 h-60 p-4 border-surface rounded-border border overflow-auto">
                <div className="h-[30rem]">
                    <div className="relative">
                        <Button ref={buttonRef} onClick={() => setVisible(true)} label="Show" />
                        {visible ? (
                            <div ref={overlayRef} className="absolute rounded-border shadow p-8 bg-surface-0 dark:bg-surface-900 z-20 whitespace-nowrap animate-scalein origin-top">
                                Popup Content
                            </div>
                        ) : null}
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
    const overlayRef = useRef(null);

    const handleEvents = (event, options) => {
        if (options.valid) setVisible(false);
    };

    const [bindOverlayListener, unbindOverlayListener] = useOverlayListener({
        target: buttonRef.current,
        overlay: overlayRef.current,
        listener: handleEvents,
        options: { passive: true },
        when: visible
    });

    useEffect(() => {
        bindOverlayListener();

        return () => {
            unbindOverlayListener();
        };
    }, [bindOverlayListener, unbindOverlayListener]);

    return (
        <div className="card flex flex-col justify-center items-center gap-2">
            <div className="w-80 h-60 p-4 border-surface rounded-border border overflow-auto">
                <div className="h-[30rem]">
                    <div className="relative">
                        <Button ref={buttonRef} onClick={() => setVisible(true)} label="Show" />
                        {visible ? (
                            <div ref={overlayRef} className="absolute rounded-border shadow p-8 bg-surface-0 dark:bg-surface-900 z-20 whitespace-nowrap animate-scalein origin-top">
                                Popup Content
                            </div>
                        ) : null}
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
                    This hook combines the features of <Link href="/hooks/useclickotside">useClickOutside</Link>, <Link href="/hooks/useoverlayscrollistener">useOverlayScrollListener</Link> and{' '}
                    <Link href="/hooks/useresizelistener">useResizeListener</Link> to handle popups positioned relative to another element.
                </p>
            </DocSectionText>
            <div className="card flex flex-col justify-center items-center gap-2">
                <div className="w-80 h-60 p-4 border-surface rounded-border border overflow-auto">
                    <div className="h-[30rem]">
                        <div className="relative">
                            <Button ref={buttonRef} onClick={() => setVisible(true)} label="Show" />
                            {visible ? (
                                <div ref={overlayRef} className="absolute rounded-border shadow p-8 bg-surface-0 dark:bg-surface-900 z-20 whitespace-nowrap animate-scalein origin-top">
                                    Popup Content
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
