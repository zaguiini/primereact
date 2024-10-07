import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/metergroup';
import { defaultProps } from './MeterGroup.props';

export const useMeterGroup = withComponent(
    ({ props }) => {
        // methods
        const percent = (meter = 0) => {
            const percentOfItem = ((meter - props.min) / (props.max - props.min)) * 100;

            return Math.round(Math.max(0, Math.min(100, percentOfItem)));
        };
        const percentValue = (meter) => {
            return percent(meter) + '%';
        };
        const meterCalculatedStyles = (val) => {
            return {
                backgroundColor: val.color,
                width: props.orientation === 'horizontal' && percentValue(val.value),
                height: props.orientation === 'vertical' && percentValue(val.value)
            };
        };

        // computed
        const totalPercent = percent(props.value.reduce((total, val) => total + val.value, 0));
        const percentages = React.useMemo(() => {
            let sum = 0;
            const sumsArray = [];

            props.value.forEach((item) => {
                sum += item.value;
                sumsArray.push(sum);
            });

            return sumsArray;
        }, [props.value]);

        return {
            // methods
            percent,
            percentValue,
            meterCalculatedStyles,
            // computed
            totalPercent,
            percentages
        };
    },
    defaultProps,
    style
);
