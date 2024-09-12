import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { Slider } from 'primereact/slider';
import { useState } from 'react';

export function BasicDoc(props) {
    const [value, setValue] = useState(null);

    const code = {
        basic: `
<Slider value={value} onChange={(e) => setValue(e.value)} />
        `,
        javascript: `
import React, { useState } from "react";
import { Slider } from "primereact/slider";

export default function BasicDemo() {
    const [value, setValue] = useState(null);

    return (
        <div className="card flex justify-center">
            <Slider value={value} onChange={(e) => setValue(e.value)} className="w-56" />
        </div>
    )
}
        `,
        typescript: `
import React, { useState } from "react";
import { Slider, SliderChangeEvent } from "primereact/slider";

export default function BasicDemo() {
    const [value, setValue] = useState<number>(null);

    return (
        <div className="card flex justify-center">
            <Slider value={value} onChange={(e: SliderChangeEvent) => setValue(e.value)} className="w-56" />
        </div>
    )
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    Slider is used as a controlled input with <i>value</i> and <i>onChange</i> properties.
                </p>
            </DocSectionText>
            <div className="card flex justify-center">
                <Slider value={value} onChange={(e) => setValue(e.value)} className="w-56" />
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
