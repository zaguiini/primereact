import { Component, ComponentProvider } from '@primereact/core/component';
import { TimesCircleIcon } from '@primereact/icons/timescircle';
import { classNames, mergeProps } from '@primeuix/utils';
import { IconUtils, ObjectUtils } from 'primereact/utils';
import * as React from 'react';
import { useChip } from './Chip.base';

export const Chip = React.memo(
    React.forwardRef((inProps, inRef) => {
        const [visibleState, setVisibleState] = React.useState(true);
        const state = {
            visible: visibleState
        };
        const chip = useChip(inProps, inRef, state);
        const { props, ptm, ptmi, cx, ref } = chip;

        const onKeyDown = (event) => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Backspace') {
                close(event);
            }
        };

        const close = (event) => {
            setVisibleState(false);

            if (props.onRemove) {
                props.onRemove({
                    originalEvent: event,
                    value: props.label || props.image || props.icon
                });
            }
        };

        const createContent = () => {
            let content = [];

            if (props.image) {
                const imageProps = mergeProps(
                    {
                        className: cx('image'),
                        src: props.image,
                        onError: props.onImageError
                    },
                    ptm('image')
                );

                content.push(<img alt={props.imageAlt} {...imageProps} key="image" />);
            } else if (props.icon) {
                const chipIconProps = mergeProps(
                    {
                        className: cx('icon')
                    },
                    ptm('icon')
                );

                content.push(<React.Fragment key="icon">{IconUtils.getJSXIcon(props.icon, { ...chipIconProps }, { props })}</React.Fragment>);
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
                        role: 'button',
                        tabIndex: 0,
                        className: cx('removeIcon'),
                        onClick: close,
                        onKeyDown
                    },
                    ptm('removeIcon')
                );

                const icon = props.removeIcon || <TimesCircleIcon {...removeIconProps} />;

                content.push(<React.Fragment key="removeIcon">{IconUtils.getJSXIcon(icon, { ...removeIconProps }, { props })}</React.Fragment>);
            }

            return content;
        };

        const createElement = () => {
            const content = props.children ? ObjectUtils.getJSXElement(props.children, props) : createContent();

            const rootProps = mergeProps(
                {
                    ref,
                    style: props.style,
                    className: classNames(props.className, cx('root')),
                    'aria-label': props.label
                },
                ptmi('root')
            );

            return (
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {content}
                </Component>
            );
        };

        const element = visibleState ? createElement() : null;

        return (
            <ComponentProvider pIf={props.pIf} value={chip}>
                {element}
            </ComponentProvider>
        );
    })
);

Chip.displayName = 'Chip';
