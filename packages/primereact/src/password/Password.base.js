import { withComponent } from '@primereact/core/component';
import { useOverlayListener } from '@primereact/hooks';
import { style } from '@primereact/styles/password';
import { addStyle, isNotEmpty, alignOverlay as utils_alignOverlay, ZIndex } from '@primeuix/utils';
import { defaultProps } from './Password.props';

export const usePassword = withComponent(
    ({ elementRef, props, parent, $primereact }) => {
        // states
        const [overlayVisible, setOverlayVisible] = React.useState(false);
        const [meter, setMeter] = React.useState(null);
        const [infoText, setInfoText] = React.useState(null);
        const [focused, setFocused] = React.useState(false);
        const [unmasked, setUnmasked] = React.useState(false);
        const [filled, setFilled] = React.useState(false);
        const state = {
            overlayVisible,
            meter,
            infoText,
            focused,
            unmasked,
            filled
        };

        // refs
        const mediumCheckRegExp = React.useRef(new RegExp(props.mediumRegex));
        const strongCheckRegExp = React.useRef(new RegExp(props.strongRegex));

        // element refs
        const overlayRef = React.useRef(null);
        const inputRef = React.useRef(null);

        // bindings
        const [bindOverlayListener, unbindOverlayListener] = useOverlayListener({
            target: elementRef,
            overlay: overlayRef,
            listener: (event, { valid }) => {
                valid && hide();
            },
            when: overlayVisible
        });

        // methods
        const onInput = (event, validatePattern) => {
            props.onInput?.(event, validatePattern);

            if (!props.onChange) {
                setFilled(isNotEmpty(event.target.value));
            }
        };
        const onFocus = (event) => {
            setFocused(true);

            if (props.feedback) {
                show();
            }

            props.onFocus?.(event);
        };
        const onBlur = (event) => {
            setFocused(false);

            if (props.feedback) {
                hide();
            }

            props.onBlur?.(event);
        };
        const onKeyUp = (e) => {
            const keyCode = e.code;

            if (props.feedback) {
                if (!!keyCode && keyCode !== 'Escape' && !overlayVisible) {
                    show();
                }
            }

            props.onKeyUp?.(e);
        };
        const onOverlayClick = (event) => {
            if (props.feedback) {
                OverlayService.emit('overlay-click', {
                    originalEvent: event,
                    target: elementRef.current
                });
            }
        };
        const onOverlayEnter = () => {
            ZIndex.set('overlay', overlayRef.current, $primereact.config.autoZIndex, $primereact.config.zIndex.overlay);
            addStyle(overlayRef.current, { position: 'absolute', top: '0', left: '0' });
            alignOverlay();
        };
        const onOverlayEntered = () => {
            bindOverlayListener();

            props.onShow?.();
        };
        const onOverlayExit = () => {
            unbindOverlayListener();
        };
        const onOverlayExited = () => {
            ZIndex.clear(overlayRef.current);

            props.onHide?.();
        };
        const alignOverlay = () => {
            if (inputRef.current) {
                utils_alignOverlay(overlayRef.current, inputRef.current.parentElement, props.appendTo || $primereact.config.appendTo);
            }
        };
        const testStrength = (str) => {
            if (!str || str.length === 0) {
                return 0;
            }

            if (strongCheckRegExp.current.test(str)) {
                return 3;
            } else if (mediumCheckRegExp.current.test(str)) {
                return 2;
            } else if (str.length > 0) {
                return 1;
            }

            return 0;
        };
        const updateLabels = () => {
            if (meter) {
                let label = null;

                switch (meter.strength) {
                    case 'weak':
                        label = weakLabel;
                        break;

                    case 'medium':
                        label = mediumLabel;
                        break;

                    case 'strong':
                        label = strongLabel;
                        break;

                    default:
                        break;
                }

                if (label && infoText !== label) {
                    setInfoText(label);
                }
            } else if (infoText !== promptLabel) {
                setInfoText(promptLabel);
            }
        };
        const updateFeedback = (value) => {
            if (!props.feedback) {
                return false;
            }

            let label = null;
            let meter = null;

            switch (testStrength(value)) {
                case 1:
                    label = weakLabel;
                    meter = {
                        strength: 'weak',
                        width: '33.33%'
                    };
                    break;

                case 2:
                    label = mediumLabel;
                    meter = {
                        strength: 'medium',
                        width: '66.66%'
                    };
                    break;

                case 3:
                    label = strongLabel;
                    meter = {
                        strength: 'strong',
                        width: '100%'
                    };
                    break;

                default:
                    label = promptLabel;
                    meter = null;
                    break;
            }

            setMeter(meter);
            setInfoText(label);

            return true;
        };
        const show = () => {
            updateLabels();
            setOverlayVisible(true);
        };
        const hide = () => {
            setOverlayVisible(false);
        };
        const toggleMask = () => {
            setUnmasked((prevUnmasked) => !prevUnmasked);
        };

        // computed
        const inputType = unmasked ? 'text' : 'password';
        const hasFluid = isEmpty(props.fluid) ? !!parent?.$pc?.Fluid : props.fluid;
        const promptLabel = props.promptLabel; //|| localeOption('passwordPrompt');
        const weakLabel = props.weakLabel; //|| localeOption('weak');
        const mediumLabel = props.mediumLabel; //|| localeOption('medium');
        const strongLabel = props.strongLabel; //|| localeOption('strong');

        // effects
        React.useEffect(() => {
            mediumCheckRegExp.current = new RegExp(props.mediumRegex);
        }, [props.mediumRegex]);

        React.useEffect(() => {
            strongCheckRegExp.current = new RegExp(props.strongRegex);
        }, [props.strongRegex]);

        React.useEffect(() => {
            setFilled(isNotEmpty(props.value) || isNotEmpty(props.defaultValue));
        }, [props.value, props.defaultValue]);

        useUpdateEffect(() => {
            updateFeedback(props.value);
        }, [props.value]);

        useMountEffect(() => {
            setInfoText(promptLabel);
        });

        useUnmountEffect(() => {
            ZIndex.clear(overlayRef.current);
        });

        return {
            state,
            // element refs
            overlayRef,
            inputRef,
            // methods
            onInput,
            onFocus,
            onBlur,
            onKeyUp,
            onOverlayClick,
            onOverlayEnter,
            onOverlayEntered,
            onOverlayExit,
            onOverlayExited,
            alignOverlay,
            updateLabels,
            updateFeedback,
            show,
            hide,
            toggleMask,
            // computed
            inputType,
            hasFluid,
            promptLabel,
            weakLabel,
            mediumLabel,
            strongLabel
        };
    },
    defaultProps,
    style
);
