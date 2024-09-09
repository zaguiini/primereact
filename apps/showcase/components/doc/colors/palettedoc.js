import { DocSectionText } from '@/components/doc/common/docsectiontext';
import React from 'react';

export function PaletteDoc(props) {
    const colors = ['primary', 'blue', 'green', 'yellow', 'cyan', 'pink', 'indigo', 'teal', 'orange', 'bluegray', 'purple', 'red', 'gray'];
    const shades = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

    return (
        <>
            <DocSectionText {...props}>
                <p>Colors palette consists of 13 main colors where each color provides tints/shades from 50 to 900.</p>
            </DocSectionText>
            <div className="card">
                <div className="flex flex-wrap gap-12">
                    {colors.map((color) => {
                        return (
                            <div key={color} className="flex flex-col">
                                {shades.map((shade) => {
                                    return (
                                        <React.Fragment key={shade}>
                                            {shade !== 0 && (
                                                <div className="w-72 flex items-center p-4 font-bold" style={{ backgroundColor: `var(--${color}-${shade})`, color: shade > 500 ? '#fff' : '#000' }}>
                                                    {color}-{shade}
                                                </div>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
