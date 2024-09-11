import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { ConfirmDialog, confirmDialog } from '@/components/lib/confirmdialog/ConfirmDialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

export function HeadlessDoc(props) {
    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };

    const confirm1 = () => {
        confirmDialog({
            group: 'headless',
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    };

    const code = {
        basic: `
<Toast ref={toast} />
<ConfirmDialog
    group="headless"
    content={({ headerRef, contentRef, footerRef, hide, message }) => (
        <div className="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded-border">
            <div className="rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20">
                <i className="pi pi-question text-5xl"></i>
            </div>
            <span className="font-bold text-2xl block mb-2 mt-6" ref={headerRef}>
                {message.header}
            </span>
            <p className="mb-0" ref={contentRef}>
                {message.message}
            </p>
            <div className="flex items-center gap-2 mt-6" ref={footerRef}>
                <Button
                    label="Save"
                    onClick={(event) => {
                        hide(event);
                        accept();
                    }}
                    className="w-32"
                ></Button>
                <Button
                    label="Cancel"
                    outlined
                    onClick={(event) => {
                        hide(event);
                        reject();
                    }}
                    className="w-32"
                ></Button>
            </div>
        </div>
    )}
/>
<div className="card flex flex-wrap gap-2 justify-center">
    <Button onClick={confirm1} icon="pi pi-check" label="Confirm"></Button>
</div>
        `,
        javascript: `
import React, { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

export default function HeadlessDemo() {
    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };

    const confirm1 = () => {
        confirmDialog({
            group: 'headless',
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    };

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog
                group="headless"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded-border">
                        <div className="rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20">
                            <i className="pi pi-question text-5xl"></i>
                        </div>
                        <span className="font-bold text-2xl block mb-2 mt-6" ref={headerRef}>
                            {message.header}
                        </span>
                        <p className="mb-0" ref={contentRef}>
                            {message.message}
                        </p>
                        <div className="flex items-center gap-2 mt-6" ref={footerRef}>
                            <Button
                                label="Save"
                                onClick={(event) => {
                                    hide(event);
                                    accept();
                                }}
                                className="w-32"
                            ></Button>
                            <Button
                                label="Cancel"
                                outlined
                                onClick={(event) => {
                                    hide(event);
                                    reject();
                                }}
                                className="w-32"
                            ></Button>
                        </div>
                    </div>
                )}
            />
            <div className="card flex flex-wrap gap-2 justify-center">
                <Button onClick={confirm1} icon="pi pi-check" label="Confirm"></Button>
            </div>
        </>
    )
}
        `,
        typescript: `
import React, { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

export default function HeadlessDemo() {
    const toast = useRef<Toast>(null);

    const accept = () => {
        toast.current?.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const confirm1 = () => {
        confirmDialog({
            group: 'headless',
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    };

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog
                group="headless"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded-border">
                        <div className="rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20">
                            <i className="pi pi-question text-5xl"></i>
                        </div>
                        <span className="font-bold text-2xl block mb-2 mt-6" ref={headerRef}>
                            {message.header}
                        </span>
                        <p className="mb-0" ref={contentRef}>
                            {message.message}
                        </p>
                        <div className="flex items-center gap-2 mt-6" ref={footerRef}>
                            <Button
                                label="Save"
                                onClick={(event) => {
                                    hide(event);
                                    accept();
                                }}
                                className="w-32"
                            ></Button>
                            <Button
                                label="Cancel"
                                outlined
                                onClick={(event) => {
                                    hide(event);
                                    reject();
                                }}
                                className="w-32"
                            ></Button>
                        </div>
                    </div>
                )}
            />
            <div className="card flex flex-wrap gap-2 justify-center">
                <Button onClick={confirm1} icon="pi pi-check" label="Confirm"></Button>
            </div>
        </>
    )
}
        `
    };

    return (
        <div>
            <DocSectionText {...props}>
                <p>
                    Headless mode is enabled by defining a <i>content</i> prop that lets you implement entire confirmation UI instead of the default elements.
                </p>
            </DocSectionText>
            <Toast ref={toast} />
            <ConfirmDialog
                group="headless"
                content={({ headerRef, contentRef, footerRef, hide, message }) => (
                    <div className="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded-border">
                        <div className="rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20">
                            <i className="pi pi-question text-5xl" />
                        </div>
                        <span className="font-bold text-2xl block mb-2 mt-6" ref={headerRef}>
                            {message.header}
                        </span>
                        <p className="mb-0" ref={contentRef}>
                            {message.message}
                        </p>
                        <div className="flex items-center gap-2 mt-6" ref={footerRef}>
                            <Button
                                label="Save"
                                onClick={(event) => {
                                    hide(event);
                                    accept();
                                }}
                                className="w-32"
                            />
                            <Button
                                label="Cancel"
                                outlined
                                onClick={(event) => {
                                    hide(event);
                                    reject();
                                }}
                                className="w-32"
                            />
                        </div>
                    </div>
                )}
            />
            <div className="card flex flex-wrap gap-2 justify-center">
                <Button onClick={confirm1} icon="pi pi-check" label="Confirm" />
            </div>
            <DocSectionCode code={code} />
        </div>
    );
}
