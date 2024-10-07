import { ComponentProvider } from '@primereact/core/component';
import { Icon } from '@primereact/icons/base';
import { ChevronUpIcon } from '@primereact/icons/chevronup';
import { mergeProps, resolve } from '@primeuix/utils';
import { Button } from 'primereact/button';
import { CSSTransition } from 'primereact/csstransition';
import * as React from 'react';

export const ScrollTop = React.memo(
    React.forwardRef((inProps, inRef) => {
        const scrolltop = useScrollTop(inProps, inRef);
        const {
            id,
            props,
            state,
            ptm,
            ptmi,
            cx,
            // element refs
            elementRef,
            scrollElementRef,
            // methods
            onClick,
            onEnter,
            onEntered,
            onExited,
            // computed
            scrollTopAriaLabel
        } = scrolltop;

        const iconProps = mergeProps(
            {
                className: cx('icon')
            },
            ptm('icon')
        );

        const icon = resolve(props.iconTemplate, iconProps, scrolltop) || <Icon as={props.icon || <ChevronUpIcon />} {...iconProps} />;

        const transitionProps = mergeProps(
            {
                classNames: cx('transition'),
                in: state.visible,
                timeout: { enter: 150, exit: 150 },
                options: props.transitionOptions,
                unmountOnExit: true,
                onEnter,
                onEntered,
                onExited
            },
            ptm('transition')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={scrolltop}>
                <CSSTransition nodeRef={scrollElementRef} {...transitionProps}>
                    <Button ref={scrollElementRef} as={props.as} id={id} className={cx('root')} icon={icon} onClick={onClick} aria-label={scrollTopAriaLabel} unstyled={props.unstyled} {...props.buttonProps} pt={props.pt}></Button>
                </CSSTransition>
            </ComponentProvider>
        );
    })
);

ScrollTop.displayName = 'ScrollTop';
