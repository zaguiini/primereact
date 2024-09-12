import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { Slider } from 'primereact/slider';
import { useState } from 'react';

export function RangeDoc(props) {
    const [value, setValue] = useState([20, 80]);

    const code = {
        basic: `
<Slider value={value} onChange={(e) => setValue(e.value)} range />
        `,
        javascript: `
import React, { useState } from "react";
import { Slider } from "primereact/slider";

export default function RangeDemo() {
    const [value, setValue] = useState([20,80]);

    return (
        <div className="card flex justify-center">
            <Slider value={value} onChange={(e) => setValue(e.value)} className="w-56" range />
        </div>
    )
}
        `,
        typescript: `
import React, { useState } from "react";
import { Slider, SliderChangeEvent } from "primereact/slider";

export default function RangeDemo() {
    const [value, setValue] = useState<number[]>([20,80]);

    return (
        <div className="card flex justify-center">
            <Slider value={value} onChange={(e: SliderChangeEvent) => setValue(e.value)} className="w-56" range/>
        </div>
    )
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    When <i>range</i> property is present, slider provides two handles to define two values. In range mode, value should be an array instead of a single value.
                </p>
            </DocSectionText>
            <div className="card flex justify-center">
                <Slider value={value} onChange={(e) => setValue(e.value)} range className="w-56" />
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
