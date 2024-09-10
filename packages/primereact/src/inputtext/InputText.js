import { ComponentProvider } from '@primereact/core/component';
import { addClass, classNames, isNotEmpty, mergeProps, removeClass } from '@primeuix/utils';
import { KeyFilter } from 'primereact/keyfilter';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { useInputText } from './InputText.base';

export const InputText = React.memo(
    React.forwardRef((inProps, inRef) => {
        const inputtext = useInputText(inProps, inRef);
        const { props, ptm, ptmi, cx, ref } = inputtext;

        const onKeyDown = (event) => {
            props.onKeyDown && props.onKeyDown(event);

            if (props.keyfilter) {
                KeyFilter.onKeyPress(event, props.keyfilter, props.validateOnly);
            }
        };

        const onBeforeInput = (event) => {
            props.onBeforeInput && props.onBeforeInput(event);

            if (props.keyfilter) {
                KeyFilter.onBeforeInput(event, props.keyfilter, props.validateOnly);
            }
        };

        const onInput = (event) => {
            const target = event.target;
            let validatePattern = true;

            if (props.keyfilter && props.validateOnly) {
                validatePattern = KeyFilter.validate(event, props.keyfilter);
            }

            props.onInput && props.onInput(event, validatePattern);

            // for uncontrolled changes
            isNotEmpty(target.value) ? addClass(target, 'p-filled') : removeClass(target, 'p-filled');
        };

        const onPaste = (event) => {
            props.onPaste && props.onPaste(event);

            if (props.keyfilter) {
                KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
            }
        };

        const isFilled = React.useMemo(() => isNotEmpty(props.value) || isNotEmpty(props.defaultValue), [props.value, props.defaultValue]);
        const hasTooltip = isNotEmpty(props.tooltip);

        const rootProps = mergeProps(
            {
                className: classNames(props.className, cx('root')),
                onBeforeInput,
                onInput,
                onKeyDown,
                onPaste
            },
            ptmi('root')
        );

        return (
            <ComponentProvider value={inputtext}>
                <input ref={ref} {...rootProps} />
                {hasTooltip && <Tooltip target={ref} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />}
            </ComponentProvider>
        );
    })
);

InputText.displayName = 'InputText';
