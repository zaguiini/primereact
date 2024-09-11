import { ComponentProvider } from '@primereact/core/component';
import { classNames, isNotEmpty, mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useProgressBar } from './ProgressBar.base';

export const ProgressBar = React.memo(
    React.forwardRef((inProps, inRef) => {
        const progressbar = useProgressBar(inProps, inRef);
        const { props, ptm, ptmi, cx, ref } = progressbar;

        const createLabel = () => {
            if (props.showValue && isNotEmpty(props.value)) {
                const labelProps = mergeProps(
                    {
                        className: cx('label')
                    },
                    ptm('label')
                );

                const label = props.children || props.value + props.unit;

                return <div {...labelProps}>{label}</div>;
            }

            return null;
        };

        const createIndeterminate = () => {
            const valueProps = mergeProps(
                {
                    className: cx('value')
                },
                ptm('value')
            );

            return <div {...valueProps} />;
        };

        const createDeterminate = () => {
            const label = createLabel();
            const valueProps = mergeProps(
                {
                    className: cx('value'),
                    style: { width: props.value + '%', display: 'flex', backgroundColor: props.color }
                },
                ptm('value')
            );

            return <div {...valueProps}>{label}</div>;
        };

        const content = props.mode === 'determinate' ? createDeterminate() : props.mode === 'indeterminate' ? createIndeterminate() : null;

        const rootProps = mergeProps(
            {
                ref,
                style: props.style,
                className: classNames(cx('root'), props.className),
                role: 'progressbar',
                'aria-valuemin': '0',
                'aria-valuenow': props.value,
                'aria-valuemax': '100'
            },
            ptmi('root')
        );

        return (
            <ComponentProvider value={progressbar}>
                <div {...rootProps}>{content}</div>
            </ComponentProvider>
        );
    })
);

ProgressBar.displayName = 'ProgressBar';
