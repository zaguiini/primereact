import { Component, ComponentProvider } from '@primereact/core/component';
import { SpinnerIcon } from '@primereact/icons/spinner';
import { classNames, isNotEmpty, mergeProps, resolve } from '@primeuix/utils';
import { Badge } from 'primereact/badge';
import { Ripple } from 'primereact/ripple';
import { Tooltip } from 'primereact/tooltip';
import { IconUtils } from 'primereact/utils';
import * as React from 'react';
import { useButton } from './Button.base';

export const Button = React.memo(
    React.forwardRef((inProps, inRef) => {
        const button = useButton(inProps, inRef);
        const {
            props,
            state,
            ptm,
            ptmi,
            cx,
            id,
            // element refs
            elementRef,
            focusInputRef,
            clearIconRef,
            // methods
            onFocus,
            onBlur,
            onKeyDown,
            onEditableInput,
            onContainerClick,
            onClearClick,
            // computed
            selectedOption,
            label: labelText,
            editableInputValue,
            focusedOptionId,
            isClearIconVisible
        } = button;

        const disabled = props.disabled || props.loading;
        const defaultAriaLabel = props.label ? props.label + (props.badge ? ' ' + props.badge : '') : attrs['aria-label'];
        const hasFluid = {}; // @todo: check Fluid component

        const getPTOptions = (key) => {
            const _ptm = key === 'root' ? ptmi : ptm;

            return _ptm(key, {
                context: {
                    disabled
                }
            });
        };

        const createLoadingIcon = () => {
            const iconProps = mergeProps(
                {
                    className: classNames(cx('loadingIcon'), cx('icon'), props.loadingIcon)
                },
                getPTOptions('loadingIcon')
            );

            const icon = resolve(props.loadingIcon, { props: iconProps }) || <SpinnerIcon spin {...iconProps} />;

            return IconUtils.getJSXIcon(icon, { ...iconProps }, { props });
        };

        const createIcon = () => {
            const iconProps = mergeProps(
                {
                    className: classNames(cx('icon'), props.icon, props.iconClassName)
                },
                getPTOptions('icon')
            );

            return IconUtils.getJSXIcon(resolve(props.icon, { props }), { ...iconProps }, { props });
        };

        const createLabel = () => {
            const labelProps = mergeProps(
                {
                    className: cx('label')
                },
                getPTOptions('label'),
                !props.label && { dangerouslySetInnerHTML: { __html: '&nbsp;' } }
            );

            return <span {...labelProps}>{props.label}</span>;
        };

        const createBadge = () => {
            if (props.badge) {
                return <Badge value={props.badge} className={props.badgeClassName} severity={props.badgeSeverity} unstyled={props.unstyled} pt={getPTOptions('pcBadge')}></Badge>;
            }

            return null;
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

        const showTooltip = !disabled || (props.tooltipOptions && props.tooltipOptions.showOnDisabled);
        const hasTooltip = isNotEmpty(props.tooltip) && showTooltip;

        const content = props.children || createContent();

        const rootProps = mergeProps(
            {
                ref,
                type: 'button',
                style: props.style,
                className: classNames(cx('root'), props.className),
                disabled,
                'aria-label': defaultAriaLabel,
                'data-pc-name': 'button',
                'data-p-disabled': disabled,
                'data-p-severity': props.severity
            },
            getPTOptions('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={button}>
                <Component as={props.as || 'button'} {...rootProps} ref={elementRef}>
                    {content}
                    <Ripple />
                </Component>
                <Tooltip pIf={isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />
            </ComponentProvider>
        );
    })
);

Button.displayName = 'Button';
