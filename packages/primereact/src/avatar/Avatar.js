import { Component, ComponentProvider } from '@primereact/core/component';
import { Icon } from '@primereact/icons/base';
import { isNotEmpty, mergeProps, resolve } from '@primeuix/utils';
import * as React from 'react';
import { useAvatar } from './Avatar.base';

export const Avatar = React.forwardRef((inProps, inRef) => {
    const avatar = useAvatar(inProps, inRef);
    const {
        id,
        props,
        state,
        ptm,
        ptmi,
        cx,
        // element refs
        elementRef,
        // methods
        onImageError
    } = avatar;

    const createContent = () => {
        if (isNotEmpty(props.image) && !state.imageFailed) {
            const imageProps = mergeProps(
                {
                    src: props.image,
                    alt: props.imageAlt,
                    onError: onImageError
                },
                ptm('image')
            );

            return <img {...imageProps} />;
        } else if (props.label) {
            const labelProps = mergeProps(
                {
                    className: cx('label')
                },
                ptm('label')
            );

            return <span {...labelProps}>{props.label}</span>;
        } else if (props.icon) {
            const iconProps = mergeProps(
                {
                    className: cx('icon')
                },
                ptm('icon')
            );

            return <Icon as={props.iconTemplate || props.icon} {...iconProps} />;
        }

        return null;
    };

    const content = resolve(props.template || props.children, avatar) || createContent();

    const rootProps = mergeProps(
        {
            id,
            className: cx('root')
        },
        ptmi('root')
    );

    return (
        <ComponentProvider pIf={props.pIf} value={avatar}>
            <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                {content}
            </Component>
        </ComponentProvider>
    );
});

Avatar.displayName = 'Avatar';
