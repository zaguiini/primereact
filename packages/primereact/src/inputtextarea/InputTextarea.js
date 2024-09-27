import { Component, ComponentProvider } from '@primereact/core/component';
import { KeyFilter } from 'primereact/keyfilter';
import { Tooltip } from 'primereact/tooltip';
import * as React from 'react';
import { DomHandler, ObjectUtils, classNames } from '../utils/Utils';
import { useInputTextarea } from './InputTextarea.base';
import { InputTextareaBase } from './InputTextareaBase';

export const InputTextarea = React.memo(
    React.forwardRef((inProps, inRef) => {
        const inputtextarea = useInputTextarea(inProps, inRef);
        const {
            props,
            state,
            ptm,
            ptmi,
            cx,
            id,
            // element refs
            elementRef,
            focusInputRef,
            clearIconRef,
            // methods
            onFocus,
            onBlur,
            onKeyDown,
            onEditableInput,
            onContainerClick,
            onClearClick,
            // computed
            selectedOption,
            label: labelText,
            editableInputValue,
            focusedOptionId,
            isClearIconVisible,
            ptm,
            ptmi,
            cx,
            ref
        } = inputtextarea;

        const elementRef = React.useRef(ref);
        const cachedScrollHeight = React.useRef(0);

        const onFocus = (event) => {
            if (props.autoResize) {
                resize();
            }

            props.onFocus && props.onFocus(event);
        };

        const onBlur = (event) => {
            if (props.autoResize) {
                resize();
            }

            props.onBlur && props.onBlur(event);
        };

        const onKeyUp = (event) => {
            if (props.autoResize) {
                resize();
            }

            props.onKeyUp && props.onKeyUp(event);
        };

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

        const onPaste = (event) => {
            props.onPaste && props.onPaste(event);

            if (props.keyfilter) {
                KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
            }
        };

        const onInput = (event) => {
            const target = event.target;

            if (props.autoResize) {
                resize(ObjectUtils.isEmpty(target.value));
            }

            props.onInput && props.onInput(event);

            ObjectUtils.isNotEmpty(target.value) ? DomHandler.addClass(target, 'p-filled') : DomHandler.removeClass(target, 'p-filled');
        };

        const resize = (initial) => {
            const inputEl = elementRef.current;

            if (inputEl && DomHandler.isVisible(inputEl)) {
                if (!cachedScrollHeight.current) {
                    cachedScrollHeight.current = inputEl.scrollHeight;
                    inputEl.style.overflow = 'hidden';
                }

                if (cachedScrollHeight.current !== inputEl.scrollHeight || initial) {
                    inputEl.style.height = '';
                    inputEl.style.height = inputEl.scrollHeight + 'px';

                    if (parseFloat(inputEl.style.height) >= parseFloat(inputEl.style.maxHeight)) {
                        inputEl.style.overflowY = 'scroll';
                        inputEl.style.height = inputEl.style.maxHeight;
                    } else {
                        inputEl.style.overflow = 'hidden';
                    }

                    cachedScrollHeight.current = inputEl.scrollHeight;
                }
            }
        };

        React.useEffect(() => {
            ObjectUtils.combinedRefs(elementRef, ref);
        }, [elementRef, ref]);

        React.useEffect(() => {
            if (props.autoResize) {
                resize(true);
            }
        }, [props.autoResize]);

        const isFilled = React.useMemo(() => ObjectUtils.isNotEmpty(props.value) || ObjectUtils.isNotEmpty(props.defaultValue), [props.value, props.defaultValue]);
        const hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);

        const rootProps = mergeProps(
            {
                ref: elementRef,
                className: classNames(props.className, cx('root', { context, isFilled })),
                onFocus: onFocus,
                onBlur: onBlur,
                onKeyUp: onKeyUp,
                onKeyDown: onKeyDown,
                onBeforeInput: onBeforeInput,
                onInput: onInput,
                onPaste: onPaste
            },
            InputTextareaBase.getOtherProps(props),
            ptm('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={inputtextarea}>
                <Component as={props.as || 'textarea'} {...rootProps} ref={elementRef} />
                <Tooltip pIf={isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />
            </ComponentProvider>
        );
    })
);

InputTextarea.displayName = 'InputTextarea';
