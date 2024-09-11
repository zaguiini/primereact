import colorPresets from '@/components/utils/colorPresets.json';
import Aura from '@primereact/themes/aura';
import Lara from '@primereact/themes/lara';
import Nora from '@primereact/themes/nora';
import { createContext, useState } from 'react';

const PresetContext = createContext();
const { Provider, Consumer: PresetConsumer } = PresetContext;

const { primaryColors, surfaceColors } = colorPresets;

const PresetProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [preset, setPreset] = useState({
        name: 'aura',
        config: Aura
    });
    const [ripple, setRipple] = useState(false);
    const [currentPrimaryColor, setCurrentPrimaryColor] = useState(primaryColors[0]);
    const [currentSurfaceColor, setCurrentSurfaceColor] = useState(surfaceColors[2]);

    const changePreset = (newValue) => {
        const presetName = newValue.toLowerCase();

        switch (presetName) {
            case 'nora':
                setPreset({ name: 'nora', config: Nora });
                break;
            case 'lara':
                setPreset({ name: 'lara', config: Lara });
                break;
            case 'aura':
            default:
                setPreset({ name: 'aura', config: Aura });
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

    const updatePrimaryColors = (colorName) => {
        const selectedColor = primaryColors.find((color) => color.name === colorName);
        const newPreset = { ...preset };

        if (!newPreset.config.semantic) {
            newPreset.config.semantic = {};
        }

        newPreset.config.semantic.primary = selectedColor.palette;

        setCurrentPrimaryColor(selectedColor);

        withViewTransition(() => setPreset(newPreset));
    };

    const updateSurfaceColors = (colorName) => {
        const selectedColor = surfaceColors.find((color) => color.name === colorName);

        const newPreset = { ...preset };

        if (!newPreset.config.semantic) {
            newPreset.config.semantic = {};
        }

        const lightSurface = selectedColor?.hasOwnProperty('light') ? selectedColor.light.palette : selectedColor.palette;
        const darkSurface = selectedColor?.hasOwnProperty('dark') ? selectedColor.dark.palette : selectedColor.palette;

        const newColorScheme = {
            light: {
                ...newPreset.config?.semantic?.colorScheme?.light,
                ...(lightSurface ? { surface: lightSurface } : {})
            },
            dark: {
                ...newPreset.config?.semantic?.colorScheme?.dark,
                ...(darkSurface ? { surface: darkSurface } : {})
            }
        };

        newPreset.config.semantic.colorScheme = newColorScheme;

        setCurrentSurfaceColor(selectedColor);

        withViewTransition(() => setPreset(newPreset));
    };

    return <Provider value={{ isDarkMode, toggleDarkMode, preset, currentPrimaryColor, currentSurfaceColor, changePreset, updatePrimaryColors, updateSurfaceColors, ripple, setRipple }}>{children}</Provider>;
};

export { PresetConsumer, PresetContext, PresetProvider };
