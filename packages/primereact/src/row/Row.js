import { ComponentProvider } from '@primereact/core/component';
import * as React from 'react';
import { useRow } from './Row.base';
import { RowBase } from './RowBase';

export const Row = (inProps, inRef) => {
    const row = useRow(inProps, inRef);
    const { props, ptm, ptmi, cx, ref } = row;

    const rootProps = mergeProps(
        {
            className: props.className,
            style: props.style
        },
        RowBase.getOtherProps(props),
        ptm('root')
    );

    return (
        <ComponentProvider value={row}>
            <tr {...rootProps}>{props.children}</tr>
        </ComponentProvider>
    );
};

Row.displayName = 'Row';
