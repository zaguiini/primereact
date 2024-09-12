import { $dt } from '@primeuix/styled';

export const defaultProps = {
    __TYPE: 'Knob',
    id: null,
    style: null,
    className: null,
    value: null,
    size: 100,
    disabled: false,
    readOnly: false,
    showValue: true,
    tabIndex: 0,
    step: 1,
    min: 0,
    max: 100,
    strokeWidth: 14,
    name: null,
    valueColor: $dt('knob.value.background').variable,
    rangeColor: $dt('knob.range.background').variable,
    textColor: $dt('knob.text.color').variable,
    valueTemplate: '{value}',
    onChange: null,
    children: undefined
};
