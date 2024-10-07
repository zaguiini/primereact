import { Component, ComponentProvider } from '@primereact/core/component';
import { Icon } from '@primereact/icons/base';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useTag } from './Tag.base';

export const Tag = React.forwardRef((inProps, inRef) => {
    const tag = useTag(inProps, inRef);
    const {
        id,
        props,
        ptm,
        ptmi,
        cx,
        // element refs
        elementRef
    } = tag;

    const labelProps = mergeProps(
        {
            className: cx('label')
        },
        ptm('label')
    );

    const iconProps = mergeProps(
        {
            className: cx('icon')
        },
        ptm('icon')
    );

    const icon = resolve(props.iconTemplate, tag) || <Icon as={props.icon} {...iconProps} />;
    const label = resolve(props.template || props.children, tag) || (props.value && <span {...labelProps}>{props.value}</span>);

    const rootProps = mergeProps(
        {
            id,
            className: cx('root')
        },
        ptmi('root')
    );

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
