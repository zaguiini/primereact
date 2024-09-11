import { PresetContext } from '@/components/providers/presetProvider';
import colorPresets from '@/components/utils/colorPresets.json';
import { PrimeReactContext } from '@primereact/core/config';
import { classNames } from '@primeuix/utils';
import { SelectButton } from 'primereact/selectbutton';
import { useContext } from 'react';

const PresetMenu = () => {
    const { ripple, setRipple } = useContext(PrimeReactContext);
    const { primaryColors, surfaceColors } = colorPresets;
    const { preset, changePreset, currentPrimaryColor, currentSurfaceColor, updatePrimaryColors, updateSurfaceColors } = useContext(PresetContext);
    const items = [
        { name: 'Aura', value: 'aura' },
        { name: 'Lara', value: 'lara' },
        { name: 'Nora', value: 'nora' }
    ];

    return (
        <div className="absolute top-[2.5rem] right-0 w-[14rem] p-3 bg-white dark:bg-surface-800 rounded-md shadow border border-surface-200 dark:border-surface-700 flex-col justify-start items-start gap-3.5 inline-flex origin-top">
            <div className="flex-col justify-start items-start gap-2 inline-flex pr-4">
                <span className="config-panel-label">Primary</span>
                <div className="self-stretch justify-start items-start gap-2 inline-flex flex-wrap">
                    {primaryColors.map((primaryColor) => (
                        <button
                            type="button"
                            key={primaryColor.name}
                            className={classNames('w-4 h-4 rounded-full cursor-pointer', {
                                'ring-2 ring-offset-2 ring-offset-surface-0 dark:ring-offset-surface-800 ring-primary-500': primaryColor.name === currentPrimaryColor.name
                            })}
                            style={{ backgroundColor: `${primaryColor.palette?.['500']}` }}
                            onClick={() => updatePrimaryColors(primaryColor.name)}
                        ></button>
                    ))}
                </div>
            </div>
            <div className="flex-col justify-start items-start gap-2 inline-flex pr-2">
                <span className="config-panel-label">Surface</span>
                <div className="self-stretch justify-start items-start gap-2 inline-flex">
                    {surfaceColors.map((surface) => (
                        <button
                            type="button"
                            key={surface.name}
                            className={classNames('w-4 h-4 rounded-full cursor-pointer', {
                                'ring-2 ring-offset-2 ring-offset-surface-0 dark:ring-offset-surface-800 ring-surface-500': surface.name === currentSurfaceColor.name
                            })}
                            style={{ backgroundColor: `${surface.palette?.['600']}` }}
                            onClick={() => updateSurfaceColors(surface.name)}
                        ></button>
                    ))}
                </div>
            </div>
            <span className="config-panel-label">Presets</span>
            <SelectButton value={preset.name} onChange={(e) => changePreset(e.value)} optionLabel="name" options={items} allowEmpty={false} />
            <div className="flex justify-between items-center gap-2 w-full pt-4 pb-2 border-t border-surface-200 dark:border-surface-700">
                <span className="text-black dark:text-surface-0 text-sm font-medium m-0">Ripple Effect</span>
                <input type="checkbox" name="Ripple" value="ripple" onChange={(e) => setRipple(e.target.checked)} checked={ripple} />
                {/* <InputSwitch checked={ripple} onChange={(e) => setRipple(e.value)} /> */}
            </div>
        </div>
    );
};

export default PresetMenu;
