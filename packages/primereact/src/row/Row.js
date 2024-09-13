import { ComponentProvider } from '@primereact/core/component';
import { useMergeProps } from '@primereact/hooks';
import * as React from 'react';
import { PrimeReactContext } from '../api/Api';
import { useRow } from './Row.base';
import { RowBase } from './RowBase';

export const Row = (inProps, inRef) => {
    const row = useRow(inProps, inRef);
    const { props, ptm, ptmi, cx, ref } = row;

    const mergeProps = useMergeProps();
    const context = React.useContext(PrimeReactContext);
    const props = RowBase.getProps(inProps, context);
    //@todo Pass Parent MetaData
    const { ptm } = RowBase.setMetaData({
        props: props
    });

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
