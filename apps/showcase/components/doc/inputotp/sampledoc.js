import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { InputOtp } from '@/components/lib/inputotp/InputOtp';
import { Button } from 'primereact/button';
import { useState } from 'react';

export function SampleDoc(props) {
    const [token, setTokens] = useState();

    const customInput = ({ events, props: attr }) => {
        return (
            <>
                <input {...events} {...attr} type="text" className="custom-otp-input-sample" />
                {attr.id === 2 && (
                    <div className="px-4">
                        <i className="pi pi-minus" />
                    </div>
                )}
            </>
        );
    };

    const code = {
        basic: `
<div className="flex flex-col items-center">
    <p className="font-bold text-xl mb-2">Authenticate Your Account</p>
    <p className="text-muted-color block mb-8">Please enter the code sent to your phone.</p>
    <InputOtp value={token} onChange={(e) => setTokens(e.value)} length={6} inputTemplate={customInput} style={{gap: 0}}/>
    <div className="flex justify-between mt-8 self-stretch">
        <Button label="Resend Code" link className="p-0"></Button>
        <Button label="Submit Code"></Button>
    </div>
</div>
        `,
        javascript: `
import React, { useState } from 'react';
import { InputOtp } from 'primereact/inputotp';
import { Button } from 'primereact/button';

export default function SampleDemo() {
    const [token, setTokens] = useState();

    const customInput = ({events, props}) => {
        return <><input {...events} {...props} type="text" className="custom-otp-input-sample" />
            {props.id === 2 && <div className="px-4">
                <i className="pi pi-minus" />
            </div>}
        </>
    };

    return (
        <div className="card flex justify-center">
            <style scoped>
                {\`
                    .custom-otp-input-sample {
                        width: 48px;
                        height: 48px;
                        font-size: 24px;
                        appearance: none;
                        text-align: center;
                        transition: all 0.2s;
                        border-radius: 0;
                        border: 1px solid var(--surface-400);
                        background: transparent;
                        outline-offset: -2px;
                        outline-color: transparent;
                        border-right: 0 none;
                        transition: outline-color 0.3s;
                        color: var(--text-color);
                    }

                    .custom-otp-input-sample:focus {
                        outline: 2px solid var(--primary-color);
                    }

                    .custom-otp-input-sample:first-child,
                    .custom-otp-input-sample:nth-child(5) {
                        border-top-left-radius: 12px;
                        border-bottom-left-radius: 12px;
                    }

                    .custom-otp-input-sample:nth-child(3),
                    .custom-otp-input-sample:last-child {
                        border-top-right-radius: 12px;
                        border-bottom-right-radius: 12px;
                        border-right-width: 1px;
                        border-right-style: solid;
                        border-color: var(--surface-400);
                    }
                \`}
            </style>
            <div className="flex flex-col items-center">
                <p className="font-bold text-xl mb-2">Authenticate Your Account</p>
                <p className="text-muted-color block mb-8">Please enter the code sent to your phone.</p>
                <InputOtp value={token} onChange={(e) => setTokens(e.value)} length={6} inputTemplate={customInput} style={{gap: 0}}/>
                <div className="flex justify-between mt-8 self-stretch">
                    <Button label="Resend Code" link className="p-0"></Button>
                    <Button label="Submit Code"></Button>
                </div>
            </div>
        </div>
    );
}
        `,
        typescript: `
import React, { useState } from 'react';
import { InputOtp } from 'primereact/inputotp';
import { Button } from 'primereact/button';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    events: any;
    props: any;
}

export default function SampleDemo() {
    const [token, setTokens] = useState<string | number | undefined>();

    const customInput: FunctionComponent<CustomInputProps> = ({ events, props }) => {
        return (
          <>
            <input {...events} {...props} type="text" className="custom-otp-input-sample" />
            {props?.id === 2 && (
              <div className="px-4">
                <i className="pi pi-minus" />
              </div>
            )}
          </>
        );
    };

    return (
        <div className="card flex justify-center">
            <style scoped>
                {\`
                    .custom-otp-input-sample {
                        width: 48px;
                        height: 48px;
                        font-size: 24px;
                        appearance: none;
                        text-align: center;
                        transition: all 0.2s;
                        border-radius: 0;
                        border: 1px solid var(--surface-400);
                        background: transparent;
                        outline-offset: -2px;
                        outline-color: transparent;
                        border-right: 0 none;
                        transition: outline-color 0.3s;
                        color: var(--text-color);
                    }

                    .custom-otp-input-sample:focus {
                        outline: 2px solid var(--primary-color);
                    }

                    .custom-otp-input-sample:first-child,
                    .custom-otp-input-sample:nth-child(5) {
                        border-top-left-radius: 12px;
                        border-bottom-left-radius: 12px;
                    }

                    .custom-otp-input-sample:nth-child(3),
                    .custom-otp-input-sample:last-child {
                        border-top-right-radius: 12px;
                        border-bottom-right-radius: 12px;
                        border-right-width: 1px;
                        border-right-style: solid;
                        border-color: var(--surface-400);
                    }
                \`}
            </style>
            <div className="flex flex-col items-center">
                <p className="font-bold text-xl mb-2">Authenticate Your Account</p>
                <p className="text-muted-color block mb-8">Please enter the code sent to your phone.</p>
                <InputOtp value={token} onChange={(e) => setTokens(e.value)} length={6} inputTemplate={customInput} style={{gap: 0}}/>
                <div className="flex justify-between mt-8 self-stretch">
                    <Button label="Resend Code" link className="p-0"></Button>
                    <Button label="Submit Code"></Button>
                </div>
            </div>
        </div>
    );
}`
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>A sample UI implementation with templating and additional elements.</p>
            </DocSectionText>
            <div className="card flex justify-center">
                <style scoped>
                    {`
                        .custom-otp-input-sample {
                            width: 48px;
                            height: 48px;
                            font-size: 24px;
                            appearance: none;
                            text-align: center;
                            transition: all 0.2s;
                            border-radius: 0;
                            border: 1px solid var(--surface-400);
                            background: transparent;
                            outline-offset: -2px;
                            outline-color: transparent;
                            border-right: 0 none;
                            transition: outline-color 0.3s;
                            color: var(--text-color);
                        }

                        .custom-otp-input-sample:focus {
                            outline: 2px solid var(--primary-color);
                        }

                        .custom-otp-input-sample:first-child,
                        .custom-otp-input-sample:nth-child(5) {
                            border-top-left-radius: 12px;
                            border-bottom-left-radius: 12px;
                        }

                        .custom-otp-input-sample:nth-child(3),
                        .custom-otp-input-sample:last-child {
                            border-top-right-radius: 12px;
                            border-bottom-right-radius: 12px;
                            border-right-width: 1px;
                            border-right-style: solid;
                            border-color: var(--surface-400);
                        }
                    `}
                </style>
                <div className="flex flex-col items-center">
                    <p className="font-bold text-xl mb-2">Authenticate Your Account</p>
                    <p className="text-muted-color block mb-8">Please enter the code sent to your phone.</p>
                    <InputOtp value={token} onChange={(e) => setTokens(e.value)} length={6} inputTemplate={customInput} style={{ gap: 0 }} />
                    <div className="flex justify-between mt-8 self-stretch">
                        <Button label="Resend Code" link className="p-0"></Button>
                        <Button label="Submit Code"></Button>
                    </div>
                </div>
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
