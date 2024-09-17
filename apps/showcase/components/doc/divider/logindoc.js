import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';

export function LoginDoc(props) {
    const code = {
        basic: `
<div className="card">
    <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-5/12 flex flex-col items-center justify-center gap-4 py-8">
            <div className="flex flex-wrap justify-center items-center gap-2">
                <label className="w-24">Username</label>
                <InputText id="username" type="text" className="w-48" />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2">
                <label className="w-24">Password</label>
                <InputText id="password" type="password" className="w-48" />
            </div>
            <Button label="Login" icon="pi pi-user" className="w-40 mx-auto"></Button>
        </div>
        <div className="w-full md:w-2/12">
            <Divider layout="vertical" className="hidden md:flex">
                <b>OR</b>
            </Divider>
            <Divider layout="horizontal" className="flex md:hidden" align="center">
                <b>OR</b>
            </Divider>
        </div>
        <div className="w-full md:w-5/12 flex items-center justify-center py-8">
            <Button label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-40"></Button>
        </div>
    </div>
</div>
        `,
        javascript: `
import React from 'react';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function LoginDemo() {
    return (
        <div className="card">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-5/12 flex flex-col items-center justify-center gap-4 py-8">
                    <div className="flex flex-wrap justify-center items-center gap-2">
                        <label className="w-24">Username</label>
                        <InputText id="username" type="text" className="w-48" />
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-2">
                        <label className="w-24">Password</label>
                        <InputText id="password" type="password" className="w-48" />
                    </div>
                    <Button label="Login" icon="pi pi-user" className="w-40 mx-auto"></Button>
                </div>
                <div className="w-full md:w-2/12">
                    <Divider layout="vertical" className="hidden md:flex">
                        <b>OR</b>
                    </Divider>
                    <Divider layout="horizontal" className="flex md:hidden" align="center">
                        <b>OR</b>
                    </Divider>
                </div>
                <div className="w-full md:w-5/12 flex items-center justify-center py-8">
                    <Button label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-40"></Button>
                </div>
            </div>
        </div>
    )
}
        `,
        typescript: `
import React from 'react';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function LoginDemo() {
    return (
        <div className="card">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-5/12 flex flex-col items-center justify-center gap-4 py-8">
                    <div className="flex flex-wrap justify-center items-center gap-2">
                        <label className="w-24">Username</label>
                        <InputText id="username" type="text" className="w-48" />
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-2">
                        <label className="w-24">Password</label>
                        <InputText id="password" type="password" className="w-48" />
                    </div>
                    <Button label="Login" icon="pi pi-user" className="w-40 mx-auto"></Button>
                </div>
                <div className="w-full md:w-2/12">
                    <Divider layout="vertical" className="hidden md:flex">
                        <b>OR</b>
                    </Divider>
                    <Divider layout="horizontal" className="flex md:hidden" align="center">
                        <b>OR</b>
                    </Divider>
                </div>
                <div className="w-full md:w-5/12 flex items-center justify-center py-8">
                    <Button label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-40"></Button>
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
                <p>Sample implementation of a login form using a divider with content.</p>
            </DocSectionText>
            <div className="card">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-5/12 flex flex-col items-center justify-center gap-4 py-8">
                        <div className="flex flex-wrap justify-center items-center gap-2">
                            <label className="w-24">Username</label>
                            <InputText id="username" type="text" className="w-48" />
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-2">
                            <label className="w-24">Password</label>
                            <InputText id="password" type="password" className="w-48" />
                        </div>
                        <Button label="Login" icon="pi pi-user" className="w-40 mx-auto" />
                    </div>
                    <div className="w-full md:w-2/12">
                        <Divider layout="vertical" className="hidden md:flex">
                            <b>OR</b>
                        </Divider>
                        <Divider layout="horizontal" className="flex md:hidden" align="center">
                            <b>OR</b>
                        </Divider>
                    </div>
                    <div className="w-full md:w-5/12 flex items-center justify-center py-8">
                        <Button label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-40" />
                    </div>
                </div>
            </div>

            <DocSectionCode code={code} />
        </>
    );
}
