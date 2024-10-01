import { classNames } from '@primeuix/utils';
import { CSSTransition } from 'primereact/csstransition';
import { Portal } from 'primereact/portal';
import * as React from 'react';

export const ColorPickerOverlay = React.memo(
    React.forwardRef((inProps, inRef) => {
        const { colorpicker } = inProps;
        const {
            props,
            state,
            ptm,
            cx,
            // element refs
            overlayRef,
            colorSelectorRef,
            colorHandleRef,
            hueHandleRef,
            hueViewRef,
            // methods
            onOverlayClick,
            onHueMouseDown,
            onHueDragStart,
            onColorMouseDown,
            onColorDragStart,
            onDrag,
            onDragEnd,
            onOverlayEnter,
            onOverlayEntered,
            onOverlayExit,
            onOverlayExited
        } = colorpicker;

        const createHue = () => {
            const hueHandlerProps = mergeProps(
                {
                    className: cx('hueHandle')
                },
                ptm('hueHandle')
            );

            const hueProps = mergeProps(
                {
                    className: cx('hue'),
                    onMouseDown: onHueMouseDown,
                    onTouchStart: onHueDragStart,
                    onTouchMove: onDrag,
                    onTouchEnd: onDragEnd
                },
                ptm('hue')
            );

            return (
                <div {...hueProps} ref={hueViewRef}>
                    <div {...hueHandlerProps} ref={hueHandleRef} />
                </div>
            );
        };

        const createColorSelector = () => {
            const colorHandlerProps = mergeProps(
                {
                    className: cx('colorHandle')
                },
                ptm('colorHandle')
            );

            const colorProps = mergeProps(
                {
                    className: cx('colorBackground')
                },
                ptm('colorBackground')
            );

            const selectorProps = mergeProps(
                {
                    className: cx('colorSelector'),
                    onMouseDown: onColorMouseDown,
                    onTouchStart: onColorDragStart,
                    onTouchMove: onDrag,
                    onTouchEnd: onDragEnd
                },
                ptm('colorSelector')
            );

            return (
                <div {...selectorProps} ref={colorSelectorRef}>
                    <div {...colorProps}>
                        <div {...colorHandlerProps} ref={colorHandleRef} />
                    </div>
                </div>
            );
        };

        const createContent = () => {
            const colorSelector = createColorSelector();
            const hue = createHue();

            const contentProps = mergeProps(
                {
                    className: cx('content')
                },
                ptm('content')
            );

            return (
                <div {...contentProps}>
                    {colorSelector}
                    {hue}
                </div>
            );
        };

        const content = createContent();

        const overlayProps = mergeProps(
            {
                style: props.overlayStyle,
                className: classNames(cx('overlay'), props.overlayClassName),
                onClick: onOverlayClick
            },
            ptm('overlay')
        );

        const transitionProps = mergeProps(
            {
                classNames: 'p-connected-overlay',
                in: props.inline || state.overlayVisible,
                timeout: { enter: 120, exit: 100 },
                options: props.transitionOptions,
                unmountOnExit: true,
                onEnter: onOverlayEnter,
                onEntered: onOverlayEntered,
                onExit: onOverlayExit,
                onExited: onOverlayExited
            },
            ptm('transition')
        );

        return (
            <Portal appendTo={props.appendTo} disabled={props.inline}>
                <CSSTransition {...transitionProps} nodeRef={overlayRef}>
                    <div {...overlayProps} ref={overlayRef}>
                        {content}
                    </div>
                </CSSTransition>
            </Portal>
        );
    })
);

ColorPickerOverlay.displayName = 'ColorPickerOverlay';
