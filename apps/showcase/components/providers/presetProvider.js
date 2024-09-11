import colorPresets from '@/components/utils/colorPresets.json';
import Aura from '@primereact/themes/aura';
import { createContext, useState } from 'react';

const PresetContext = createContext();
const { Provider, Consumer: PresetConsumer } = PresetContext;

const { primaryColors, surfaceColors } = colorPresets;

const defaultPreset = {
    name: 'aura',
    config: Aura
};

const PresetProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [preset, setPreset] = useState(defaultPreset);
    const [ripple, setRipple] = useState(false);
    const [currentPrimaryColor, setCurrentPrimaryColor] = useState(primaryColors[8]);
    const [currentSurfaceColor, setCurrentSurfaceColor] = useState(surfaceColors[0]);

    const changePreset = (newValue) => {
        const presetName = newValue.toLowerCase();

        switch (presetName) {
            case 'wind':
                setPreset({ name: 'wind', config: Wind });
                break;
            case 'lara':
            default:
                setPreset({ name: 'lara', config: Lara });
                break;
        }
    };

    const withViewTransition = (callback) => {
        if (document?.startViewTransition) {
            document?.startViewTransition(callback);

            return;
        }

        callback();
    };

    const toggleDarkMode = () => {
        const root = document?.documentElement;

        setIsDarkMode((prevState) => {
            if (!prevState) {
                withViewTransition(() => root?.classList?.add('p-dark'));
            } else {
                withViewTransition(() => root?.classList?.remove('p-dark'));
            }

            return !prevState;
        });
    };

    const applyTheme = (type, colors) => {
        Object.keys(colors).forEach((color) => {
            document.documentElement.style.setProperty(`--${type}-${color}`, colors[color]);
        });
    };

    const updatePrimaryColors = (colorName) => {
        const selectedColor = primaryColors.find((color) => color.name === colorName);

        setCurrentPrimaryColor(selectedColor);

        withViewTransition(() => applyTheme('primary', selectedColor.palette));
    };

    const updateSurfaceColors = (colorName) => {
        const selectedColor = surfaceColors.find((color) => color.name === colorName);

        setCurrentSurfaceColor(selectedColor);

        withViewTransition(() => applyTheme('surface', selectedColor.palette));
    };

    return <Provider value={{ isDarkMode, toggleDarkMode, preset, currentPrimaryColor, currentSurfaceColor, changePreset, updatePrimaryColors, updateSurfaceColors, ripple, setRipple }}>{children}</Provider>;
};

export { PresetConsumer, PresetContext, PresetProvider };
