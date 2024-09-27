import { Component, ComponentProvider } from '@primereact/core/component';
import { classNames, mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useAvatarGroup } from './AvatarGroup.base';

export const AvatarGroup = React.forwardRef((inProps, inRef) => {
    const avatargroup = useAvatarGroup(inProps, inRef);
    const { props, ptm, ptmi, cx, ref } = avatargroup;

    const rootProps = mergeProps(
        {
            ref,
            style: props.style,
            className: classNames(props.className, cx('root'))
        },
        ptmi('root')
    );

    return (
        <ComponentProvider pIf={props.pIf} value={avatargroup}>
            <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                {props.children}
            </Component>
        </ComponentProvider>
    );
});

AvatarGroup.displayName = 'AvatarGroup';
