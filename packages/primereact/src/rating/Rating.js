import { Component, ComponentProvider } from '@primereact/core/component';
import { Icon } from '@primereact/icons/base';
import { StarIcon } from '@primereact/icons/star';
import { StarFillIcon } from '@primereact/icons/starfill';
import { isNotEmpty, mergeProps } from '@primeuix/utils';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useRating } from './Rating.base';

export const Rating = React.memo(
    React.forwardRef((inProps, inRef) => {
        const rating = useRating(inProps, inRef);
        const {
            props,
            state,
            ptm,
            ptmi,
            cx,
            id,
            // values
            starName,
            // element refs
            elementRef,
            // methods
            onOptionClick,
            onChange,
            onFocus,
            onBlur
        } = rating;

        const getPTOptions = (key, value) => {
            return ptm(key, {
                context: {
                    active: value <= props.value,
                    focused: value === state.focusedOptionIndex
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
                        className: cx('offIcon')
                    },
                    ptm('offIcon')
                );

                const hiddenOptionInputProps = mergeProps(
                    {
                        type: 'radio',
                        defaultValue: value,
                        name: starName,
                        checked: props.value === value,
                        disabled: props.disabled,
                        readOnly: props.readOnly,
                        'aria-label': starAriaLabel(value),
                        onFocus: (event) => onFocus(event, value),
                        onBlur,
                        onChange: (event) => onChange(event, value)
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
                        onClick: (event) => onOptionClick(event, value),
                        'data-p-active': active,
                        'data-p-focused': value === state.focusedOptionIndex
                    },
                    getPTOptions('option', value)
                );

                return (
                    <div key={value} {...optionProps}>
                        <span {...hiddenOptionInputContainerProps}>
                            <input {...hiddenOptionInputProps} />
                        </span>
                        <Icon pIf={active} as={props.onIcon || <StarFillIcon />} {...onIconProps} />
                        <Icon pIf={!active} as={props.offIcon || <StarIcon />} {...offIconProps} />
                    </div>
                );
            });
        };

        const options = createOptions();

        const rootProps = mergeProps(
            {
                id,
                className: cx('root')
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={rating}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {options}
                </Component>
                <Tooltip pIf={isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />
            </ComponentProvider>
        );
    })
);

Rating.displayName = 'Rating';
