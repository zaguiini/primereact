import { ComponentProvider } from '@primereact/core/component';
import React, { Children, cloneElement, useRef } from 'react';
import { classNames } from '../utils/Utils';
import { useIconField } from './IconField.base';
import { IconFieldBase } from './IconFieldBase';

export const IconField = React.memo(
    React.forwardRef((inProps, inRef) => {
        const iconfield = useIconField(inProps, inRef);
        const { props, ptm, ptmi, cx, ref } = iconfield;

        const elementRef = useRef(ref);

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
