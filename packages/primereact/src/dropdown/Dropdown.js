import { useMountEffect } from '@primereact/hooks';
import { Select } from 'primereact/select';
import * as React from 'react';

export const Dropdown = React.memo(
    React.forwardRef((inProps, inRef) => {
        useMountEffect(() => {
            console.warn('Deprecated since v12. Use Select component instead.');
        });

        return <Select ref={inRef} {...inProps} />;
    })
);

Dropdown.displayName = 'Dropdown';
