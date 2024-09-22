import { ComponentProvider } from '@primereact/core/component';
import { StarIcon } from '@primereact/icons/star';
import { StarFillIcon } from '@primereact/icons/starfill';
import { classNames, isNotEmpty, mergeProps, uuid } from '@primeuix/utils';
import { Tooltip } from 'primereact/tooltip';
import { IconUtils } from 'primereact/utils';
import * as React from 'react';
import { useRating } from './Rating.base';

export const Rating = React.memo(
    React.forwardRef((inProps, inRef) => {
        const [focusedOptionIndex, setFocusedOptionIndex] = React.useState(-1);
        const [isFocusVisibleItem, setFocusVisibleItem] = React.useState(true);
        const name = React.useRef(uuid());

        const elementRef = React.useRef(null);
        const state = {
            focusedOptionIndex,
            isFocusVisibleItem
        };

        const rating = useRating(inProps, inRef, state);
        const { props, ptm, ptmi, cx, ref } = rating;

        const getPTOptions = (key, value) => {
            return ptm(key, {
                context: {
                    active: value <= props.value,
                    focused: value === focusedOptionIndex
                }
            });
        };

        const onFocus = (event, value) => {
            setFocusedOptionIndex(value);
            props.onFocus?.(event);
        };

        const onBlur = (event) => {
            setFocusedOptionIndex(-1);
            props.onBlur?.(event);
        };

        const onChange = (event, value) => {
            onOptionSelect(event, value);
            setFocusVisibleItem(true);
        };

        const onOptionSelect = (event, value) => {
            if (focusedOptionIndex === value || props.value === value) {
                setFocusedOptionIndex(-1);
                updateModel(event, null);
            } else {
                setFocusedOptionIndex(value);
                updateModel(event, value || null);
            }
        };

        const updateModel = (event, value) => {
            props.onChange?.({
                originalEvent: event,
                value,
                stopPropagation: () => {
                    event?.stopPropagation();
                },
                preventDefault: () => {
                    event?.preventDefault();
                },
                target: {
                    name,
                    id: props.id,
                    value
                }
            });
        };

        const starAriaLabel = (value) => {
            return value; // @todo- Update with locale //value === 1 ? this.$primevue.config.locale.aria.star : this.$primevue.config.locale.aria.stars.replace(/{star}/g, value);
        };

        const createOptions = () => {
            return Array.from({ length: props.stars }, (_, i) => i + 1).map((value) => {
                const active = value <= props.value;

                const onIconProps = mergeProps(
                    {
                        className: cx('onIcon')
                    },
                    ptm('onIcon')
                );
                const offIconProps = mergeProps(
                    {
                        className: cx('onIcon')
                    },
                    ptm('offIcon')
                );

                const icon = active ? { type: props.onIcon || <StarFillIcon {...onIconProps} /> } : { type: props.offIcon || <StarIcon {...offIconProps} /> };
                const content = IconUtils.getJSXIcon(icon.type, active ? { ...onIconProps } : { ...offIconProps }, { props });

                const hiddenOptionInputProps = mergeProps(
                    {
                        type: 'radio',
                        defaultValue: value,
                        name: name.current,
                        checked: props.value === value,
                        disabled: props.disabled,
                        readOnly: props.readOnly,
                        'aria-label': starAriaLabel(value),
                        onFocus: (e) => onFocus(e, value),
                        onBlur,
                        onChange: (e) => onChange(e, value)
                    },
                    ptm('hiddenOptionInput')
                );

                const hiddenOptionInputContainerProps = mergeProps(
                    {
                        className: 'p-hidden-accessible',
                        'data-p-hidden-accessible': true
                    },
                    ptm('hiddenOptionInputContainer')
                );

                const optionProps = mergeProps(
                    {
                        className: cx('option', { value }),
                        onClick: (e) => onOptionClick(e, value),
                        'data-p-active': active,
                        'data-p-focused': value === focusedOptionIndex
                    },
                    getPTOptions('option', value)
                );

                return (
                    <div {...optionProps} key={value}>
                        <span {...hiddenOptionInputContainerProps}>
                            <input {...hiddenOptionInputProps} />
                        </span>
                        {content}
                    </div>
                );
            });
        };

        const hasTooltip = isNotEmpty(props.tooltip);

        const options = createOptions();

        const rootProps = mergeProps(
            {
                ref: elementRef,
                id: props.id,
                style: props.style,
                className: classNames(cx('root'), props.className)
            },
            ptmi('root')
        );

        return (
            <ComponentProvider value={rating}>
                <div {...rootProps}>{options}</div>
                {hasTooltip && <Tooltip target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />}
            </ComponentProvider>
        );
    })
);

Rating.displayName = 'Rating';
