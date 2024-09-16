import { ComponentProvider } from '@primereact/core/component';
import { useMountEffect } from '@primereact/hooks';
import { MinusIcon } from '@primereact/icons/minus';
import { PlusIcon } from '@primereact/icons/plus';
import { classNames, mergeProps, resolve, uuid } from '@primeuix/utils';
import { CSSTransition } from 'primereact/csstransition';
import { Ripple } from 'primereact/ripple';
import { IconUtils } from 'primereact/utils';
import * as React from 'react';
import { usePanel } from './Panel.base';

export const Panel = React.forwardRef((inProps, inRef) => {
    const [idState, setIdState] = React.useState(inProps.id);
    const [collapsedState, setCollapsedState] = React.useState(inProps.collapsed);
    const collapsed = inProps.toggleable ? (inProps.onToggle ? inProps.collapsed : collapsedState) : false;
    const state = {
        id: idState,
        collapsed
    };
    const panel = usePanel(inProps, inRef, state);
    const { props, attrs, ptm, cx, ref } = panel;

    const elementRef = React.useRef(null);
    const contentRef = React.useRef(null);

    const headerId = idState + '_header';
    const contentId = idState + '_content';

    const toggle = (event) => {
        if (!props.toggleable) {
            return;
        }

        collapsed ? expand(event) : collapse(event);

        if (event) {
            if (props.onToggle) {
                props.onToggle({
                    originalEvent: event,
                    value: !collapsed
                });
            }

            event.preventDefault();
        }
    };

    const expand = (event) => {
        if (!props.onToggle) {
            setCollapsedState(false);
        }

        props.onExpand && event && props.onExpand(event);
    };

    const collapse = (event) => {
        if (!props.onToggle) {
            setCollapsedState(true);
        }

        props.onCollapse && event && props.onCollapse(event);
    };

    React.useImperativeHandle(ref, () => ({
        props,
        toggle,
        expand,
        collapse,
        getElement: () => elementRef.current,
        getContent: () => contentRef.current
    }));

    useMountEffect(() => {
        if (!idState) {
            setIdState(uuid());
        }
    });

    const createToggleIcon = () => {
        if (props.toggleable) {
            const buttonId = idState + '_label';
            const togglerProps = mergeProps(
                {
                    className: cx('toggler'),
                    onClick: toggle,
                    id: buttonId,
                    'aria-controls': contentId,
                    'aria-expanded': !collapsed,
                    type: 'button',
                    role: 'button',
                    'aria-label': props.header
                },
                ptm('toggler')
            );
            const togglerIconProps = mergeProps(ptm('togglericon'));

            const icon = collapsed ? props.expandIcon || <PlusIcon {...togglerIconProps} /> : props.collapseIcon || <MinusIcon {...togglerIconProps} />;
            const toggleIcon = IconUtils.getJSXIcon(icon, togglerIconProps, { props, collapsed });

            return (
                <button {...togglerProps}>
                    {toggleIcon}
                    <Ripple />
                </button>
            );
        }

        return null;
    };

    const createHeader = () => {
        const header = resolve(props.header, props);
        const icons = resolve(props.icons, props);
        const togglerElement = createToggleIcon();

        const titleProps = mergeProps(
            {
                id: headerId,
                className: cx('title')
            },
            ptm('title')
        );
        const titleElement = <span {...titleProps}>{header}</span>;

        const iconsProps = mergeProps(
            {
                className: cx('icons')
            },
            ptm('icons')
        );
        const iconsElement = (
            <div {...iconsProps}>
                {icons}
                {togglerElement}
            </div>
        );

        const headerProps = mergeProps(
            {
                className: cx('header')
            },
            ptm('header')
        );
        const content = (
            <div {...headerProps}>
                {titleElement}
                {iconsElement}
            </div>
        );

        if (props.headerTemplate) {
            const defaultContentOptions = {
                className: 'p-panel-header',
                titleClassName: 'p-panel-title',
                iconsClassName: 'p-panel-icons',
                togglerClassName: 'p-panel-header-icon p-panel-toggler p-link',
                onTogglerClick: toggle,
                titleElement,
                iconsElement,
                togglerElement,
                element: content,
                id: idState + '_header',
                props,
                collapsed
            };

            return resolve(props.headerTemplate, defaultContentOptions);
        } else if (props.header || props.toggleable) {
            return content;
        }

        return null;
    };

    const createFooter = () => {
        const footer = resolve(props.footer, props);

        const footerProps = mergeProps(
            {
                className: cx('footer')
            },
            ptm('footer')
        );

        const content = <div {...footerProps}>{footer}</div>;

        if (props.footerTemplate) {
            const defaultContentOptions = {
                className: cx('footer'),
                element: content,
                props
            };

            return resolve(props.footerTemplate, defaultContentOptions);
        } else if (props.footer) {
            return content;
        }

        return null;
    };

    const createContent = () => {
        const toggleableContentProps = mergeProps(
            {
                ref: contentRef,
                className: cx('toggleableContent'),
                'aria-hidden': collapsed,
                role: 'region',
                id: contentId,
                'aria-labelledby': headerId
            },
            ptm('toggleablecontent')
        );
        const contentProps = mergeProps(
            {
                className: cx('content')
            },
            ptm('content')
        );

        const transitionProps = mergeProps(
            {
                classNames: cx('transition'),
                timeout: { enter: 1000, exit: 450 },
                in: !collapsed,
                unmountOnExit: true,
                options: props.transitionOptions
            },
            ptm('transition')
        );

        return (
            <CSSTransition nodeRef={contentRef} {...transitionProps}>
                <div {...toggleableContentProps}>
                    <div {...contentProps}>{props.children}</div>
                </div>
            </CSSTransition>
        );
    };

    const rootProps = mergeProps(
        {
            id: idState,
            ref: elementRef,
            style: props.style,
            className: classNames(props.className, cx('root'))
        },
        attrs,
        ptm('root')
    );
    const header = createHeader();
    const content = createContent();
    const footer = createFooter();

    return (
        <ComponentProvider value={panel}>
            <div {...rootProps}>
                {header}
                {content}
                {footer}
            </div>
        </ComponentProvider>
    );
});

Panel.displayName = 'Panel';
