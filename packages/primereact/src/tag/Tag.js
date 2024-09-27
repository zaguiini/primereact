import { Component, ComponentProvider } from '@primereact/core/component';
import { classNames, mergeProps } from '@primeuix/utils';
import { IconUtils } from 'primereact/utils';
import * as React from 'react';
import { useTag } from './Tag.base';

export const Tag = React.forwardRef((inProps, inRef) => {
    const tag = useTag(inProps, inRef);
    const { props, ptm, ptmi, cx, ref } = tag;

    const iconProps = mergeProps(
        {
            className: cx('icon')
        },
        ptm('icon')
    );

    const labelProps = mergeProps(
        {
            className: cx('label')
        },
        ptm('label')
    );

    const rootProps = mergeProps(
        {
            ref,
            style: props.style,
            className: classNames(cx('root'), props.className)
        },
        ptmi('root')
    );

    const icon = IconUtils.getJSXIcon(props.icon, { ...iconProps }, { props });
    const label = props.children || (props.value && <span {...labelProps}>{props.value}</span>);

    return (
        <ComponentProvider pIf={props.pIf} value={tag}>
            <Component as={props.as || 'span'} {...rootProps} ref={elementRef}>
                {icon}
                {label}
            </Component>
        </ComponentProvider>
    );
});

Tag.displayName = 'Tag';
