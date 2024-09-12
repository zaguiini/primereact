import { AppContext } from '@/config/app.context';
import { PrimeReactContext } from '@primereact/core/config';
import { $t, updatePreset, updateSurfacePalette } from '@primereact/themes';
import Aura from '@primereact/themes/aura';
import Lara from '@primereact/themes/lara';
import Nora from '@primereact/themes/nora';
import { classNames } from '@primeuix/utils';
import { SelectButton } from 'primereact/selectbutton';
import { ToggleSwitch } from 'primereact/toggleswitch';
import { useContext, useState } from 'react';
import presetColors from './presetColors.json';

const presetsMap = {
    Aura,
    Lara,
    Nora
};

const { primaryColors, surfaceColors } = presetColors;

export default function Config(props) {
    const app = useContext(AppContext);
    const config = useContext(PrimeReactContext);
    const [presets] = useState(Object.keys(presetsMap));

    const getPresetExt = (selectedPrimaryColor) => {
        selectedPrimaryColor = selectedPrimaryColor || app.primary;
        const color = primaryColors.find((c) => c.name === selectedPrimaryColor);

        if (color.name === 'noir') {
            document.documentElement.style.setProperty('--logo-color', 'var(--text-secondary-color)');

            return {
                semantic: {
                    primary: {
                        50: '{surface.50}',
                        100: '{surface.100}',
                        200: '{surface.200}',
                        300: '{surface.300}',
                        400: '{surface.400}',
                        500: '{surface.500}',
                        600: '{surface.600}',
                        700: '{surface.700}',
                        800: '{surface.800}',
                        900: '{surface.900}',
                        950: '{surface.950}'
                    },
                    colorScheme: {
                        light: {
                            primary: {
                                color: '{primary.950}',
                                contrastColor: '#ffffff',
                                hoverColor: '{primary.800}',
                                activeColor: '{primary.700}'
                            },
                            highlight: {
                                background: '{primary.950}',
                                focusBackground: '{primary.700}',
                                color: '#ffffff',
                                focusColor: '#ffffff'
                            }
                        },
                        dark: {
                            primary: {
                                color: '{primary.50}',
                                contrastColor: '{primary.950}',
                                hoverColor: '{primary.200}',
                                activeColor: '{primary.300}'
                            },
                            highlight: {
                                background: '{primary.50}',
                                focusBackground: '{primary.300}',
                                color: '{primary.950}',
                                focusColor: '{primary.950}'
                            }
                        }
                    }
                }
            };
        } else {
            document.documentElement.style.setProperty('--logo-color', 'var(--primary-color)');

            if (app.preset === 'Nora') {
                return {
                    semantic: {
                        primary: color.palette,
                        colorScheme: {
                            light: {
                                primary: {
                                    color: '{primary.600}',
                                    contrastColor: '#ffffff',
                                    hoverColor: '{primary.700}',
                                    activeColor: '{primary.800}'
                                },
                                highlight: {
                                    background: '{primary.600}',
                                    focusBackground: '{primary.700}',
                                    color: '#ffffff',
                                    focusColor: '#ffffff'
                                }
                            },
                            dark: {
                                primary: {
                                    color: '{primary.500}',
                                    contrastColor: '{surface.900}',
                                    hoverColor: '{primary.400}',
                                    activeColor: '{primary.300}'
                                },
                                highlight: {
                                    background: '{primary.500}',
                                    focusBackground: '{primary.400}',
                                    color: '{surface.900}',
                                    focusColor: '{surface.900}'
                                }
                            }
                        }
                    }
                };
            } else {
                return {
                    semantic: {
                        primary: color.palette,
                        colorScheme: {
                            light: {
                                primary: {
                                    color: '{primary.500}',
                                    contrastColor: '#ffffff',
                                    hoverColor: '{primary.600}',
                                    activeColor: '{primary.700}'
                                },
                                highlight: {
                                    background: '{primary.50}',
                                    focusBackground: '{primary.100}',
                                    color: '{primary.700}',
                                    focusColor: '{primary.800}'
                                }
                            },
                            dark: {
                                primary: {
                                    color: '{primary.400}',
                                    contrastColor: '{surface.900}',
                                    hoverColor: '{primary.300}',
                                    activeColor: '{primary.200}'
                                },
                                highlight: {
                                    background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                                    focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                                    color: 'rgba(255,255,255,.87)',
                                    focusColor: 'rgba(255,255,255,.87)'
                                }
                            }
                        }
                    }
                };
            }
        }
    };

    const updateColors = (type, color) => {
        if (type === 'primary') {
            app.setPrimary(color.name);
        } else if (type === 'surface') {
            app.setSurface(color.name);
        }

        applyTheme(type, color);
    };

    const applyTheme = (type, color) => {
        if (type === 'primary') {
            updatePreset(getPresetExt(color.name));
        } else if (type === 'surface') {
            updateSurfacePalette(color.palette);
        }

        //EventBus.emit('theme-palette-change');
    };

    const onRippleChange = (value) => {
        config.setRipple(value);
    };

    const onPresetChange = (value) => {
        app.setPreset(value);
        const preset = presetsMap[value];
        const surfacePalette = surfaceColors.find((s) => s.name === app.surface)?.palette;

        $t().preset(preset).preset(getPresetExt()).surfacePalette(surfacePalette).use({ useDefaultOptions: true });
    };

    return (
        <div className="config-panel">
            <div className="config-panel-content">
                <div className="config-panel-colors">
                    <span className="config-panel-label">Primary</span>
                    <div>
                        {primaryColors.map((primaryColor) => (
                            <button
                                type="button"
                                key={primaryColor.name}
                                title={primaryColor.name}
                                className={classNames({ 'active-color': app.primary === primaryColor.name })}
                                style={{ backgroundColor: `${primaryColor.name === 'noir' ? 'var(--text-color)' : primaryColor.palette['500']}` }}
                                onClick={() => updateColors('primary', primaryColor)}
                            ></button>
                        ))}
                    </div>
                </div>
                <div className="config-panel-colors">
                    <span className="config-panel-label">Surface</span>
                    <div>
                        {surfaceColors.map((surface) => (
                            <button
                                type="button"
                                key={surface.name}
                                title={surface.name}
                                className={classNames({ 'active-color': app.surface ? app.surface === surface.name : app.darkTheme ? surface.name === 'zinc' : surface.name === 'slate' })}
                                style={{ backgroundColor: `${surface.palette['500']}` }}
                                onClick={() => updateColors('surface', surface)}
                            ></button>
                        ))}
                    </div>
                </div>
                <div className="config-panel-settings">
                    <span className="config-panel-label">Presets</span>
                    <SelectButton value={app.preset} onChange={(e) => onPresetChange(e.value)} options={presets} allowEmpty={false} />
                </div>
                <div className="config-panel-settings">
                    <span className="config-panel-label">Ripple</span>
                    <ToggleSwitch checked={config.ripple} onChange={(e) => onRippleChange(e.value)} />
                </div>
            </div>
        </div>
    );
}
