import { DocSectionText } from '@/components/doc/common/docsectiontext';
import Link from 'next/link';

export function CSSVariablesDoc(props) {
    return (
        <>
            <DocSectionText {...props}>
                <p>
                    Each PrimeReact theme exports numerous CSS variables, refer to{' '}
                    <Link legacyBehavior href="/colors">
                        Colors
                    </Link>{' '}
                    page for more details.
                </p>
            </DocSectionText>
        </>
    );
}
