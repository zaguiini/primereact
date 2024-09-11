'use client';

import { NewsProvider } from './newsProvider';
import { PresetProvider } from './presetProvider';

export const Providers = ({ children }) => {
    return (
        <PresetProvider>
            <NewsProvider>{children}</NewsProvider>
        </PresetProvider>
    );
};
