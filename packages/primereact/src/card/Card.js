import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps, resolve } from '@primeuix/utils';
import * as React from 'react';
import { useCard } from './Card.base';

export const Card = React.forwardRef((inProps, inRef) => {
    const card = useCard(inProps, inRef);
    const {
        id,
        props,
        ptm,
        ptmi,
        cx,
        // element refs
        elementRef
    } = card;

    const createCaption = () => {
        const subTitleProps = mergeProps(
            {
                className: cx('subTitle')
            },
            ptm('subTitle')
        );

        const subTitle = resolve(props.subTitleTemplate || props.subTitle, subTitleProps, card);

        const titleProps = mergeProps(
            {
                className: cx('title')
            },
            ptm('title')
        );

        const title = resolve(props.titleTemplate || props.title, card);

        const captionProps = mergeProps(
            {
                className: cx('caption')
            },
            ptm('caption')
        );

        return props.title || props.subTitle ? (
            <div {...captionProps}>
                {title && <div {...titleProps}>{title}</div>}
                {subTitle && <div {...subTitleProps}>{subTitle}</div>}
            </div>
        ) : null;
    };

    const createBody = () => {
        const footerProps = mergeProps(
            {
                className: cx('footer')
            },
            ptm('footer')
        );

        const footer = resolve(props.footerTemplate || props.footer, footerProps, card);

        const contentProps = mergeProps(
            {
                className: cx('content')
            },
            ptm('content')
        );

        const content = <div {...contentProps}>{resolve(props.template || props.children, card)}</div>;

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
                {content}
                {footer && <div {...footerProps}>{footer}</div>}
            </div>
        );
    };

    const createHeader = () => {
        const headerProps = mergeProps(
            {
                className: cx('header')
            },
            ptm('header')
        );

        const header = resolve(props.headerTemplate || props.header, card);

        return header ? <div {...headerProps}>{header}</div> : null;
    };

    const header = createHeader();
    const body = createBody();

    const rootProps = mergeProps(
        {
            id,
            className: cx('root')
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
