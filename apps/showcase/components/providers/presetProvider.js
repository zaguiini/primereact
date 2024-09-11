import colorPresets from '@/components/utils/colorPresets.json';
import Aura from '@primereact/themes/aura';
import { createContext, useState } from 'react';

const PresetContext = createContext();
const { Provider, Consumer: PresetConsumer } = PresetContext;

const { primaryColors, surfaceColors } = colorPresets;

const PresetProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [preset, setPreset] = useState(Aura);
    const [ripple, setRipple] = useState(false);
    const [currentPrimaryColor, setCurrentPrimaryColor] = useState(primaryColors[0]);
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

    const updatePrimaryColors = (colorName) => {
        const selectedColor = primaryColors.find((color) => color.name === colorName);
        const newPreset = { ...preset };

        if (!newPreset.semantic) {
            newPreset.semantic = {};
        }

        newPreset.semantic.primary = selectedColor.palette;

        setCurrentPrimaryColor(selectedColor);

        withViewTransition(() => setPreset(newPreset));
    };

    const updateSurfaceColors = (colorName) => {
        const selectedColor = surfaceColors.find((color) => color.name === colorName);

        const newPreset = { ...preset };

        if (!newPreset.semantic) {
            newPreset.semantic = {};
        }

        const lightSurface = selectedColor?.hasOwnProperty('light') ? selectedColor.light.palette : selectedColor.palette;
        const darkSurface = selectedColor?.hasOwnProperty('dark') ? selectedColor.dark.palette : selectedColor.palette;

        const newColorScheme = {
            light: {
                ...newPreset?.semantic?.colorScheme?.light,
                ...(lightSurface ? { surface: lightSurface } : {})
            },
            dark: {
                ...newPreset?.semantic?.colorScheme?.dark,
                ...(darkSurface ? { surface: darkSurface } : {})
            }
        };

        newPreset.semantic.colorScheme = newColorScheme;

        setCurrentSurfaceColor(selectedColor);

        withViewTransition(() => setPreset(newPreset));
    };

    return <Provider value={{ isDarkMode, toggleDarkMode, preset, currentPrimaryColor, currentSurfaceColor, changePreset, updatePrimaryColors, updateSurfaceColors, ripple, setRipple }}>{children}</Provider>;
};

export { PresetConsumer, PresetContext, PresetProvider };
