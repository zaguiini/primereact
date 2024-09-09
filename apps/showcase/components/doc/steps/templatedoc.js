import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { Steps } from '@/components/lib/steps/Steps';
import { useState } from 'react';

export function TemplateDoc(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    const itemRenderer = (item, itemIndex) => {
        const isActiveItem = activeIndex === itemIndex;
        const backgroundColor = isActiveItem ? 'var(--primary-color)' : 'var(--surface-b)';
        const textColor = isActiveItem ? 'var(--surface-b)' : 'var(--text-color-secondary)';

        return (
            <span
                className="inline-flex items-center justify-center items-center rounded-full border-primary border h-12 w-12 z-10 cursor-pointer"
                style={{ backgroundColor: backgroundColor, color: textColor, marginTop: '-25px' }}
                onClick={() => setActiveIndex(itemIndex)}
            >
                <i className={`${item.icon} text-xl`} />
            </span>
        );
    };

    const items = [
        {
            icon: 'pi pi-user',
            template: (item) => itemRenderer(item, 0)
        },
        {
            icon: 'pi pi-calendar',
            template: (item) => itemRenderer(item, 1)
        },
        {
            icon: 'pi pi-check',
            template: (item) => itemRenderer(item, 2)
        }
    ];

    const code = {
        basic: `
<Steps model={items} activeIndex={activeIndex} readOnly={false} className="m-2 pt-6" />
`,
        javascript: `
import React, { useState } from 'react'; 
import { Steps } from 'primereact/steps';

export default function TemplateDemo() {
    const [activeIndex, setActiveIndex] = useState(0);

    const itemRenderer = (item, itemIndex) => {
        const isActiveItem = activeIndex === itemIndex;
        const backgroundColor = isActiveItem ? 'var(--primary-color)' : 'var(--surface-b)';
        const textColor = isActiveItem ? 'var(--surface-b)' : 'var(--text-color-secondary)';

        return (
            <span
                className="inline-flex items-center justify-center items-center rounded-full border-primary border h-12 w-12 z-10 cursor-pointer"
                style={{ backgroundColor: backgroundColor, color: textColor, marginTop: '-25px' }}
                onClick={() => setActiveIndex(itemIndex)}
            >
                <i className={\`\${item.icon} text-xl\`} />
            </span>
        );
    };

    const items = [
        {
            icon: 'pi pi-user',
            template: (item) => itemRenderer(item, 0)
        },
        {
            icon: 'pi pi-calendar',
            template: (item) => itemRenderer(item, 1)
        },
        {
            icon: 'pi pi-check',
            template: (item) => itemRenderer(item, 2)
        }
    ];

    return (
        <div className="card">
            <Steps model={items} activeIndex={activeIndex} readOnly={false} className="m-2 pt-6" />
        </div>
    )
}
        `,
        typescript: `
import React, { useState } from 'react'; 
import { Steps } from 'primereact/steps';
import { MenuItem } from 'primereact/menuitem';

export default function TemplateDemo() {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const itemRenderer = (item, itemIndex) => {
        const isActiveItem = activeIndex === itemIndex;
        const backgroundColor = isActiveItem ? 'var(--primary-color)' : 'var(--surface-b)';
        const textColor = isActiveItem ? 'var(--surface-b)' : 'var(--text-color-secondary)';

        return (
            <span
                className="inline-flex items-center justify-center items-center rounded-full border-primary border h-12 w-12 z-10 cursor-pointer"
                style={{ backgroundColor: backgroundColor, color: textColor, marginTop: '-25px' }}
                onClick={() => setActiveIndex(itemIndex)}
            >
                <i className={\`\${item.icon} text-xl\`} />
            </span>
        );
    };

    const items: MenuItem[] = [
        {
            icon: 'pi pi-user',
            template: (item) => itemRenderer(item, 0)
        },
        {
            icon: 'pi pi-calendar',
            template: (item) => itemRenderer(item, 1)
        },
        {
            icon: 'pi pi-check',
            template: (item) => itemRenderer(item, 2)
        }
    ];

    return (
        <div className="card">
            <Steps model={items} activeIndex={activeIndex} readOnly={false} className="m-2 pt-6" />
        </div>
    )
}
        `
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    Steps offers item customization with the items <i>template</i> property that receives the item instance and returns an element.
                </p>
            </DocSectionText>
            <div className="card">
                <Steps model={items} activeIndex={activeIndex} readOnly={false} className="m-2 pt-6" />
            </div>
            <DocSectionCode code={code} />
        </>
    );
}
