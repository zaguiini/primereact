import { ComponentProvider } from '@primereact/core/component';
import React, { useRef } from 'react';
import { classNames } from '../utils/Utils';
import { useInputIcon } from './InputIcon.base';
import { InputIconBase } from './InputIconBase';

export const InputIcon = React.memo(
    React.forwardRef((inProps, inRef) => {
        const inputicon = useInputIcon(inProps, inRef);
        const { props, ptm, ptmi, cx, ref } = inputicon;

        const elementRef = useRef(ref);

        const rootProps = mergeProps(
            {
                className: classNames(props.className, cx('root'))
            },
            InputIconBase.getOtherProps(props),
            ptm('root')
        );

        return (
            <ComponentProvider value={inputicon}>
                <span {...rootProps} ref={elementRef}>
                    {props.children}
                </span>
            </ComponentProvider>
        );
    })
);

InputIcon.displayName = 'InputIcon';
