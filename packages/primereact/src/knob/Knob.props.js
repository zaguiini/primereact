import { $dt } from '@primeuix/styled';

export const defaultProps = {
    __TYPE: 'Knob',
    value: null,
    size: 100,
    disabled: false,
    readOnly: false,
    step: 1,
    min: 0,
    max: 100,
    valueColor: $dt('knob.value.background').variable,
    rangeColor: $dt('knob.range.background').variable,
    textColor: $dt('knob.text.color').variable,
    strokeWidth: 14,
    showValue: true,
    valueTemplate: '{value}',
    tabIndex: 0,
    ariaLabelledby: null,
    ariaLabel: null,
    onChange: null
};
