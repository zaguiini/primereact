import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';

export function HeadlessDoc(props) {
    const toast = useRef(null);
    const [progress, setProgress] = useState(0);
    const interval = useRef(null);

    const clear = () => {
        setProgress(0);
        toast.current.clear();
        clearInterval(interval.current);
        interval.current = undefined;
    };

    const show = () => {
        if (!interval.current) {
            toast.current.show({
                summary: 'Uploading your files.'
            });

            setProgress(0);

            if (interval.current) {
                clearInterval(interval.current);
            }

            interval.current = setInterval(() => {
                setProgress((prevProgress) => {
                    const newProgress = prevProgress + 20;

                    if (newProgress >= 100) {
                        clearInterval(interval.current);

                        return 100;
                    }

                    return newProgress;
                });
            }, 1000);
        }
    };

    const code = {
        basic: `
<Toast
    ref={toast}
    content={({ message }) => (
        <section className="flex p-4 gap-4 w-full bg-black/90 shadow animate-fadeindown" style={{ borderRadius: '10px' }}>
            <i className="pi pi-cloud-upload text-primary-500 text-2xl"></i>
            <div className="flex flex-col gap-4 w-full">
                <p className="m-0 font-semibold text-base text-white">{message.summary}</p>
                <p className="m-0 text-base text-surface-700 dark:text-surface-100">{message.detail}</p>
                <div className="flex flex-col gap-2">
                    <ProgressBar value={progress} showValue="false"></ProgressBar>
                    <label className="text-right text-xs text-white">{progress}% uploaded...</label>
                </div>
                <div className="flex gap-4 mb-4">
                    <Button label="Another Upload?" text className="p-0" onClick={clear}></Button>
                    <Button label="Cancel" text className="text-white p-0" onClick={clear}></Button>
                </div>
            </div>
        </section>
    )}
></Toast>
<Button onClick={show} label="View" />
            `,
        javascript: `
import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';

export default function HeadlessDemo() {
    const toast = useRef(null);
    const [progress, setProgress] = useState(0);
    const interval = useRef(null);

    const clear = () => {
        setProgress(0);
        toast.current.clear();
        clearInterval(interval.current);
        interval.current = undefined;
    };

    const show = () => {
        if (!interval.current) {
            toast.current.show({
                summary: 'Uploading your files.',
            });

            setProgress(0);

            if (interval.current) {
                clearInterval(interval.current);
            }

            interval.current = setInterval(() => {
                setProgress((prevProgress) => {
                    const newProgress = prevProgress + 20;

                    if (newProgress >= 100) {
                        clearInterval(interval.current);

                        return 100;
                    }

                    return newProgress;
                });
            }, 1000);
        }
    };

    return (
        <div className="card flex justify-center">
            <Toast
                ref={toast}
                content={({ message }) => (
                    <section className="flex p-4 gap-4 w-full bg-black/90 shadow animate-fadeindown" style={{ borderRadius: '10px' }}>
                        <i className="pi pi-cloud-upload text-primary-500 text-2xl"></i>
                        <div className="flex flex-col gap-4 w-full">
                            <p className="m-0 font-semibold text-base text-white">{message.summary}</p>
                            <p className="m-0 text-base text-surface-700 dark:text-surface-100">{message.detail}</p>
                            <div className="flex flex-col gap-2">
                                <ProgressBar value={progress} showValue="false"></ProgressBar>
                                <label className="text-right text-xs text-white">{progress}% uploaded...</label>
                            </div>
                            <div className="flex gap-4 mb-4">
                                <Button label="Another Upload?" text className="p-0" onClick={clear}></Button>
                                <Button label="Cancel" text className="text-white p-0" onClick={clear}></Button>
                            </div>
                        </div>
                    </section>
                )}
            ></Toast>
            <Button onClick={show} label="View" />
        </div>
    )
            `,
        typescript: `
import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';

export default function HeadlessDemo() {
    const toast = useRef<Toast>(null);

    const clear = () => {
        setProgress(0);
        toast.current.clear();
        clearInterval(interval.current);
        interval.current = undefined;
    };

    const show = () => {
        if (!interval.current) {
            toast.current.show({
                summary: 'Uploading your files.',
            });

            setProgress(0);

            if (interval.current) {
                clearInterval(interval.current);
            }

            interval.current = setInterval(() => {
                setProgress((prevProgress) => {
                    const newProgress = prevProgress + 20;

                    if (newProgress >= 100) {
                        clearInterval(interval.current);

                        return 100;
                    }

                    return newProgress;
                });
            }, 1000);
        }
    };

    return (
        <div className="card flex justify-center">
            <Toast
                ref={toast}
                content={({ message }) => (
                    <section className="flex p-4 gap-4 w-full bg-black/90 shadow animate-fadeindown" style={{ borderRadius: '10px' }}>
                        <i className="pi pi-cloud-upload text-primary-500 text-2xl"></i>
                        <div className="flex flex-col gap-4 w-full">
                            <p className="m-0 font-semibold text-base text-white">{message.summary}</p>
                            <p className="m-0 text-base text-surface-700 dark:text-surface-100">{message.detail}</p>
                            <div className="flex flex-col gap-2">
                                <ProgressBar value={progress} showValue="false"></ProgressBar>
                                <label className="text-right text-xs text-white">{progress}% uploaded...</label>
                            </div>
                            <div className="flex gap-4 mb-4">
                                <Button label="Another Upload?" text className="p-0" onClick={clear}></Button>
                                <Button label="Cancel" text className="text-white p-0" onClick={clear}></Button>
                            </div>
                        </div>
                    </section>
                )}
            ></Toast>
            <Button onClick={show} label="View" />
        </div>
    )
}
            `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    Headless mode is enabled by defining a <i>content</i> prop that lets you implement entire dialog UI instead of the default elements.
                </p>
            </DocSectionText>
            <div className="card flex justify-center">
                <Toast
                    ref={toast}
                    position="top-center"
                    content={({ message }) => (
                        <section className="flex p-4 gap-4 w-full bg-black/90 shadow animate-fadeindown" style={{ borderRadius: '10px' }}>
                            <i className="pi pi-cloud-upload text-primary-500 text-2xl" />
                            <div className="flex flex-col gap-4 w-full">
                                <p className="m-0 font-semibold text-base text-white">{message.summary}</p>
                                <p className="m-0 text-base text-surface-700 dark:text-surface-100">{message.detail}</p>
                                <div className="flex flex-col gap-2">
                                    <ProgressBar value={progress} showValue={false} style={{ height: '4px' }} />
                                    <label className="text-right text-xs text-white">{progress}% uploaded...</label>
                                </div>
                                <div className="flex gap-4 mb-4">
                                    <Button label="Another Upload?" text className="p-0" onClick={clear} />
                                    <Button label="Cancel" text className="text-white p-0" onClick={clear} />
                                </div>
                            </div>
                        </section>
                    )}
                />
                <Button onClick={show} label="View" />
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
