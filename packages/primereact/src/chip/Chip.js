import { Component, ComponentProvider } from '@primereact/core/component';
import { Icon } from '@primereact/icons/base';
import { TimesCircleIcon } from '@primereact/icons/timescircle';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useChip } from './Chip.base';

export const Chip = React.memo(
    React.forwardRef((inProps, inRef) => {
        const chip = useChip(inProps, inRef);
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
            close,
            onKeyDown
        } = chip;

        const createContent = () => {
            let content = [];

            if (props.image) {
                const imageProps = mergeProps(
                    {
                        className: cx('image'),
                        src: props.image,
                        alt: props.imageAlt,
                        onError: props.onImageError
                    },
                    ptm('image')
                );

                content.push(<img {...imageProps} key="image" />);
            } else if (props.icon) {
                const iconProps = mergeProps(
                    {
                        className: cx('icon')
                    },
                    ptm('icon')
                );

                content.push(<Icon as={props.iconTemplate || props.icon} {...iconProps} key="icon" />);
            }

            if (props.label) {
                const labelProps = mergeProps(
                    {
                        className: cx('label')
                    },
                    ptm('label')
                );

                content.push(
                    <div {...labelProps} key="label">
                        {props.label}
                    </div>
                );
            }

            if (props.removable) {
                const removeIconProps = mergeProps(
                    {
                        className: cx('removeIcon'),
                        tabIndex: 0,
                        onClick: close,
                        onKeyDown
                    },
                    ptm('removeIcon')
                );

                content.push(<Icon as={props.removeIconTemplete || props.removeIcon || <TimesCircleIcon />} {...removeIconProps} key="removeIcon" />);
            }

            return content;
        };

        const content = resolve(props.template || props.children, chip) || createContent();

        const rootProps = mergeProps(
            {
                id,
                className: cx('root'),
                'aria-label': props.label
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={chip}>
                <Component pIf={state.visible} as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {content}
                </Component>
            </ComponentProvider>
        );
    })
);

Chip.displayName = 'Chip';
