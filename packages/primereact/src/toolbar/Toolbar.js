import { Component, ComponentProvider } from '@primereact/core/component';
import * as React from 'react';
import { ObjectUtils, classNames } from '../utils/Utils';
import { useToolbar } from './Toolbar.base';
import { ToolbarBase } from './ToolbarBase';

export const Toolbar = React.memo(
    React.forwardRef((inProps, inRef) => {
        const toolbar = useToolbar(inProps, inRef);
        const {
            props,
            state,
            ptm,
            ptmi,
            cx,
            id,
            // element refs
            elementRef,
            focusInputRef,
            clearIconRef,
            // methods
            onFocus,
            onBlur,
            onKeyDown,
            onEditableInput,
            onContainerClick,
            onClearClick,
            // computed
            selectedOption,
            label: labelText,
            editableInputValue,
            focusedOptionId,
            isClearIconVisible,
            ptm,
            ptmi,
            cx,
            ref
        } = toolbar;

        const elementRef = React.useRef(null);
        const start = ObjectUtils.getJSXElement(props.left || props.start, props);
        const center = ObjectUtils.getJSXElement(props.center, props);
        const end = ObjectUtils.getJSXElement(props.right || props.end, props);

        React.useImperativeHandle(ref, () => ({
            props,
            getElement: () => elementRef.current
        }));

        const startProps = mergeProps(
            {
                className: cx('start')
            },
            ptm('start')
        );

        const centerProps = mergeProps(
            {
                className: cx('center')
            },
            ptm('center')
        );

        const endProps = mergeProps(
            {
                className: cx('end')
            },
            ptm('end')
        );

        const rootProps = mergeProps(
            {
                id: props.id,
                ref: elementRef,
                style: props.style,
                className: classNames(props.className, cx('root')),
                role: 'toolbar'
            },
            ToolbarBase.getOtherProps(props),
            ptm('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={toolbar}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    <div {...startProps}>{start}</div>
                    <div {...centerProps}>{center}</div>
                    <div {...endProps}>{end}</div>
                </Component>
            </ComponentProvider>
        );
    })
);

Toolbar.displayName = 'Toolbar';
