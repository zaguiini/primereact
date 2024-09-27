import { Component, ComponentProvider } from '@primereact/core/component';
import { useMountEffect } from '@primereact/hooks';
import { MinusIcon } from '@primereact/icons/minus';
import { PlusIcon } from '@primereact/icons/plus';
import { classNames, mergeProps } from '@primeuix/utils';
import { IconUtils, UniqueComponentId } from 'primereact/utils';

import { CSSTransition } from 'primereact/csstransition';
import { Ripple } from 'primereact/ripple';
import * as React from 'react';
import { useFieldset } from './Fieldset.base';

export const Fieldset = React.forwardRef((inProps, inRef) => {
    const fieldset = useFieldset(inProps, inRef);
    const { props, ptm, ptmi, cx, ref } = fieldset;

    const [idState, setIdState] = React.useState(props.id);
    const [collapsedState, setCollapsedState] = React.useState(props.collapsed);
    const collapsed = props.toggleable ? (props.onToggle ? props.collapsed : collapsedState) : false;
    const elementRef = React.useRef(null);
    const contentRef = React.useRef(null);
    const headerId = idState + '_header';
    const contentId = idState + '_content';

    const toggle = (event) => {
        if (props.toggleable) {
            collapsed ? expand(event) : collapse(event);

            if (props.onToggle) {
                props.onToggle({
                    originalEvent: event,
                    value: !collapsed
                });
            }
        }

        event.preventDefault();
    };

    const expand = (event) => {
        if (!props.onToggle) {
            setCollapsedState(false);
        }

        props.onExpand && props.onExpand(event);
    };

    const collapse = (event) => {
        if (!props.onToggle) {
            setCollapsedState(true);
        }

        props.onCollapse && props.onCollapse(event);
    };

    useMountEffect(() => {
        if (!props.id) {
            setIdState(UniqueComponentId());
        }
    });

    const onKeyDown = (event) => {
        if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space') {
            toggle(event);
            event.preventDefault();
        }
    };

    const createContent = () => {
        const contentContainerProps = mergeProps(
            {
                className: cx('contentContainer'),
                role: 'region'
            },
            ptm('contentContainer')
        );

        const contentProps = mergeProps(
            {
                className: cx('content')
            },
            ptm('content')
        );

        const toggleableProps = mergeProps(
            {
                ref: contentRef,
                id: contentId,
                role: 'region',
                'aria-labelledby': headerId,
                className: cx('toggleableContent')
            },
            ptm('toggleableContent')
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
                <div {...toggleableProps}>
                    {!collapsed && (
                        <div {...contentContainerProps}>
                            <div {...contentProps}>{props.children}</div>
                        </div>
                    )}
                </div>
            </CSSTransition>
        );
    };

    const createToggleIcon = () => {
        if (props.toggleable) {
            const togglerIconProps = mergeProps(
                {
                    className: cx('toggleIcon')
                },
                ptm('toggleIcon')
            );

            const icon = collapsed ? props.expandIcon || <PlusIcon {...togglerIconProps} /> : props.collapseIcon || <MinusIcon {...togglerIconProps} />;
            const toggleIcon = IconUtils.getJSXIcon(icon, togglerIconProps, { props });

            return toggleIcon;
        }

        return null;
    };

    const createLegendContent = () => {
        const legendLabelProps = mergeProps(
            {
                className: cx('legendLabel')
            },
            ptm('legendLabel')
        );

        const togglerProps = mergeProps(
            {
                id: headerId,
                type: 'button',
                'aria-expanded': !collapsed,
                'aria-controls': contentId,
                'aria-label': props.legend,
                onKeyDown,
                onClick: toggle,
                tabIndex: 0,
                className: cx('toggleButton')
            },
            ptm('toggleButton')
        );

        if (props.toggleable) {
            const toggleIcon = createToggleIcon();

            return (
                <button {...togglerProps}>
                    {toggleIcon}
                    <span {...legendLabelProps}>{props.legend}</span>
                    <Ripple />
                </button>
            );
        }

        return (
            <span {...legendLabelProps} id={headerId}>
                {props.legend}
            </span>
        );
    };

    const createLegend = () => {
        const legendProps = mergeProps(
            {
                className: cx('legend')
            },
            ptm('legend')
        );

        if (props.legend != null || props.toggleable) {
            const legendContent = createLegendContent();

            return <legend {...legendProps}>{legendContent}</legend>;
        }
    };

    React.useImperativeHandle(ref, () => ({
        props,
        getElement: () => elementRef.current,
        getContent: () => contentRef.current
    }));

    const rootProps = mergeProps(
        {
            id: idState,
            ref: elementRef,
            style: props.style,
            className: classNames(cx('root'), props.className),
            onClick: props.onClick
        },
        ptmi('root')
    );

    const legend = createLegend();
    const content = createContent();

    return (
        <ComponentProvider pIf={props.pIf} value={fieldset}>
            <Component as={props.as || 'fieldset'} {...rootProps} ref={elementRef}>
                {legend}
                {content}
            </Component>
        </ComponentProvider>
    );
});

Fieldset.displayName = 'Fieldset';
