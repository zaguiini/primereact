import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { Button } from 'primereact/button';
import { StyleClass } from 'primereact/styleclass';
import { useRef } from 'react';

export function AnimationDoc(props) {
    const openBtnRef = useRef(null);
    const closeBtnRef = useRef(null);

    const code = {
        basic: `
<StyleClass nodeRef={openBtnRef} selector=".box" enterClassName="hidden" enterActiveClassName="animate-fadein">
    <Button ref={openBtnRef} label="Show" className="mr-2" />
</StyleClass>

<StyleClass nodeRef={closeBtnRef} selector=".box" leaveActiveClassName="animate-fadeout" leaveToClassName="hidden">
    <Button ref={closeBtnRef} severity="secondary" label="Hide" />
</StyleClass>

<div className="hidden animate-duration-500 box">
    <div className="flex bg-green-500 text-white items-center justify-center py-4 rounded-md mt-4 font-bold shadow w-32 h-32">Content</div>
</div>
        `,
        javascript: `
import React, { useRef } from 'react';
import { StyleClass } from 'primereact/styleclass';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function AnimationsDoc() {
    const openBtnRef = useRef(null);
    const closeBtnRef = useRef(null);

    return (
        <div className="card flex flex-col items-center">
            <div>
                <StyleClass nodeRef={openBtnRef} selector=".box" enterClassName="hidden" enterActiveClassName="animate-fadein">
                    <Button ref={openBtnRef} label="Show" className="mr-2" />
                </StyleClass>

                <StyleClass nodeRef={closeBtnRef} selector=".box" leaveActiveClassName="animate-fadeout" leaveToClassName="hidden">
                    <Button ref={closeBtnRef} severity="secondary" label="Hide" />
                </StyleClass>
            </div>

            <div className="hidden animate-duration-500 box">
                <div className="flex bg-green-500 text-white items-center justify-center py-4 rounded-md mt-4 font-bold shadow w-32 h-32">Content</div>
            </div>
        </div>
    );
}
        `,
        typescript: `
import React, { useRef } from 'react';
import { StyleClass } from 'primereact/styleclass';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function AnimationsDoc() {
    const openBtnRef = useRef<Button>(null);
    const closeBtnRef = useRef<Button>(null);

    return (
        <div className="card flex flex-col items-center">
            <div>
                <StyleClass nodeRef={openBtnRef} selector=".box" enterClassName="hidden" enterActiveClassName="animate-fadein">
                    <Button ref={openBtnRef} label="Show" className="mr-2" />
                </StyleClass>

                <StyleClass nodeRef={closeBtnRef} selector=".box" leaveActiveClassName="animate-fadeout" leaveToClassName="hidden">
                    <Button ref={closeBtnRef} severity="secondary" label="Hide" />
                </StyleClass>
            </div>

            <div className="hidden animate-duration-500 box">
                <div className="flex bg-green-500 text-white items-center justify-center py-4 rounded-md mt-4 font-bold shadow w-32 h-32">Content</div>
            </div>
        </div>
    );
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    Classes to apply during enter and leave animations are specified using the <i>enterClassName</i>, <i>enterActiveClassName</i>, <i>enterToClassName</i>, <i>leaveClassName</i>, <i>leaveActiveClassName</i>,<i>leaveToClassName</i>{' '}
                    properties. In addition in case the target is an overlay, <i>hideOnOutsideClick</i> would be handy to hide the target if outside of the popup is clicked.
                </p>
            </DocSectionText>
            <div className="card flex flex-col items-center">
                <div>
                    <StyleClass nodeRef={openBtnRef} selector=".box" enterClassName="hidden" enterActiveClassName="animate-fadein">
                        <Button ref={openBtnRef} label="Show" className="mr-2" />
                    </StyleClass>

                    <StyleClass nodeRef={closeBtnRef} selector=".box" leaveActiveClassName="animate-fadeout" leaveToClassName="hidden">
                        <Button ref={closeBtnRef} severity="secondary" label="Hide" />
                    </StyleClass>
                </div>

                <div className="hidden animate-duration-500 box ">
                    <div className="flex bg-green-500 text-white items-center justify-center py-4 rounded-md mt-4 font-bold shadow w-32 h-32">Content</div>
                </div>
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
