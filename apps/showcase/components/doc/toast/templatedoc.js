import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';

export function TemplateDoc(props) {
    const [visible, setVisible] = useState(false);
    const toastBC = useRef(null);

    const clear = () => {
        toastBC.current.clear();
        setVisible(false);
    };

    const confirm = () => {
        if (!visible) {
            setVisible(true);
            toastBC.current.clear();
            toastBC.current.show({
                severity: 'success',
                summary: 'Can you send me the report?',
                sticky: true,
                content: (props) => (
                    <div className="flex flex-col items-start" style={{ flex: '1' }}>
                        <div className="flex items-center gap-2">
                            <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
                            <span className="font-bold text-surface-900 dark:text-surface-0">Amy Elsner</span>
                        </div>
                        <div className="font-medium text-lg my-4 text-surface-900 dark:text-surface-0">{props.message.summary}</div>
                        <Button className="p-button-sm flex" label="Reply" severity="success" onClick={clear} />
                    </div>
                )
            });
        }
    };

    const code = {
        basic: `
toastBC.current.show({
    severity: 'success',
    summary: 'Can you send me the report?',
    sticky: true,
    content: (props) => (
        <div className="flex flex-col align-items-left" style={{ flex: '1' }}>
            <div className="flex items-center gap-2">
                <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
                <span className="font-bold text-surface-900 dark:text-surface-0">Amy Elsner</span>
            </div>
            <div className="font-medium text-lg my-4 text-surface-900 dark:text-surface-0">{props.message.summary}</div>
            <Button className="p-button-sm flex" label="Reply" severity="success" onClick={clear}></Button>
        </div>
    )
});`,
        javascript: `
import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Toast } from 'primereact/toast';

export default function TemplateDemo() {
    const [visible, setVisible] = useState(false);
    const toastBC = useRef(null);

    const clear = () => {
        toastBC.current.clear();
        setVisible(false);
    };

    const confirm = () => {
        if (!visible) {
            setVisible(true);
            toastBC.current.clear();
            toastBC.current.show({
                severity: 'success',
                summary: 'Can you send me the report?',
                sticky: true,
                content: (props) => (
                    <div className="flex flex-col align-items-left" style={{ flex: '1' }}>
                        <div className="flex items-center gap-2">
                            <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
                            <span className="font-bold text-surface-900 dark:text-surface-0">Amy Elsner</span>
                        </div>
                        <div className="font-medium text-lg my-4 text-surface-900 dark:text-surface-0">{props.message.summary}</div>
                        <Button className="p-button-sm flex" label="Reply" severity="success" onClick={clear}></Button>
                    </div>
                )
            });
        }
    };

    return (
        <div className="card flex justify-center">
            <Toast ref={toastBC} position="bottom-center" onRemove={clear} />
            <Button onClick={confirm} label="Confirm" />
        </div>
    )
}
        `,
        typescript: `
import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Toast } from 'primereact/toast';

export default function TemplateDemo() {
    const [visible, setVisible] = useState(false);
    const toastBC = useRef<Toast>(null);

    const clear = () => {
        toastBC.current?.clear();
        setVisible(false);
    };

    const confirm = () => {
        if (!visible) {
            setVisible(true);
            toastBC.current?.clear();
            toastBC.current.show({
                severity: 'success',
                summary: 'Can you send me the report?',
                sticky: true,
                content: (props) => (
                    <div className="flex flex-col align-items-left" style={{ flex: '1' }}>
                        <div className="flex items-center gap-2">
                            <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
                            <span className="font-bold text-surface-900 dark:text-surface-0">Amy Elsner</span>
                        </div>
                        <div className="font-medium text-lg my-4 text-surface-900 dark:text-surface-0">{props.message.summary}</div>
                        <Button className="p-button-sm flex" label="Reply" severity="success" onClick={clear}></Button>
                    </div>
                )
            });
        }
    };

    return (
        <div className="card flex justify-center">
            <Toast ref={toastBC} position="bottom-center" onRemove={clear} />
            <Button onClick={confirm} label="Confirm" />
        </div>
    )
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    Custom content inside a message is defined with the <i>content</i> option.
                </p>
            </DocSectionText>
            <div className="card flex justify-center">
                <Toast ref={toastBC} position="bottom-center" onRemove={clear} />
                <Button onClick={confirm} label="Confirm" />
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
