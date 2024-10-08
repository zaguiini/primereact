import * as React from 'react';

// @todo - Rewrite this component to use the new Component API
export const Ripple = React.memo(
    React.forwardRef((inProps, inRef) => {
        /*const [isMounted, setMounted] = React.useState(false);
        const ripple = useRipple(inProps, inRef);
        const {
            id,
            props,
            state,
            ptm,
            ptmi,
            cx,
            // element refs
            elementRef
        } = ripple;
        const inkRef = React.useRef(null);
        const targetRef = React.useRef(null);
        // @todo
        const isRippleActive = false; //context?.ripple;

        const getTarget = () => {
            return inkRef.current && inkRef.current.parentElement;
        };

        const bindEvents = () => {
            if (targetRef.current) {
                targetRef.current.addEventListener('pointerdown', onPointerDown);
            }
        };

        const unbindEvents = () => {
            if (targetRef.current) {
                targetRef.current.removeEventListener('pointerdown', onPointerDown);
            }
        };

        const onPointerDown = (event) => {
            const offset = DomHandler.getOffset(targetRef.current);
            const offsetX = event.pageX - offset.left + document.body.scrollTop - DomHandler.getWidth(inkRef.current) / 2;
            const offsetY = event.pageY - offset.top + document.body.scrollLeft - DomHandler.getHeight(inkRef.current) / 2;

            activateRipple(offsetX, offsetY);
        };

        const activateRipple = (offsetX, offsetY) => {
            if (!inkRef.current || getComputedStyle(inkRef.current, null).display === 'none') {
                return;
            }

            DomHandler.removeClass(inkRef.current, 'p-ink-active');

            setDimensions();

            inkRef.current.style.top = offsetY + 'px';
            inkRef.current.style.left = offsetX + 'px';
            DomHandler.addClass(inkRef.current, 'p-ink-active');
        };

        const onAnimationEnd = (event) => {
            DomHandler.removeClass(event.currentTarget, 'p-ink-active');
        };

        const setDimensions = () => {
            if (inkRef.current && !DomHandler.getHeight(inkRef.current) && !DomHandler.getWidth(inkRef.current)) {
                let d = Math.max(DomHandler.getOuterWidth(targetRef.current), DomHandler.getOuterHeight(targetRef.current));

                inkRef.current.style.height = d + 'px';
                inkRef.current.style.width = d + 'px';
            }
        };

        React.useImperativeHandle(ref, () => ({
            props,
            getInk: () => inkRef.current,
            getTarget: () => targetRef.current
        }));

        useMountEffect(() => {
            // for App Router in Next.js ^14
            setMounted(true);
        });

        useUpdateEffect(() => {
            if (isMounted && inkRef.current) {
                targetRef.current = getTarget();
                setDimensions();
                bindEvents();
            }
        }, [isMounted]);

        useUpdateEffect(() => {
            if (inkRef.current && !targetRef.current) {
                targetRef.current = getTarget();
                setDimensions();
                bindEvents();
            }
        });

        useUnmountEffect(() => {
            if (inkRef.current) {
                targetRef.current = null;
                unbindEvents();
            }
        });

        if (!isRippleActive) {
            return null;
        }

        const rootProps = mergeProps(
            {
                'aria-hidden': true,
                className: cx('root')
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={ripple}>
                <span role="presentation" ref={inkRef} {...rootProps} onAnimationEnd={onAnimationEnd} />
            </ComponentProvider>
        );*/

        return null;
    })
);

Ripple.displayName = 'Ripple';
