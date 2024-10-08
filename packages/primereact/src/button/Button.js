import { Component, ComponentProvider } from '@primereact/core/component';
import { SpinnerIcon } from '@primereact/icons/spinner';
import { classNames, isNotEmpty, mergeProps, resolve } from '@primeuix/utils';
import { Badge } from 'primereact/badge';
import { Ripple } from 'primereact/ripple';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useButton } from './Button.base';

export const Button = React.memo(
    React.forwardRef((inProps, inRef) => {
        const button = useButton(inProps, inRef);
        const {
            id,
            props,
            ptm,
            ptmi,
            cx,
            // element refs
            elementRef,
            // computed
            disabled,
            a11yAttrs,
            inAttrs
        } = button;

        const getPTOptions = (key) => {
            const _ptm = key === 'root' ? ptmi : ptm;

            return _ptm(key, {
                context: {
                    disabled
                }
            });
        };

        const createBadge = () => {
            if (props.badge) {
                return <Badge value={props.badge} className={props.badgeClassName} severity={props.badgeSeverity} unstyled={props.unstyled} pt={getPTOptions('pcBadge')}></Badge>;
            }

            return null;
        };

        const createLabel = () => {
            const label = resolve(props.label, button);

            const labelProps = mergeProps(
                {
                    className: cx('label')
                },
                getPTOptions('label'),
                !props.label && { dangerouslySetInnerHTML: { __html: '&nbsp;' } }
            );

            return <span {...labelProps}>{label}</span>;
        };

        const createIcon = () => {
            const iconProps = mergeProps(
                {
                    className: classNames(cx('icon'), props.icon, props.iconClassName)
                },
                getPTOptions('icon')
            );

            return <Icon as={props.icon} {...iconProps} />;
        };

        const createLoadingIcon = () => {
            const iconProps = mergeProps(
                {
                    className: classNames(cx('loadingIcon'), cx('icon'))
                },
                getPTOptions('loadingIcon')
            );

            return <Icon as={props.loadingIcon || <SpinnerIcon spin />} {...iconProps} />;
        };

        const createContent = () => {
            const icon = props.loading ? createLoadingIcon() : createIcon();
            const label = createLabel();
            const badge = createBadge();

            return (
                <>
                    {icon}
                    {label}
                    {props.children}
                    {badge}
                </>
            );
        };

        const createButton = () => {
            const content = resolve(props.template || props.children, button) || createContent();

            const rootProps = mergeProps(
                {
                    id,
                    className: cx('root')
                },
                inAttrs,
                getPTOptions('root')
            );

            return (
                <>
                    <Component as={props.as || 'button'} {...rootProps} ref={elementRef}>
                        {content}
                        <Ripple />
                    </Component>
                    <Tooltip pIf={isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />
                </>
            );
        };

        const component = props.asChild ? <Component asChild={props.asChild} options={{ ref: elementRef, className: cx('root'), a11yAttrs }} /> : createButton();

        return (
            <ComponentProvider pIf={props.pIf} value={button}>
                {component}
            </ComponentProvider>
        );
    })
);

Button.displayName = 'Button';
