import { Component, ComponentProvider } from '@primereact/core/component';
import { Icon } from '@primereact/icons/base';
import { classNames, mergeProps, resolve } from '@primeuix/utils';
import * as React from 'react';
import { useMeterGroup } from './MeterGroup.base';

export const MeterGroup = React.forwardRef((inProps, inRef) => {
    const metergroup = useMeterGroup(inProps, inRef);
    const {
        id,
        props,
        ptm,
        ptmi,
        cx,
        // element refs
        elementRef,
        // methods
        percent,
        percentValue,
        meterCalculatedStyles,
        // computed
        totalPercent,
        percentages
    } = metergroup;

    const getPTOptions = (key, value, index) => {
        return ptm(key, {
            context: {
                value,
                index
            }
        });
    };

    const createMeter = (val, index) => {
        const { value } = val;

        const meterProps = mergeProps(
            {
                className: cx('meter'),
                style: meterCalculatedStyles(val)
            },
            getPTOptions('meter', val, index)
        );

        return resolve(props.meterTemplate, { value: val, index, size: percentValue(value), totalPercent }, metergroup) || percent(value) ? <span {...meterProps} /> : null;
    };

    const createMeters = () => {
        const items = props.value.map(createMeter);

        const metersProps = mergeProps(
            {
                className: cx('meters')
            },
            ptm('meters')
        );

        return <div {...metersProps}>{items}</div>;
    };

    const createLabelItem = (val, index) => {
        const { label, value, icon, color } = val;

        const labelTextProps = mergeProps(
            {
                className: cx('labelText')
            },
            ptm('labelText')
        );

        const labelIconProps = mergeProps(
            {
                className: classNames(icon, cx('labelIcon')),
                style: { color }
            },
            ptm('labelIcon')
        );

        const labelMakerProps = mergeProps(
            {
                className: cx('labelMarker'),
                style: { backgroundColor: color }
            },
            ptm('labelMarker')
        );

        const labelIcon = resolve(props.labelIconTemplate, value, metergroup) || icon ? <Icon as={icon} {...labelIconProps} /> : <span {...labelMakerProps} />;

        const labelProps = mergeProps(
            {
                className: cx('label')
            },
            ptm('label')
        );

        return (
            <li {...labelProps} key={`${index}_label`}>
                {labelIcon}
                <span {...labelTextProps}>
                    {label} {calculatePercentage(value)}
                </span>
            </li>
        );
    };

    const createLabel = () => {
        const items = props.value.map(createLabelItem);

        const labelListProps = mergeProps(
            {
                className: cx('labelList')
            },
            ptm('labelList')
        );

        return <ol {...labelListProps}>{items}</ol>;
    };

    const label = resolve(props.labelTemplate, metergroup) || createLabel();
    const startLabel = labelPosition === 'start' && label;
    const start = resolve(props.startTemplate, { percentages }, metergroup);
    const meters = createMeters();
    const end = resolve(props.endTemplate, { percentages }, metergroup);
    const endLabel = labelPosition === 'end' && label;

    const rootProps = mergeProps(
        {
            id,
            className: cx('root'),
            role: 'meter',
            'aria-valuemin': props.min,
            'aria-valuemax': props.max,
            'aria-valuenow': totalPercent
        },
        ptmi('root')
    );

    return (
        <ComponentProvider pIf={props.pIf} value={metergroup}>
            <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                {startLabel}
                {start}
                {meters}
                {end}
                {endLabel}
            </Component>
        </ComponentProvider>
    );
});

MeterGroup.displayName = 'MeterGroup';
