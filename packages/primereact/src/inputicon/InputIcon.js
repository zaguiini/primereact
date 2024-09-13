import { ComponentProvider } from '@primereact/core/component';
import { useMergeProps } from '@primereact/hooks';
import React, { useContext, useRef } from 'react';
import { PrimeReactContext } from '../api/Api';
import { classNames } from '../utils/Utils';
import { useInputIcon } from './InputIcon.base';
import { InputIconBase } from './InputIconBase';

export const InputIcon = React.memo(
    React.forwardRef((inProps, inRef) => {
        const inputicon = useInputIcon(inProps, inRef);
        const { props, ptm, ptmi, cx, ref } = inputicon;

        const elementRef = useRef(ref);
        const mergeProps = useMergeProps();
        const context = useContext(PrimeReactContext);
        const props = InputIconBase.getProps(inProps, context);

        const { ptm, cx } = InputIconBase.setMetaData({
            props,
            ...props.__parentMetadata,
            context: {
                iconPosition: props.iconPosition
            }
        });

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
