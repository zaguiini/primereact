import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/textarea';
import { isEmpty, isNotEmpty, isVisible } from '@primeuix/utils';
import { defaultProps } from './Textarea.props';

export const useTextarea = withComponent(
    ({ elementRef, props, parent }) => {
        // states
        const [filled, setFilled] = React.useState(false);
        const state = {
            filled
        };

        // refs
        const cachedScrollHeight = React.useRef(0);

        // methods
        const onFocus = (event) => {
            if (props.autoResize) {
                resize();
            }

            props.onFocus?.(event);
        };
        const onBlur = (event) => {
            if (props.autoResize) {
                resize();
            }

            props.onBlur?.(event);
        };
        const onKeyUp = (event) => {
            if (props.autoResize) {
                resize();
            }

            props.onKeyUp?.(event);
        };
        const onKeyDown = (event) => {
            props.onKeyDown?.(event);

            if (props.keyfilter) {
                KeyFilter.onKeyPress(event, props.keyfilter, props.validateOnly);
            }
        };
        const onBeforeInput = (event) => {
            props.onBeforeInput?.(event);

            if (props.keyfilter) {
                KeyFilter.onBeforeInput(event, props.keyfilter, props.validateOnly);
            }
        };
        const onPaste = (event) => {
            props.onPaste?.(event);

            if (props.keyfilter) {
                KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
            }
        };
        const onInput = (event) => {
            const target = event.target;

            if (props.autoResize) {
                resize(isEmpty(target.value));
            }

            props.onInput?.(event);

            setFilled(isNotEmpty(target.value));
        };
        const resize = (initial) => {
            const inputEl = elementRef.current;

            if (inputEl && isVisible(inputEl)) {
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

        // computed
        const hasFluid = isEmpty(props.fluid) ? !!parent?.$pc?.Fluid : props.fluid;

        // effects
        React.useEffect(() => {
            setFilled(isNotEmpty(props.value) || isNotEmpty(props.defaultValue));
        }, [props.value, props.defaultValue]);

        React.useEffect(() => {
            if (props.autoResize) {
                resize(true);
            }
        }, [props.autoResize]);

        return {
            state,
            // methods
            onFocus,
            onBlur,
            onKeyUp,
            onKeyDown,
            onBeforeInput,
            onInput,
            onPaste,
            // computed
            filled, // compatibility with Prime*
            hasFluid
        };
    },
    defaultProps,
    style
);
