import { ComponentProvider } from '@primereact/core/component';
import { classNames, mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { ObjectUtils } from '../utils/Utils';
import { useMeterGroup } from './MeterGroup.base';

export const MeterGroup = React.forwardRef((inProps, inRef) => {
    const metergroup = useMeterGroup(inProps, inRef);
    const { props, ptm, ptmi, cx, ref } = metergroup;

    const { values, min, max, orientation, labelPosition, start, end, meter, labelList } = props;

    let totalPercent = 0;
    let percentages = [];

    values?.map((item) => {
        totalPercent = totalPercent + item.value;
        percentages.push(Math.round((item.value / totalPercent) * 100));
    });

    const calculatePercentage = (meterValue = 0) => {
        const percentageOfItem = ((meterValue - min) / (max - min)) * 100;

        return Math.round(Math.max(0, Math.min(100, percentageOfItem)));
    };

    const getPTOptions = (key, value, index) => {
        return ptm(key, {
            context: {
                value,
                index
            }
        });
    };

    const createMeters = () => {
        const meters = values?.map((item, index) => {
            const calculatedPercantage = calculatePercentage(item.value);
            const meterInlineStyles = {
                backgroundColor: item.color,
                width: orientation === 'horizontal' ? calculatedPercantage + '%' : 'auto',
                height: orientation === 'vertical' ? calculatedPercantage + '%' : 'auto'
            };

            const meterProps = mergeProps(
                {
                    className: cx('meter'),
                    style: meterInlineStyles
                },
                getPTOptions('meter', item, index)
            );

            if (meter || item.meterTemplate) {
                const meterTemplateProps = mergeProps(
                    {
                        className: cx('meter')
                    },
                    getPTOptions('meter', item, index)
                );

                return ObjectUtils.getJSXElement(item.meterTemplate || meter, { ...item, percentage: calculatedPercantage, index }, meterTemplateProps);
            }

            return <span key={index} {...meterProps} />;
        });

        const meterContainerProps = mergeProps(
            {
                className: cx('meters')
            },
            ptm('meters')
        );

        return <div {...meterContainerProps}>{meters}</div>;
    };

    const createLabelList = () => {
        const labelListProps = mergeProps(
            {
                className: cx('labellist')
            },
            ptm('labellist')
        );

        const labelItemProps = mergeProps(
            {
                className: cx('label')
            },
            ptm('label')
        );

        const labelProps = mergeProps(
            {
                className: cx('labelText')
            },
            ptm('labelText')
        );

        return (
            <ol {...labelListProps}>
                {values?.map((item, index) => {
                    const labelIconProps = mergeProps(
                        {
                            className: classNames(cx('labelIcon'), item.icon),
                            style: { color: item.color }
                        },
                        ptm('labelIcon')
                    );

                    const labelListIconProps = mergeProps(
                        {
                            className: cx('labelMarker'),
                            style: { backgroundColor: item.color }
                        },
                        ptm('labelMarker')
                    );

                    const labelIcon = item.icon ? <i {...labelIconProps} /> : <span {...labelListIconProps} />;
                    const itemPercentage = calculatePercentage(item.value);

                    return (
                        <li key={index} {...labelItemProps}>
                            {labelIcon}
                            <span {...labelProps}>
                                {item?.label} {`(${itemPercentage}%)`}
                            </span>
                        </li>
                    );
                })}
            </ol>
        );
    };

    const labelListContent = labelList || createLabelList();
    const labelElement = ObjectUtils.getJSXElement(labelListContent, { values, totalPercent });

    const rootProps = mergeProps(
        {
            ref,
            className: classNames(cx('root', { orientation }), props.className),
            role: 'meter',
            'aria-valuemin': min,
            'aria-valuemax': max,
            'aria-valuenow': totalPercent
        },
        ptmi('root')
    );

    const templateProps = {
        totalPercent,
        percentages,
        values
    };

    return (
        <ComponentProvider value={metergroup}>
            <div {...rootProps}>
                {labelPosition === 'start' && labelElement}
                {start && ObjectUtils.getJSXElement(start, templateProps)}
                {createMeters()}
                {end && ObjectUtils.getJSXElement(end, templateProps)}
                {labelPosition === 'end' && labelElement}
            </div>
        </ComponentProvider>
    );
});

MeterGroup.displayName = 'MeterGroup';
