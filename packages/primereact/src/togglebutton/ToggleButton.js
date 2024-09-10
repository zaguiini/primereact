import { ComponentProvider } from '@primereact/core/component';
import { classNames, isNotEmpty, mergeProps } from '@primeuix/utils';
import { Ripple } from 'primereact/ripple';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useToggleButton } from './ToggleButton.base';

export const ToggleButton = React.memo(
    React.forwardRef((inProps, inRef) => {
        const togglebutton = useToggleButton(inProps, inRef);
        const { props, attrs, ptm, ptmi, cx, ref } = togglebutton;

        const hasLabel = isNotEmpty(props.onLabel) && isNotEmpty(props.offLabel);
        const label = hasLabel ? (props.checked ? props.onLabel : props.offLabel) : '&nbsp;';
        const hasTooltip = isNotEmpty(props.tooltip);

        const onChange = (e) => {
            if (!props.disabled && !props.readonly) {
                props.onChange?.({
                    originalEvent: e,
                    value: !props.checked,
                    stopPropagation: () => {
                        e.stopPropagation();
                    },
                    preventDefault: () => {
                        e.preventDefault();
                    },
                    target: {
                        name: attrs.name,
                        id: props.id,
                        value: !props.checked
                    }
                });
            }
        };

        const getPTOptions = (key) => {
            const _ptm = key === 'root' ? ptmi : ptm;

            return _ptm(key, {
                context: {
                    active: props.checked,
                    disabled: props.disabled
                }
            });
        };

        const createLabel = () => {
            const labelProps = mergeProps(
                {
                    className: cx('label')
                },
                getPTOptions('label')
            );

            return <span {...labelProps}>{label}</span>;
        };

        const createIcon = () => {
            if (props.onIcon || props.offIcon) {
                const iconProps = mergeProps(
                    {
                        className: classNames(props.checked ? props.onIcon : props.offIcon, cx('icon'))
                    },
                    getPTOptions('icon')
                );

                return <span {...iconProps} />;
            }

            return null;
        };

        const createContent = () => {
            const contentProps = mergeProps(
                {
                    className: cx('content')
                },
                getPTOptions('content')
            );

            const icon = createIcon();
            const label = createLabel();

            return (
                <span {...contentProps}>
                    {icon}
                    {label}
                </span>
            );
        };

        const content = props.children || createContent();

        const rootProps = mergeProps(
            {
                ref,
                type: 'button',
                style: props.style,
                className: classNames(cx('root'), props.className),
                disabled: props.disabled,
                'aria-pressed': props.checked,
                onClick: onChange
            },
            getPTOptions('root'),
            {
                'data-p-checked': props.checked,
                'data-p-disabled': props.disabled
            }
        );

        return (
            <ComponentProvider value={togglebutton}>
                <button {...rootProps}>
                    {content}
                    <Ripple />
                </button>
                {hasTooltip && <Tooltip target={ref} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />}
            </ComponentProvider>
        );
    })
);

ToggleButton.displayName = 'ToggleButton';
