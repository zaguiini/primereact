import { Component, ComponentProvider } from '@primereact/core/component';
import { Icon } from '@primereact/icons/base';
import { MinusIcon } from '@primereact/icons/minus';
import { PlusIcon } from '@primereact/icons/plus';
import { mergeProps, resolve } from '@primeuix/utils';
import { CSSTransition } from 'primereact/csstransition';
import * as React from 'react';
import { usePanel } from './Panel.base';

export const Panel = React.forwardRef((inProps, inRef) => {
    const panel = usePanel(inProps, inRef);
    const {
        id,
        props,
        state,
        ptm,
        ptmi,
        cx,
        // element refs
        elementRef,
        contentRef,
        // methods
        onButtonClick,
        // computed
        buttonAriaLabel
    } = panel;

    const headerId = id + '_header';
    const contentId = id + '_content';

    const createFooter = () => {
        const footer = resolve(props.footerTemplate || props.footer, panel);

        const footerProps = mergeProps(
            {
                className: cx('footer')
            },
            ptm('footer')
        );

        return footer ? <div {...footerProps}>{footer}</div> : null;
    };

    const createContent = () => {
        const content = resolve(props.template || props.children, panel);

        const contentProps = mergeProps(
            {
                className: cx('content')
            },
            ptm('content')
        );

        const contentContainerProps = mergeProps(
            {
                id: contentId,
                className: cx('contentContainer'),
                role: 'region',
                'aria-labelledby': headerId
            },
            ptm('contentContainer')
        );

        const transitionProps = mergeProps(
            {
                classNames: cx('transition'),
                timeout: { enter: 1000, exit: 450 },
                in: !state.collapsed,
                unmountOnExit: true,
                options: props.transitionOptions
            },
            ptm('transition')
        );

        return (
            <CSSTransition {...transitionProps} nodeRef={contentRef}>
                <div {...contentContainerProps} ref={contentRef}>
                    <div {...contentProps}>{content}</div>
                </div>
            </CSSTransition>
        );
    };

    const createHeaderActions = () => {
        const icons = resolve(props.icons, panel);
        const toggleIcon = resolve(props.toggleIconTemplate, panel) || <Icon as={state.collapsed ? props.expandIcon || <PlusIcon /> : props.collapseIcon || <MinusIcon />} />;

        const headerActionsProps = mergeProps(
            {
                className: cx('headerActions')
            },
            ptm('headerActions')
        );

        return (
            <div {...headerActionsProps}>
                {icons}
                <Button
                    pIf={props.toggleable}
                    id={headerId}
                    className={cx('pcToggleButton')}
                    icon={toggleIcon}
                    unstyled={props.unstyled}
                    aria-label={buttonAriaLabel}
                    aria-controls={contentId}
                    aria-expanded={!state.collapsed}
                    onClick={onButtonClick}
                    {...props.toggleButtonProps}
                    pt={ptm('pcToggleButton')}
                />
            </div>
        );
    };

    const createHeaderTitle = () => {
        const titleProps = mergeProps(
            {
                id: headerId,
                className: cx('title')
            },
            ptm('title')
        );

        return resolve(props.headerTemplate, titleProps, panel) || props.header ? <span {...titleProps}>{resolve(props.header, panel)}</span> : null;
    };

    const createHeader = () => {
        const title = createHeaderTitle();
        const actions = createHeaderActions();

        const headerProps = mergeProps(
            {
                className: cx('header')
            },
            ptm('header')
        );

        return (
            <div {...headerProps}>
                {title}
                {actions}
            </div>
        );
    };

    const header = createHeader();
    const content = createContent();
    const footer = createFooter();

    const rootProps = mergeProps(
        {
            id,
            className: cx('root')
        },
        ptmi('root')
    );

    return (
        <ComponentProvider pIf={props.pIf} value={panel}>
            <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                {header}
                {content}
                {footer}
            </Component>
        </ComponentProvider>
    );
});

Panel.displayName = 'Panel';
