import { Component } from '@primereact/core/component';
import { Icon } from '@primereact/icons/base';
import { ChevronDownIcon } from '@primereact/icons/chevrondown';
import { ChevronUpIcon } from '@primereact/icons/chevronup';
import * as React from 'react';
import { useAccordionContent, useAccordionHeader, useAccordionPanel } from './Accordion.base';

export const Accordion = React.memo(
    React.forwardRef((inProps, inRef) => {
        return <div>TEST</div>;
    })
);

export const AccordionPanel = React.memo(
    React.forwardRef((inProps, inRef) => {
        const accordionpanel = useAccordionPanel(inProps, inRef);
        const {
            id,
            props,
            ptmi,
            cx,
            // element refs
            elementRef,
            // computed
            active,
            a11yAttrs
        } = accordionpanel;

        const rootProps = mergeProps(
            {
                id,
                className: cx('root')
            },
            a11yAttrs,
            ptmi('root', {
                context: {
                    active
                }
            })
        );

        const createAccordion = () => {
            return (
                <Component asChild={props.asChild} as={props.as || 'div'} options={{ active }} {...rootProps} ref={elementRef}>
                    {props.children}
                </Component>
            );
        };

        const component = props.asChild ? <Component asChild={props.asChild} children={props.children} options={{ ref: elementRef, className: cx('root'), a11yAttrs }} /> : createAccordion();

        return (
            <ComponentProvider pIf={props.pIf} value={accordionpanel}>
                <Component asChild={props.asChild} as={props.as || 'div'} options={{ active }} {...rootProps} ref={elementRef}>
                    {props.children}
                </Component>
            </ComponentProvider>
        );
    })
);

export const AccordionHeader = React.memo(
    React.forwardRef((inProps, inRef) => {
        const accordionheader = useAccordionHeader(inProps, inRef);
        const {
            id,
            props,
            ptmi,
            ptm,
            cx,
            parent,
            // element refs
            elementRef,
            // methods
            onClick,
            // computed
            active,
            a11yAttrs,
            inAttrs
        } = accordionheader;

        // parent components
        const $pcAccordion = parent.$pc?.Accordion || {};

        const getPTOptions = (key) => {
            const _ptm = key === 'root' ? ptmi : ptm;

            return _ptm(key, {
                context: {
                    active
                }
            });
        };

        const createAccordionHeader = () => {
            const toggleIconProps = mergeProps(
                {
                    className: cx('toggleIcon'),
                    'aria-hidden': true
                },
                getPTOptions('toggleicon')
            );

            const rootProps = mergeProps(
                {
                    id,
                    className: cx('root'),
                    onClick
                },
                inAttrs,
                getPTOptions('root')
            );

            const content = resolve(props.template || props.children, accordionheader);
            const toggleIcon = active ? $pcAccordion.props.collapseIcon || <ChevronDownIcon /> : $pcAccordion.props.expandIcon || <ChevronUpIcon />;
            const icon = <Icon as={props.toggleIcon || toggleIcon} options={{ active }} {...toggleIconProps} />;

            return (
                <Component as={props.as || 'button'} {...rootProps} ref={elementRef}>
                    {content}
                    {icon}
                    <Ripple />
                </Component>
            );
        };

        const component = props.asChild ? <Component asChild={props.asChild} children={props.children} options={{ ref: elementRef, className: cx('root'), active, a11yAttrs, onClick }} /> : createAccordionHeader();

        return (
            <ComponentProvider pIf={props.pIf} value={accordionheader}>
                {component}
            </ComponentProvider>
        );
    })
);

export const AccordionContent = React.memo(
    React.forwardRef((inProps, inRef) => {
        const accordioncontent = useAccordionContent(inProps, inRef);
        const {
            id,
            props,
            ptmi,
            ptm,
            cx,
            // element refs
            elementRef,
            // computed
            active,
            a11yAttrs
        } = accordioncontent;

        const getPTOptions = (key) => {
            const _ptm = key === 'root' ? ptmi : ptm;

            return _ptm(key, {
                context: {
                    active
                }
            });
        };

        const createContent = () => {
            const contentProps = mergeProps(
                {
                    className: cx('content')
                },
                getPTOptions('content')
            );

            return <div {...contentProps}>{resolve(props.template || props.children, accordioncontent)}</div>;
        };

        const creteAccordionContent = () => {
            const content = createContent();

            const rootProps = mergeProps(
                {
                    id,
                    className: cx('root')
                },
                a11yAttrs,
                getPTOptions('root')
            );

            const transitionProps = mergeProps(
                {
                    classNames: 'p-toggleable-content',
                    timeout: { enter: 1000, exit: 450 },
                    in: active,
                    unmountOnExit: true,
                    options: props.transitionOptions
                },
                getPTOptions('transition')
            );

            return (
                <CSSTransition nodeRef={elementRef} {...transitionProps}>
                    <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                        {content}
                    </Component>
                </CSSTransition>
            );
        };

        const component = props.asChild ? <Component asChild={props.asChild} children={props.children} options={{ ref: elementRef, className: cx('root'), a11yAttrs, active }} /> : creteAccordionContent();

        return (
            <ComponentProvider pIf={props.pIf} value={accordioncontent}>
                {component}
            </ComponentProvider>
        );
    })
);

// @deprecated
export const AccordionTab = () => {};

AccordionTab.displayName = 'AccordionTab';

Accordion.displayName = 'Accordion';
