'use client';
import { createContext, useState } from 'react';

export const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
    const [preset, setPreset] = useState('Aura');
    const [primary, setPrimary] = useState('noir');
    const [surface, setSurface] = useState(null);
    const [darkTheme, setDarkTheme] = useState(false);
    const [codeSandbox, setCodeSandbox] = useState(false);
    //const [sourceType, setSourceType] = useState('js'); js or ts
    const [newsActive, setNewsActive] = useState(false);
    const [announcement, setAnnouncement] = useState(null);
    const [storageKey, setStorageKey] = useState('primereact');

    const value = {
        preset,
        setPreset,
        primary,
        setPrimary,
        surface,
        setSurface,
        darkTheme,
        setDarkTheme,
        codeSandbox,
        setCodeSandbox,
        //sourceType,
        //setSourceType,
        newsActive,
        setNewsActive,
        announcement,
        setAnnouncement,
        storageKey,
        setStorageKey
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
