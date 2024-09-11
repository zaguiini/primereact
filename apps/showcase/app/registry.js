'use client';

import Layout from '@/components/layout/layout';
import { PresetContext } from '@/components/providers/presetProvider';
import { PrimeReactProvider, PrimeStyleSheet } from '@primereact/core/config';
import { useServerInsertedHTML } from 'next/navigation';
import React from 'react';

export default function StyleRegistry({ children }) {
    const { preset } = React.useContext(PresetContext);
    const [styledStyleSheet] = React.useState(() => new PrimeStyleSheet());

    useServerInsertedHTML(() => {
        const styleElements = styledStyleSheet.getAllElements();
        styledStyleSheet.clear();
        return <>{styleElements}</>;
    });

    //if (typeof window !== 'undefined') return <>{children}</>;

    const value = {
        theme: {
            preset: preset.config
        }
    };

    return (
        <PrimeReactProvider value={value} sheet={styledStyleSheet}>
            <Layout>{children}</Layout>
        </PrimeReactProvider>
    );
}
