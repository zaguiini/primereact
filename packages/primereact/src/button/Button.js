import { ComponentProvider } from '@primereact/core/component';
import { SpinnerIcon } from '@primereact/icons/spinner';
import { classNames, isNotEmpty, mergeProps } from '@primeuix/utils';
import { Badge } from 'primereact/badge';
import { Ripple } from 'primereact/ripple';
import { Tooltip } from 'primereact/tooltip';
import { IconUtils } from 'primereact/utils';
import * as React from 'react';
import { useButton } from './Button.base';

export const Button = React.memo(
    React.forwardRef((inProps, inRef) => {
        const button = useButton(inProps, inRef);
        const { props, attrs, ptm, cx, ref } = button;
        const disabled = props.disabled || props.loading;

        if (props.visible === false) {
            return null;
        }

        const createIcon = () => {
            let className = classNames('p-button-icon p-c', {
                [`p-button-icon-${props.iconPos}`]: props.label
            });

            const iconsProps = mergeProps(
                {
                    className: cx('icon')
                },
                ptm('icon')
            );

            className = classNames(className, {
                'p-button-loading-icon': props.loading
            });

            const loadingIconProps = mergeProps(
                {
                    className: cx('loadingIcon', { className })
                },
                ptm('loadingIcon')
            );

            const icon = props.loading ? props.loadingIcon || <SpinnerIcon {...loadingIconProps} spin /> : props.icon;

            return IconUtils.getJSXIcon(icon, { ...iconsProps }, { props });
        };

        const createLabel = () => {
            const labelProps = mergeProps(
                {
                    className: cx('label')
                },
                ptm('label')
            );

            if (props.label) {
                return <span {...labelProps}>{props.label}</span>;
            }

            return !props.children && !props.label && <span {...labelProps} dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />;
        };

        const createBadge = () => {
            if (props.badge) {
                const badgeProps = mergeProps(
                    {
                        className: classNames(props.badgeClassName),
                        value: props.badge,
                        unstyled: props.unstyled,
                        __parentMetadata: { parent: metaData }
                    },
                    ptm('badge')
                );

                return <Badge {...badgeProps}>{props.badge}</Badge>;
            }

            return null;
        };

        const showTooltip = !disabled || (props.tooltipOptions && props.tooltipOptions.showOnDisabled);
        const hasTooltip = isNotEmpty(props.tooltip) && showTooltip;
        const sizeMapping = {
            large: 'lg',
            small: 'sm'
        };
        const size = sizeMapping[props.size];

        const icon = createIcon();
        const label = createLabel();
        const badge = createBadge();
        const defaultAriaLabel = props.label ? props.label + (props.badge ? ' ' + props.badge : '') : props['aria-label'];

        const rootProps = mergeProps(
            {
                ref,
                'aria-label': defaultAriaLabel,
                'data-pc-autofocus': props.autoFocus,
                className: classNames(props.className, cx('root', { size, disabled })),
                disabled: disabled
            },
            attrs,
            ptm('root')
        );

        return (
            <ComponentProvider value={button}>
                <button {...rootProps}>
                    {icon}
                    {label}
                    {props.children}
                    {badge}
                    <Ripple />
                </button>
                {hasTooltip && <Tooltip target={ref} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />}
            </ComponentProvider>
        );
    })
);

Button.displayName = 'Button';
