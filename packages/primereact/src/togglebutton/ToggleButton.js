import { Component, ComponentProvider } from '@primereact/core/component';
import { Icon } from '@primereact/icons/base';
import { isNotEmpty, mergeProps, resolve } from '@primeuix/utils';
import { Ripple } from 'primereact/ripple';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useToggleButton } from './ToggleButton.base';

export const ToggleButton = React.memo(
    React.forwardRef((inProps, inRef) => {
        const togglebutton = useToggleButton(inProps, inRef);
        const {
            props,
            ptm,
            ptmi,
            cx,
            id,
            // element refs
            elementRef,
            // methods
            onClick,
            // computed
            active,
            label
        } = togglebutton;

        const getPTOptions = (key) => {
            const _ptm = key === 'root' ? ptmi : ptm;

            return _ptm(key, {
                context: {
                    active,
                    disabled: props.disabled
                }
            });
        };

        const createLabel = () => {
            const labelProps = mergeProps(
                {
                    className: cx('label')
                },
                getPTOptions('label')
            );

            return <span {...labelProps}>{label}</span>;
        };

        const createIcon = () => {
            const icon = resolve(props.iconTemplate, { active, togglebutton }) || active ? props.onIcon : props.offIcon;

            if (icon) {
                const iconProps = mergeProps(
                    {
                        className: cx('icon')
                    },
                    getPTOptions('icon')
                );

                return <Icon as={icon} {...iconProps} />;
            }

            return null;
        };

        const createContent = () => {
            const contentProps = mergeProps(
                {
                    className: cx('content')
                },
                getPTOptions('content')
            );

            const icon = createIcon();
            const label = createLabel();

            return (
                <span {...contentProps}>
                    {icon}
                    {label}
                </span>
            );
        };

        const content = props.children || createContent();

        const rootProps = mergeProps(
            {
                id,
                type: 'button',
                className: cx('root'),
                disabled: props.disabled,
                'aria-pressed': active,
                onClick,
                'data-p-checked': active,
                'data-p-disabled': props.disabled
            },
            getPTOptions('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={togglebutton}>
                <Component as={props.as || 'button'} {...rootProps} ref={elementRef}>
                    {content}
                    <Ripple />
                </Component>
                <Tooltip pIf={isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />
            </ComponentProvider>
        );
    })
);

ToggleButton.displayName = 'ToggleButton';
