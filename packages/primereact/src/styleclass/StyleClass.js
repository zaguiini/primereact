import { ComponentProvider } from '@primereact/core/component';
import { useEventListener, useMountEffect, useUnmountEffect, useUpdateEffect } from '@primereact/hooks';
import { addClass, hasClass, removeClass } from '@primeuix/utils';
import { ObjectUtils } from 'primereact/utils';
import * as React from 'react';
import { useStyleClass } from './StyleClass.base';

// @todo - Rewrite this component to use the new Component API
export const StyleClass = React.forwardRef((inProps, inRef) => {
    const styleclass = useStyleClass(inProps, inRef);
    const { props, ref } = styleclass;

    const targetRef = React.useRef(null);
    const animating = React.useRef(false);

    const [bindTargetEnterListener, unbindTargetEnterListener] = useEventListener({
        type: 'animationend',
        listener: () => {
            removeClass(targetRef.current, props.enterActiveClassName);

            if (props.enterToClassName) {
                addClass(targetRef.current, props.enterToClassName);
            }

            unbindTargetEnterListener();

            if (props.enterActiveClassName.includes('slidedown')) {
                targetRef.current.style.maxHeight = '';
            }

            animating.current = false;
        }
    });

    const [bindTargetLeaveListener, unbindTargetLeaveListener] = useEventListener({
        type: 'animationend',
        listener: () => {
            removeClass(targetRef.current, props.leaveActiveClassName);

            if (props.leaveToClassName) {
                addClass(targetRef.current, props.leaveToClassName);
            }

            unbindTargetLeaveListener();
            animating.current = false;
        }
    });

    const [bindDocumentClickListener, unbindDocumentClickListener] = useEventListener({
        type: 'click',
        listener: (event) => {
            if (!isVisible(targetRef.current) || getComputedStyle(targetRef.current).getPropertyValue('position') === 'static') {
                unbindDocumentClickListener();
            } else if (isOutsideClick(event)) {
                leave();
            }
        },
        when: props.hideOnOutsideClick
    });

    const [bindClickListener, unbindClickListener] = useEventListener({
        type: 'click',
        listener: () => {
            targetRef.current = resolveTarget();

            if (props.toggleClassName) {
                if (hasClass(targetRef.current, props.toggleClassName)) {
                    removeClass(targetRef.current, props.toggleClassName);
                } else {
                    addClass(targetRef.current, props.toggleClassName);
                }
            } else {
                isVisible(targetRef.current) ? leave() : enter();
            }
        }
    });

    const enter = () => {
        if (props.enterActiveClassName) {
            if (!animating.current) {
                animating.current = true;

                if (props.enterActiveClassName === 'slidedown') {
                    targetRef.current.style.height = '0px';
                    removeClass(targetRef.current, props.hiddenClassName || props.enterFromClassName);
                    targetRef.current.style.maxHeight = targetRef.current.scrollHeight + 'px';
                    addClass(targetRef.current, props.hiddenClassName || props.enterActiveClassName);
                    targetRef.current.style.height = '';
                }

                addClass(targetRef.current, props.enterActiveClassName);

                if (props.enterFromClassName) {
                    removeClass(targetRef.current, props.enterFromClassName);
                }

                bindTargetEnterListener({ target: targetRef.current });
            }
        } else {
            if (props.enterFromClassName) {
                removeClass(targetRef.current, props.enterFromClassName);
            }

            if (props.enterToClassName) {
                addClass(targetRef.current, props.enterToClassName);
            }
        }

        bindDocumentClickListener({ target: ref.current && ref.current.ownerDocument });
    };

    const leave = () => {
        if (props.leaveActiveClassName) {
            if (!animating.current) {
                animating.current = true;
                addClass(targetRef.current, props.leaveActiveClassName);

                if (props.leaveFromClassName) {
                    removeClass(targetRef.current, props.leaveFromClassName);
                }

                bindTargetLeaveListener({ target: targetRef.current });
            }
        } else {
            if (props.leaveFromClassName) {
                removeClass(targetRef.current, props.leaveFromClassName);
            }

            if (props.leaveToClassName) {
                addClass(targetRef.current, props.leaveToClassName);
            }
        }

        if (props.hideOnOutsideClick) {
            unbindDocumentClickListener();
        }
    };

    const resolveTarget = () => {
        if (targetRef.current) {
            return targetRef.current;
        }

        switch (props.selector) {
            case '@next':
                return ref.current && ref.current.nextElementSibling;

            case '@prev':
                return ref.current && ref.current.previousElementSibling;

            case '@parent':
                return ref.current && ref.current.parentElement;

            case '@grandparent':
                return ref.current && ref.current.parentElement.parentElement;

            default:
                return document.querySelector(props.selector);
        }
    };

    const init = () => {
        Promise.resolve().then(() => {
            // @todo: refactor useImperativeHandle method in useComponent
            ref.current = ObjectUtils.getRefElement(props.nodeRef);
            ref.current?.setAttribute('data-pd-styleclass', true);
            bindClickListener({ target: ref.current });
        });
    };

    const destroy = () => {
        unbindClickListener();
        unbindDocumentClickListener();
        targetRef.current = null;
    };

    const isVisible = (target) => {
        return target && target.offsetParent !== null;
    };

    const isOutsideClick = (event) => {
        return !ref.current.isSameNode(event.target) && !ref.current.contains(event.target) && !targetRef.current.contains(event.target);
    };

    React.useImperativeHandle(ref, () => ({
        getTarget: () => targetRef.current
    }));

    useMountEffect(() => {
        init();
    });

    useUpdateEffect(() => {
        init();

        return () => {
            unbindClickListener();
        };
    });

    useUnmountEffect(() => {
        destroy();
    });

    return (
        <ComponentProvider pIf={props.pIf} value={styleclass}>
            {props.children}
        </ComponentProvider>
    );
});

StyleClass.displayName = 'StyleClass';
