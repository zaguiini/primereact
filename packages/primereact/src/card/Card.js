import { ComponentProvider } from '@primereact/core/component';
import * as React from 'react';
import { ObjectUtils, classNames } from '../utils/Utils';
import { useCard } from './Card.base';
import { CardBase } from './CardBase';

export const Card = React.forwardRef((inProps, inRef) => {
    const card = useCard(inProps, inRef);
    const { props, ptm, ptmi, cx, ref } = card;

    const createHeader = () => {
        const headerProps = mergeProps(
            {
                className: cx('header')
            },
            ptm('header')
        );

        if (props.header) {
            return <div {...headerProps}>{ObjectUtils.getJSXElement(props.header, props)}</div>;
        }

        return null;
    };

    const createBody = () => {
        const titleProps = mergeProps(
            {
                className: cx('title')
            },
            ptm('title')
        );

        const title = props.title && <div {...titleProps}>{ObjectUtils.getJSXElement(props.title, props)}</div>;

        const subTitleProps = mergeProps(
            {
                className: cx('subTitle')
            },
            ptm('subTitle')
        );

        const subTitle = props.subTitle && <div {...subTitleProps}>{ObjectUtils.getJSXElement(props.subTitle, props)}</div>;

        const contentProps = mergeProps(
            {
                className: cx('content')
            },
            ptm('content')
        );

        const children = props.children && <div {...contentProps}>{props.children}</div>;

        const footerProps = mergeProps(
            {
                className: cx('footer')
            },
            ptm('footer')
        );

        const footer = props.footer && <div {...footerProps}>{ObjectUtils.getJSXElement(props.footer, props)}</div>;

        const bodyProps = mergeProps(
            {
                className: cx('body')
            },
            ptm('body')
        );

        return (
            <div {...bodyProps}>
                {title}
                {subTitle}
                {children}
                {footer}
            </div>
        );
    };

    React.useEffect(() => {
        ObjectUtils.combinedRefs(elementRef, ref);
    }, [elementRef, ref]);

    const rootProps = mergeProps(
        {
            id: props.id,
            ref: elementRef,
            style: props.style,
            className: classNames(props.className, cx('root'))
        },
        CardBase.getOtherProps(props),
        ptm('root')
    );

    const header = createHeader();
    const body = createBody();

    return (
        <ComponentProvider value={card}>
            <div {...rootProps}>
                {header}
                {body}
            </div>
        </ComponentProvider>
    );
});

Card.displayName = 'Card';
