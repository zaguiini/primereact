import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

export function MouseTrackDoc(props) {
    const code = {
        basic: `
<Button type="button" label="Save" icon="pi pi-check" tooltip="Save" tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} />

<Tooltip target=".logo" mouseTrack mouseTrackLeft={10} />
<img className="logo" alt="logo" src="/images/logo.png" data-pr-tooltip="PrimeReact-Logo" height="80px" />
        `,
        javascript: `
import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';

export default function MouseTrackDemo() {
    return (
        <div className="card flex flex-wrap items-center justify-center gap-8">
            <Button type="button" label="Save" icon="pi pi-check" tooltip="Save" tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} />

            <Tooltip target=".logo" mouseTrack mouseTrackLeft={10} />
            <img className="logo" alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" data-pr-tooltip="PrimeReact-Logo" height="80px" />
        </div>
    );
}
        `,
        typescript: `
import React from 'react';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';

export default function MouseTrackDemo() {
    return (
        <div className="card flex flex-wrap items-center justify-center gap-8">
            <Button type="button" label="Save" icon="pi pi-check" tooltip="Save" tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} />

            <Tooltip target=".logo" mouseTrack mouseTrackLeft={10} />
            <img className="logo" alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" data-pr-tooltip="PrimeReact-Logo" height="80px" />
        </div>
    );
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    When <i>mouseTrack</i> option is enabled, position of the Tooltip is updated according to the pointer coordinates.
                </p>
            </DocSectionText>
            <div className="card flex flex-wrap items-center justify-center gap-8">
                <Button type="button" label="Save" icon="pi pi-check" tooltip="Save" tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} />

                <Tooltip target=".logo" mouseTrack mouseTrackLeft={10} />
                <img className="logo" alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" data-pr-tooltip="PrimeReact-Logo" height="80px" />
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
