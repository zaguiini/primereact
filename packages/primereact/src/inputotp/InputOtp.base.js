import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/inputotp';
import * as React from 'react';
import { defaultProps } from './InputOtp.props';

export const useInputOtp = withComponent(
    ({ id, props }) => {
        // state
        const [tokens, setTokens] = React.useState([]);
        const state = {
            tokens
        };

        // methods
        const getTemplateAttrs = (index) => {
            return {
                value: tokens[index]
            };
        };
        const getTemplateEvents = (index) => {
            return {
                onInput: (event) => onInput(event, index),
                onKeyDown,
                onFocus,
                onBlur,
                onPaste
            };
        };
        const onInput = (event, index) => {
            const newTokens = [...tokens];
            newTokens[index] = event.target.value;
            updateModel(event, newTokens);

            if (event.inputType === 'deleteContentBackward') {
                moveToPrev(event);
            } else if (event.inputType === 'insertText' || event.inputType === 'deleteContentForward') {
                moveToNext(event);
            }
        };
        const onFocus = (event) => {
            event.target.select();
            props.onFocus?.(event);
        };
        const onBlur = (event) => {
            props.onBlur?.(event);
        };
        const onClick = (event) => {
            setTimeout(() => event.target.select(), 1);
        };
        const onKeyDown = (event) => {
            if (event.ctrlKey || event.metaKey) {
                return;
            }

            switch (event.code) {
                case 'ArrowLeft':
                    moveToPrev(event);
                    event.preventDefault();

                    break;

                case 'ArrowUp':
                case 'ArrowDown':
                    event.preventDefault();

                    break;

                case 'Backspace':
                    if (event.target.value.length === 0) {
                        moveToPrev(event);
                        event.preventDefault();
                    }

                    break;

                case 'ArrowRight':
                    moveToNext(event);
                    event.preventDefault();

                    break;

                case 'Enter':
                case 'NumpadEnter':
                case 'Tab':
                    break;

                default:
                    if ((props.integerOnly && !(event.code !== 'Space' && Number(event.key) >= 0 && Number(event.key) <= 9)) || (tokens.join('').length >= props.length && event.code !== 'Delete')) {
                        event.preventDefault();
                    }

                    break;
            }
        };
        const onPaste = (event) => {
            let paste = event.clipboardData.getData('text');

            if (paste.length) {
                let pastedCode = paste.substring(0, props.length);

                if (!props.integerOnly || !isNaN(pastedCode)) {
                    const newTokens = pastedCode.split('');
                    updateModel(event, newTokens);
                }
            }

            event.preventDefault();
        };
        const updateModel = (event, values) => {
            if (!props.disabled && !props.readOnly) {
                const value = values.join('');

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
                        id,
                        value
                    }
                });
            }
        };
        const moveToPrev = (event) => {
            let prevInput = findPrevInput(event.target);

            if (prevInput) {
                prevInput.focus();
                prevInput.select();
            }
        };
        const moveToNext = (event) => {
            let nextInput = findNextInput(event.target);

            if (nextInput) {
                nextInput.focus();
                nextInput.select();
            }
        };
        const findNextInput = (element) => {
            let nextElement = element.nextElementSibling;

            if (!nextElement) return;

            return nextElement.nodeName === 'INPUT' ? nextElement : findNextInput(nextElement);
        };
        const findPrevInput = (element) => {
            let prevElement = element.previousElementSibling;

            if (!prevElement) return;

            return prevElement.nodeName === 'INPUT' ? prevElement : findPrevInput(prevElement);
        };

        // computed
        const inputMode = props.integerOnly ? 'numeric' : 'text';
        const inputType = props.mask ? 'password' : 'text';

        // effects
        React.useEffect(() => {
            setTokens(props.value ? props.value.split?.('') : new Array(props.length));
        }, [props.value]);

        return {
            state,
            // methods
            getTemplateAttrs,
            getTemplateEvents,
            onInput,
            onFocus,
            onBlur,
            onClick,
            onKeyDown,
            onPaste,
            updateModel,
            // computed
            inputMode,
            inputType
        };
    },
    defaultProps,
    style
);
