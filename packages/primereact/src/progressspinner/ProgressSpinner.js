import { Component, ComponentProvider } from '@primereact/core/component';
import { classNames, mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useProgressSpinner } from './ProgressSpinner.base';

export const ProgressSpinner = React.memo(
    React.forwardRef((inProps, inRef) => {
        const progressspinner = useProgressSpinner(inProps, inRef);
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
            sx,
            ref
        } = progressspinner;

        const circleProps = mergeProps(
            {
                className: cx('circle'),
                cx: '50',
                cy: '50',
                r: '20',
                fill: props.fill,
                strokeWidth: props.strokeWidth,
                strokeMiterlimit: '10'
            },
            ptm('circle')
        );

        const spinProps = mergeProps(
            {
                className: cx('spin'),
                viewBox: '25 25 50 50',
                style: sx('spin')
            },
            ptm('spin')
        );

        const rootProps = mergeProps(
            {
                ref,
                id: props.id,
                style: props.style,
                className: classNames(cx('root'), props.className),
                role: 'progressbar',
                'aria-busy': true
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={progressspinner}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    <svg {...spinProps}>
                        <circle {...circleProps} />
                    </svg>
                </Component>
            </ComponentProvider>
        );
    })
);

ProgressSpinner.displayName = 'ProgressSpinner';
