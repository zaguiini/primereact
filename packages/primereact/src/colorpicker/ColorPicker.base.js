import { withComponent } from '@primereact/core/component';
import { useEventListener, useMountEffect, useOverlayListener, useUnmountEffect } from '@primereact/hooks';
import { style } from '@primereact/styles/colorpicker';
import { addClass, addStyle, removeClass, toValue, alignOverlay as utils_alignOverlay, ZIndex } from '@primeuix/utils';
import { OverlayService } from 'primereact/overlayservice';
import { defaultProps } from './ColorPicker.props';

export const useColorPicker = withComponent(
    ({ elementRef, id, props, isUnstyled, $primereact }) => {
        // states
        const [overlayVisible, setOverlayVisible] = React.useState(false);
        const state = {
            overlayVisible
        };

        // refs
        const hueDragging = React.useRef(false);
        const hsbValue = React.useRef(null);
        const colorDragging = React.useRef(false);

        // element refs
        const overlayRef = React.useRef(null);
        const inputRef = React.useRef(null);
        const colorSelectorRef = React.useRef(null);
        const colorHandleRef = React.useRef(null);
        const hueHandleRef = React.useRef(null);
        const hueViewRef = React.useRef(null);

        // bindings
        const [bindOverlayListener, unbindOverlayListener] = useOverlayListener({
            target: elementRef,
            overlay: overlayRef,
            listener: (event, { valid }) => {
                valid && hide();
            },
            when: overlayVisible
        });

        const [bindDocumentMouseMoveListener, unbindDocumentMouseMoveListener] = useEventListener({
            type: 'mousemove',
            listener: (event) => {
                colorDragging.current && pickColor(event);
                hueDragging.current && pickHue(event);
            }
        });

        const [bindDocumentMouseUpListener, unbindDocumentMouseUpListener] = useEventListener({
            type: 'mouseup',
            listener: () => {
                colorDragging.current = hueDragging.current = false;
                removeClass(elementRef.current, 'p-colorpicker-dragging');
                unbindDocumentMouseMoveListener();
                unbindDocumentMouseUpListener();
            }
        });

        // methods
        const onOverlayClick = (event) => {
            if (!props.inline) {
                OverlayService.emit('overlay-click', {
                    originalEvent: event,
                    target: elementRef.current
                });
            }
        };
        const onHueMouseDown = (event) => {
            if (props.disabled) {
                return;
            }

            bindDragListeners();
            onHueDragStart(event);
        };
        const onHueDragStart = (event) => {
            if (props.disabled) {
                return;
            }

            hueDragging.current = true;
            pickHue(event);
            !isUnstyled && addClass(elementRef.current, 'p-colorpicker-dragging');
        };
        const getPositionY = (event) => {
            if (event.pageY !== undefined) return event.pageY;
            else if (event.changedTouches !== undefined) return event.changedTouches[0].pageY;
            else return 0;
        };
        const pickHue = (event) => {
            const top = hueViewRef.current.getBoundingClientRect().top + (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0);
            const yPos = getPositionY(event);
            const hue = Math.floor((360 * (150 - Math.max(0, Math.min(150, yPos - top)))) / 150);

            hsbValue.current = validateHSB({
                h: hue,
                s: hsbValue.current.s,
                b: hsbValue.current.b
            });

            updateColorSelector();
            updateHue();
            updateModel();
        };
        const onColorMouseDown = (event) => {
            if (props.disabled) {
                return;
            }

            bindDragListeners();
            onColorDragStart(event);
        };
        const onColorDragStart = (event) => {
            if (props.disabled) {
                return;
            }

            colorDragging.current = true;
            pickColor(event);
            !isUnstyled && addClass(elementRef.current, 'p-colorpicker-dragging');
            event.preventDefault();
        };
        const onDrag = (event) => {
            if (colorDragging.current) {
                pickColor(event);
                event.preventDefault();
            }

            if (hueDragging.current) {
                pickHue(event);
                event.preventDefault();
            }
        };
        const onDragEnd = () => {
            colorDragging.current = false;
            hueDragging.current = false;
            !isUnstyled && removeClass(elementRef.current, 'p-colorpicker-dragging');
            unbindDragListeners();
        };
        const bindDragListeners = () => {
            bindDocumentMouseMoveListener();
            bindDocumentMouseUpListener();
        };
        const unbindDragListeners = () => {
            unbindDocumentMouseMoveListener();
            unbindDocumentMouseUpListener();
        };
        const pickColor = (event) => {
            const rect = colorSelectorRef.current.getBoundingClientRect();
            const top = rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
            const left = rect.left + document.body.scrollLeft;
            const saturation = Math.floor((100 * Math.max(0, Math.min(150, (event.pageX || event.changedTouches[0].pageX) - left))) / 150);
            const brightness = Math.floor((100 * (150 - Math.max(0, Math.min(150, (event.pageY || event.changedTouches[0].pageY) - top)))) / 150);

            hsbValue.current = validateHSB({
                h: hsbValue.current.h,
                s: saturation,
                b: brightness
            });

            updateColorHandle();
            updateInput();
            updateModel();
        };
        const updateModel = () => {
            switch (props.format) {
                case 'hex':
                    onChange(HSBtoHEX(hsbValue.current));
                    break;

                case 'rgb':
                    onChange(HSBtoRGB(hsbValue.current));
                    break;

                case 'hsb':
                    onChange(hsbValue.current);
                    break;

                default:
                    break;
            }
        };
        const toHSB = (value) => {
            let hsb;

            if (value) {
                switch (props.format) {
                    case 'hex':
                        hsb = HEXtoHSB(value);
                        break;

                    case 'rgb':
                        hsb = RGBtoHSB(value);
                        break;

                    case 'hsb':
                        hsb = value;
                        break;

                    default:
                        break;
                }
            } else {
                hsb = HEXtoHSB(props.defaultColor);
            }

            return hsb;
        };
        const updateHSBValue = (value) => {
            hsbValue.current = toHSB(value);
        };
        const onChange = (value) => {
            props.onChange?.({
                value,
                stopPropagation: () => {},
                preventDefault: () => {},
                target: {
                    id,
                    value: value
                }
            });
        };
        const updateColorSelector = () => {
            if (colorSelectorRef.current) {
                let newHsbValue = validateHSB({
                    h: hsbValue.current.h,
                    s: 100,
                    b: 100
                });

                colorSelectorRef.current.style.backgroundColor = '#' + HSBtoHEX(newHsbValue);
            }
        };
        const updateColorHandle = () => {
            if (colorHandleRef.current) {
                colorHandleRef.current.style.left = Math.floor((150 * hsbValue.current.s) / 100) + 'px';
                colorHandleRef.current.style.top = Math.floor((150 * (100 - hsbValue.current.b)) / 100) + 'px';
            }
        };
        const updateHue = () => {
            if (hueHandleRef.current) {
                hueHandleRef.current.style.top = Math.floor(150 - (150 * hsbValue.current.h) / 360) + 'px';
            }
        };
        const updateInput = () => {
            if (inputRef.current) {
                inputRef.current.style.backgroundColor = '#' + HSBtoHEX(hsbValue.current);
            }
        };
        const show = () => {
            setOverlayVisible(true);
        };
        const hide = () => {
            setOverlayVisible(false);
        };
        const onOverlayEnter = () => {
            props.autoZIndex && ZIndex.set('overlay', overlayRef.current, props.baseZIndex || $primereact.config.zIndex.overlay);
            addStyle(overlayRef.current, !props.inline ? { position: 'absolute', top: '0', left: '0' } : undefined);
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
        const onInputClick = () => {
            togglePanel();
        };
        const togglePanel = () => {
            overlayVisible ? hide() : show();
        };
        const onInputKeyDown = (event) => {
            switch (event.which) {
                //space
                case 32:
                    togglePanel();
                    event.preventDefault();
                    break;

                //escape and tab
                case 27:
                case 9:
                    hide();
                    break;

                default:
                    break;
            }
        };
        const validateHSB = (hsb) => {
            return {
                h: Math.min(360, Math.max(0, hsb.h)),
                s: Math.min(100, Math.max(0, hsb.s)),
                b: Math.min(100, Math.max(0, hsb.b))
            };
        };
        const HEXtoRGB = (hex) => {
            const hexValue = parseInt(hex.indexOf('#') > -1 ? hex.substring(1) : hex, 16);

            return { r: hexValue >> 16, g: (hexValue & 0x00ff00) >> 8, b: hexValue & 0x0000ff };
        };
        const HEXtoHSB = (hex) => {
            return RGBtoHSB(HEXtoRGB(hex));
        };
        const RGBtoHSB = (rgb) => {
            let hsb = {
                h: 0,
                s: 0,
                b: 0
            };
            let min = Math.min(rgb.r, rgb.g, rgb.b);
            let max = Math.max(rgb.r, rgb.g, rgb.b);
            let delta = max - min;

            hsb.b = max;
            hsb.s = max !== 0 ? (255 * delta) / max : 0;

            if (hsb.s !== 0) {
                if (rgb.r === max) {
                    hsb.h = (rgb.g - rgb.b) / delta;
                } else if (rgb.g === max) {
                    hsb.h = 2 + (rgb.b - rgb.r) / delta;
                } else {
                    hsb.h = 4 + (rgb.r - rgb.g) / delta;
                }
            } else {
                hsb.h = -1;
            }

            hsb.h = hsb.h * 60;

            if (hsb.h < 0) {
                hsb.h = hsb.h + 360;
            }

            hsb.s = hsb.s * (100 / 255);
            hsb.b = hsb.b * (100 / 255);

            return hsb;
        };
        const HSBtoRGB = (hsb) => {
            let rgb = {
                r: null,
                g: null,
                b: null
            };
            let h = Math.round(hsb.h);
            let s = Math.round((hsb.s * 255) / 100);
            let v = Math.round((hsb.b * 255) / 100);

            if (s === 0) {
                rgb = {
                    r: v,
                    g: v,
                    b: v
                };
            } else {
                let t1 = v;
                let t2 = ((255 - s) * v) / 255;
                let t3 = ((t1 - t2) * (h % 60)) / 60;

                if (h === 360) {
                    h = 0;
                }

                if (h < 60) {
                    rgb.r = t1;
                    rgb.b = t2;
                    rgb.g = t2 + t3;
                } else if (h < 120) {
                    rgb.g = t1;
                    rgb.b = t2;
                    rgb.r = t1 - t3;
                } else if (h < 180) {
                    rgb.g = t1;
                    rgb.r = t2;
                    rgb.b = t2 + t3;
                } else if (h < 240) {
                    rgb.b = t1;
                    rgb.r = t2;
                    rgb.g = t1 - t3;
                } else if (h < 300) {
                    rgb.b = t1;
                    rgb.g = t2;
                    rgb.r = t2 + t3;
                } else if (h < 360) {
                    rgb.r = t1;
                    rgb.g = t2;
                    rgb.b = t1 - t3;
                } else {
                    rgb.r = 0;
                    rgb.g = 0;
                    rgb.b = 0;
                }
            }

            return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
        };
        const RGBtoHEX = (rgb) => {
            let hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];

            for (let key in hex) {
                if (hex[key].length === 1) {
                    hex[key] = '0' + hex[key];
                }
            }

            return hex.join('');
        };
        const HSBtoHEX = (hsb) => {
            return RGBtoHEX(HSBtoRGB(hsb));
        };
        const updateUI = () => {
            updateHue();
            updateColorHandle();
            updateInput();
            updateColorSelector();
        };
        const alignOverlay = () => {
            if (inputRef.current) {
                utils_alignOverlay(overlayRef.current, inputRef.current.parentElement, props.appendTo || $primereact.config.appendTo);
            }
        };

        // effects
        useMountEffect(() => {
            updateHSBValue(props.value);
            updateUI();

            if (props.autoFocus) {
                focus(inputRef.current, props.autoFocus);
            }

            alignOverlay();
        });

        useUpdateEffect(() => {
            if (!colorDragging.current && !hueDragging.current) {
                updateHSBValue(props.value);
            }
        }, [props.value]);

        useUpdateEffect(() => {
            updateUI();
        });

        useUnmountEffect(() => {
            ZIndex.clear(overlayRef.current);
        });

        return {
            state,
            // refs
            hueDragging: toValue(hueDragging),
            hsbValue: toValue(hsbValue),
            colorDragging: toValue(colorDragging),
            // element refs
            overlayRef,
            inputRef,
            colorSelectorRef,
            colorHandleRef,
            hueHandleRef,
            hueViewRef,
            // methods
            onOverlayClick,
            onHueMouseDown,
            onHueDragStart,
            getPositionY,
            pickHue,
            onColorMouseDown,
            onColorDragStart,
            onDrag,
            onDragEnd,
            bindDragListeners,
            unbindDragListeners,
            pickColor,
            updateModel,
            toHSB,
            updateHSBValue,
            onChange,
            updateColorSelector,
            updateColorHandle,
            updateHue,
            updateInput,
            show,
            hide,
            onOverlayEnter,
            onOverlayEntered,
            onOverlayExit,
            onOverlayExited,
            onInputClick,
            togglePanel,
            onInputKeyDown,
            validateHSB,
            HEXtoRGB,
            HEXtoHSB,
            RGBtoHSB,
            HSBtoRGB,
            RGBtoHEX,
            HSBtoHEX,
            updateUI,
            alignOverlay
        };
    },
    defaultProps,
    style
);
