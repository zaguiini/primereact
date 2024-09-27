import { Component, ComponentProvider } from '@primereact/core/component';
import { classNames, mergeProps, resolve } from '@primeuix/utils';
import * as React from 'react';
import { useCard } from './Card.base';

export const Card = React.forwardRef((inProps, inRef) => {
    const card = useCard(inProps, inRef);
    const { props, ptm, ptmi, cx, ref } = card;

    const createCaption = () => {
        if (props.title || props.subtitle) {
            const subtitleProps = mergeProps(
                {
                    className: cx('subtitle')
                },
                ptm('subtitle')
            );

            const subtitle = props.subtitle && <div {...subtitleProps}>{resolve(props.subtitle, props)}</div>;

            const titleProps = mergeProps(
                {
                    className: cx('title')
                },
                ptm('title')
            );

            const title = props.title && <div {...titleProps}>{resolve(props.title, props)}</div>;

            const captionProps = mergeProps(
                {
                    className: cx('caption')
                },
                ptm('caption')
            );

            return (
                <div {...captionProps}>
                    {title}
                    {subtitle}
                </div>
            );
        }

        return null;
    };

    const createBody = () => {
        const footerProps = mergeProps(
            {
                className: cx('footer')
            },
            ptm('footer')
        );

        const footer = props.footer && <div {...footerProps}>{resolve(props.footer, props)}</div>;

        const contentProps = mergeProps(
            {
                className: cx('content')
            },
            ptm('content')
        );

        const children = props.children && <div {...contentProps}>{props.children}</div>;

        const caption = createCaption();

        const bodyProps = mergeProps(
            {
                className: cx('body')
            },
            ptm('body')
        );

        return (
            <div {...bodyProps}>
                {caption}
                {children}
                {footer}
            </div>
        );
    };

    const createHeader = () => {
        if (props.header) {
            const headerProps = mergeProps(
                {
                    className: cx('header')
                },
                ptm('header')
            );

            return <div {...headerProps}>{resolve(props.header, props)}</div>;
        }

        return null;
    };

    const header = createHeader();
    const body = createBody();

    const rootProps = mergeProps(
        {
            id: props.id,
            ref,
            style: props.style,
            className: classNames(cx('root'), props.className)
        },
        ptmi('root')
    );

    return (
        <ComponentProvider pIf={props.pIf} value={card}>
            <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                {header}
                {body}
            </Component>
        </ComponentProvider>
    );
});

Card.displayName = 'Card';
