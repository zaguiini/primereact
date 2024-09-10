import { ComponentProvider } from '@primereact/core/component';
import { classNames, isNotEmpty, mergeProps, resolve } from '@primeuix/utils';
import { IconUtils } from 'primereact/utils';
import * as React from 'react';
import { useAvatar } from './Avatar.base';

export const Avatar = React.forwardRef((inProps, inRef) => {
    const [imageFailed, setImageFailed] = React.useState(false);
    const state = {
        imageFailed
    };

    const avatar = useAvatar(inProps, inRef, state);
    const { props, ptm, ptmi, cx, ref } = avatar;

    const createContent = () => {
        if (isNotEmpty(props.image) && !imageFailed) {
            const imageProps = mergeProps(
                {
                    src: props.image,
                    onError: onImageError
                },
                ptm('image')
            );

            return <img alt={props.imageAlt} {...imageProps} />;
        } else if (props.label) {
            const labelProps = mergeProps(
                {
                    className: cx('label')
                },
                ptm('label')
            );

            return <span {...labelProps}>{props.label}</span>;
        } else if (props.icon) {
            // @todo: Add templating support
            const iconProps = mergeProps(
                {
                    className: cx('icon')
                },
                ptm('icon')
            );

            return IconUtils.getJSXIcon(props.icon, { ...iconProps }, { props });
        }

        return null;
    };

    const onImageError = (event) => {
        if (props.imageFallback === 'default') {
            if (!props.onImageError) {
                // fallback to label or icon
                setImageFailed(true);
                event.target.src = null;
            }
        } else {
            // try fallback as an image
            event.target.src = props.imageFallback;
        }

        props.onImageError && props.onImageError(event);
    };

    const rootProps = mergeProps(
        {
            ref,
            style: props.style,
            className: classNames(props.className, cx('root'))
        },
        ptmi('root')
    );

    // @todo: use <Component is>
    const content = props.children ? resolve(props.children, props) : createContent();

    return (
        <ComponentProvider value={avatar}>
            <div {...rootProps}>{content}</div>
        </ComponentProvider>
    );
});

Avatar.displayName = 'Avatar';
