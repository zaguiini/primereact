import { ComponentProvider } from '@primereact/core/component';
import { isNotEmpty, mergeProps, resolve } from '@primeuix/utils';
import { ToggleButton } from 'primereact/togglebutton';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useSelectButton } from './SelectButton.base';

export const SelectButton = React.memo(
    React.forwardRef((inProps, inRef) => {
        const selectbutton = useSelectButton(inProps, inRef);
        const {
            props,
            ptm,
            ptmi,
            cx,
            id,
            // element refs
            elementRef,
            // methods
            getOptionLabel,
            getOptionValue,
            getOptionRenderKey,
            isOptionDisabled,
            onOptionSelect,
            isSelected
        } = selectbutton;

        const createOptions = () => {
            return props.options?.map((option, index) => {
                const checked = isSelected(option);
                const label = getOptionLabel(option);
                const disabled = props.disabled || isOptionDisabled(option);
                const unstyled = props.unstyled;
                const key = getOptionRenderKey(option);
                const pt = ptm('pcToggleButton');

                const content = resolve(props.optionTemplate, option, index, selectbutton);

                return (
                    <ToggleButton key={key} checked={checked} onChange={(e) => onOptionSelect(e, option, index)} onLabel={label} offLabel={label} disabled={disabled} unstyled={unstyled} pt={pt}>
                        {content}
                    </ToggleButton>
                );
            });
        };

        const options = createOptions();

        const rootProps = mergeProps(
            {
                id,
                className: cx('root'),
                role: 'group'
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={selectbutton}>
                <div {...rootProps} ref={elementRef}>
                    {options}
                </div>
                <Tooltip pIf={isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />
            </ComponentProvider>
        );
    })
);

SelectButton.displayName = 'SelectButton';
