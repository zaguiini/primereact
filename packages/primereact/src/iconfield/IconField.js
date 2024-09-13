import { ComponentProvider } from '@primereact/core/component';
import { useMergeProps } from '@primereact/hooks';
import React, { Children, cloneElement, useContext, useRef } from 'react';
import { PrimeReactContext } from '../api/Api';
import { classNames } from '../utils/Utils';
import { useIconField } from './IconField.base';
import { IconFieldBase } from './IconFieldBase';

export const IconField = React.memo(
    React.forwardRef((inProps, inRef) => {
        const iconfield = useIconField(inProps, inRef);
        const { props, ptm, ptmi, cx, ref } = iconfield;

        const elementRef = useRef(ref);
        const mergeProps = useMergeProps();
        const context = useContext(PrimeReactContext);
        const props = IconFieldBase.getProps(inProps, context);

        const { ptm, cx } = IconFieldBase.setMetaData({
            props,
            ...props.__parentMetadata,
            context: {
                iconPosition: props.iconPosition
            }
        });

        const rootProps = mergeProps(
            {
                className: classNames(props.className, cx('root', { iconPosition: props.iconPosition }))
            },
            IconFieldBase.getOtherProps(props),
            ptm('root')
        );

        return (
            <ComponentProvider value={iconfield}>
                <div {...rootProps} ref={elementRef}>
                    {Children.map(props.children, (child, index) =>
                        cloneElement(child, {
                            iconPosition: props.iconPosition
                        })
                    )}
                </div>
            </ComponentProvider>
        );
    })
);

IconField.displayName = 'IconField';
