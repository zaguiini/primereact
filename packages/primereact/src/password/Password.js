import { Component, ComponentProvider } from '@primereact/core/component';
import { Icon } from '@primereact/icons/base';
import { EyeIcon } from '@primereact/icons/eye';
import { EyeSlashIcon } from '@primereact/icons/eyeslash';
import { classNames, mergeProps, resolve } from '@primeuix/utils';
import { CSSTransition } from 'primereact/csstransition';
import { InputText } from 'primereact/inputtext';
import { Portal } from 'primereact/portal';
import * as React from 'react';
import { usePassword } from './Password.base';

export const Password = React.memo(
    React.forwardRef((inProps, inRef) => {
        const password = usePassword(inProps, inRef);
        const {
            props,
            state,
            ptm,
            ptmi,
            cx,
            sx,
            id,
            // element refs
            overlayRef,
            inputRef,
            // methods
            onInput,
            onFocus,
            onBlur,
            onKeyUp,
            onOverlayClick,
            onOverlayEnter,
            onOverlayEntered,
            onOverlayExit,
            onOverlayExited,
            toggleMask,
            // computed
            inputType
        } = password;

        const createContent = () => {
            const meterTextProps = mergeProps(
                {
                    className: cx('meterText')
                },
                ptm('meterText')
            );

            const meterLabelProps = mergeProps(
                {
                    className: cx('meterLabel'),
                    style: { width: state.meter ? state.meter.width : '' }
                },
                ptm('meterLabel')
            );

            const meterProps = mergeProps(
                {
                    className: cx('meter')
                },
                ptm('meter')
            );

            const contentProps = mergeProps(
                {
                    className: cx('content')
                },
                ptm('content')
            );

            return (
                <div {...contentProps}>
                    <div {...meterProps}>
                        <div {...meterLabelProps}></div>
                    </div>
                    <div {...meterTextProps}>{state.infoText}</div>
                </div>
            );
        };

        const createOverlay = () => {
            const header = resolve(props.header, password);
            const content = resolve(props.content, password) || createContent();
            const footer = resolve(props.footer, password);

            const overlayProps = mergeProps(
                {
                    id: props.overlayId || `${id}_overlay`,
                    style: props.overlayStyle,
                    className: classNames(cx('overlay'), props.overlayClassName),
                    onClick: onOverlayClick
                },
                props.overlayProps,
                ptm('overlay')
            );

            const transitionProps = mergeProps(
                {
                    classNames: 'p-connected-overlay',
                    in: state.overlayVisible,
                    timeout: { enter: 120, exit: 100 },
                    options: props.transitionOptions,
                    unmountOnExit: true,
                    onEnter: onOverlayEnter,
                    onEntered: onOverlayEntered,
                    onExit: onOverlayExit,
                    onExited: onOverlayExited
                },
                ptm('transition')
            );

            return (
                <Portal appendTo={props.appendTo}>
                    <CSSTransition {...transitionProps} nodeRef={overlayRef}>
                        <div {...overlayProps} ref={overlayRef}>
                            {header}
                            {content}
                            {footer}
                        </div>
                    </CSSTransition>
                </Portal>
            );
        };

        const createHiddenInfo = () => {
            const hiddenInfoProps = mergeProps(
                {
                    className: 'p-hidden-accessible',
                    'aria-live': 'polite',
                    'data-p-hidden-accessible': true
                },
                ptm('hiddenAccesible')
            );

            return <span {...hiddenInfoProps}>{state.infoText}</span>;
        };

        const createIcon = () => {
            if (props.toggleMask) {
                const maskIconProps = mergeProps(
                    {
                        className: cx('maskIcon'),
                        onClick: toggleMask
                    },
                    ptm('maskIcon')
                );

                const unmaskIconProps = mergeProps(
                    {
                        className: cx('unmaskIcon'),
                        onClick: toggleMask
                    },
                    ptm('unmaskIcon')
                );

                return (
                    <>
                        <Icon is={state.unmasked} as={props.maskIcon || <EyeSlashIcon />} {...maskIconProps} />
                        <Icon is={!state.unmasked} as={props.unmaskIcon || <EyeIcon />} {...unmaskIconProps} />
                    </>
                );
            }

            return null;
        };

        const createInput = () => {
            return (
                <InputText
                    ref={inputRef}
                    id={props.inputId}
                    type={inputType}
                    className={classNames(cx('input'), props.inputClassName)}
                    style={props.inputStyle}
                    value={props.value}
                    aria-labelledby={props.ariaLabelledby}
                    aria-label={props.ariaLabel}
                    aria-controls={overlayProps?.id || props.overlayId || `${id}_overlay`}
                    aria-expanded={overlayVisible}
                    aria-haspopup={true}
                    placeholder={props.placeholder}
                    required={props.required}
                    fluid={props.fluid}
                    disabled={props.disabled}
                    variant={props.variant}
                    invalid={props.invalid}
                    autoFocus={props.autoFocus}
                    tooltip={props.tooltip}
                    tooltipOptions={props.tooltipOptions}
                    onChange={props.onChange}
                    onInput={onInput}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onKeyUp={onKeyUp}
                    {...props.inputProps}
                    pt={ptm('pcInputText')}
                    unstyled={props.unstyled}
                />
            );
        };

        const input = createInput();
        const icon = createIcon();
        const hiddenInfo = createHiddenInfo();
        const overlay = createOverlay();

        const rootProps = mergeProps(
            {
                id,
                style: sx('root'),
                className: cx('root')
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={password}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {input}
                    {icon}
                    {hiddenInfo}
                    {overlay}
                </Component>
            </ComponentProvider>
        );
    })
);

Password.displayName = 'Password';
