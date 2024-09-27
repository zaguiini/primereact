import { ComponentProvider } from '@primereact/core/component';
import { useIcon } from '@primereact/icons/base';
import * as React from 'react';

export const BlankIcon = React.forwardRef((inProps, inRef) => {
    const icon = useIcon(inProps, inRef);

    return (
        <ComponentProvider pIf={props.pIf} value={icon}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...icon.pti()}>
                <rect width="1" height="1" fill="currentColor" fillOpacity="0" />
            </svg>
        </ComponentProvider>
    );
});
