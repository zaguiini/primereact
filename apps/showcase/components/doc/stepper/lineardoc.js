import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { Stepper } from '@/components/lib/stepper/Stepper';
import { StepperPanel } from '@/components/lib/stepperpanel/StepperPanel';
import { Button } from 'primereact/button';
import { useRef } from 'react';

export function LinearDoc(props) {
    const stepperRef = useRef(null);

    const code = {
        basic: `
<Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
    <StepperPanel header="Header I">
        <div className="flex flex-col h-48">
            <div className="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content I</div>
        </div>
        <div className="flex pt-6 justify-end">
            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
        </div>
    </StepperPanel>
    <StepperPanel header="Header II">
        <div className="flex flex-col h-48">
            <div className="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content II</div>
        </div>
        <div className="flex pt-6 justify-between">
            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
        </div>
    </StepperPanel>
    <StepperPanel header="Header III">
        <div className="flex flex-col h-48">
            <div className="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content III</div>
        </div>
        <div className="flex pt-6 justify-start">
            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
        </div>
    </StepperPanel>
</Stepper>
        `,
        javascript: `
import React, { useRef } from "react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';

export default function BasicDemo() {
    const stepperRef = useRef(null);

    return (
    <div className="card flex justify-center">
        <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
            <StepperPanel header="Header I">
                <div className="flex flex-col h-48">
                    <div className="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content I</div>
                </div>
                <div className="flex pt-6 justify-end">
                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                </div>
            </StepperPanel>
            <StepperPanel header="Header II">
                <div className="flex flex-col h-48">
                    <div className="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content II</div>
                </div>
                <div className="flex pt-6 justify-between">
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                </div>
            </StepperPanel>
            <StepperPanel header="Header III">
                <div className="flex flex-col h-48">
                    <div className="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content III</div>
                </div>
                <div className="flex pt-6 justify-start">
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                </div>
            </StepperPanel>
        </Stepper>
    </div>
    )
}
        `,
        typescript: `
import React, { useRef } from "react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';

export default function BasicDemo() {
    const stepperRef = useRef(null);

    return (
    <div className="card flex justify-center">
        <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
            <StepperPanel header="Header I">
                <div className="flex flex-col h-48">
                    <div className="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content I</div>
                </div>
                <div className="flex pt-6 justify-end">
                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                </div>
            </StepperPanel>
            <StepperPanel header="Header II">
                <div className="flex flex-col h-48">
                    <div className="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content II</div>
                </div>
                <div className="flex pt-6 justify-between">
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                </div>
            </StepperPanel>
            <StepperPanel header="Header III">
                <div className="flex flex-col h-48">
                    <div className="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content III</div>
                </div>
                <div className="flex pt-6 justify-start">
                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                </div>
            </StepperPanel>
        </Stepper>
    </div>
    )
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    When <i>linear</i> property is present, current step must be completed in order to move to the next step.
                </p>
            </DocSectionText>
            <div className="card flex justify-center">
                <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }} linear>
                    <StepperPanel header="Header I">
                        <div className="flex flex-col h-48">
                            <div className="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content I</div>
                        </div>
                        <div className="flex pt-6 justify-end">
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                        </div>
                    </StepperPanel>
                    <StepperPanel header="Header II">
                        <div className="flex flex-col h-48">
                            <div className="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content II</div>
                        </div>
                        <div className="flex pt-6 justify-between">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                        </div>
                    </StepperPanel>
                    <StepperPanel header="Header III">
                        <div className="flex flex-col h-48">
                            <div className="border-2 border-dashed border-surface rounded-border bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content III</div>
                        </div>
                        <div className="flex pt-6 justify-start">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                        </div>
                    </StepperPanel>
                </Stepper>
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
