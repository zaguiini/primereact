import { ComponentProvider } from '@primereact/core/component';
import { useEventListener, useUnmountEffect } from '@primereact/hooks';
import { ChevronUpIcon } from '@primereact/icons/chevronup';
import { classNames, getWindowScrollTop, mergeProps, ZIndex } from '@primeuix/utils';
import { Button } from 'primereact/button';
import { CSSTransition } from 'primereact/csstransition';
import { IconUtils } from 'primereact/utils';
import * as React from 'react';
import { useScrollTop } from './ScrollTop.base';

export const ScrollTop = React.memo(
    React.forwardRef((inProps, inRef) => {
        const [visibleState, setVisibleState] = React.useState(false);
        const state = {
            visible: visibleState
        };
        const scrolltop = useScrollTop(inProps, inRef, state);
        const { props, ptm, ptmi, cx, ref } = scrolltop;

        const scrollElementRef = React.useRef(null);

        const [bindParentScrollListener] = useEventListener({
            target: () => scrollElementRef.current && scrollElementRef.current.parentElement,
            type: 'scroll',
            listener: (event) => {
                checkVisibility(event.currentTarget.scrollTop);
            }
        });

        const [bindDocumentScrollListener] = useEventListener({
            target: 'window',
            type: 'scroll',
            listener: (event) => {
                checkVisibility(getWindowScrollTop());
            }
        });

        const onClick = () => {
            const scrollElement = props.target === 'window' ? window : scrollElementRef.current.parentElement;

            scrollElement.scroll({
                top: 0,
                behavior: props.behavior
            });
        };

        const checkVisibility = (scrollY) => {
            setVisibleState(scrollY > props.threshold);
        };

        const onEnter = () => {
            ZIndex.set('overlay', scrollElementRef.current, context?.autoZIndex, context?.zIndex.overlay);
        };

        const onEntered = () => {
            props.onShow && props.onShow();
        };

        const onExited = () => {
            ZIndex.clear(scrollElementRef.current);

            props.onHide && props.onHide();
        };

        React.useEffect(() => {
            if (props.target === 'window') bindDocumentScrollListener();
            else if (props.target === 'parent') bindParentScrollListener();
        }, []);

        useUnmountEffect(() => {
            ZIndex.clear(scrollElementRef.current);
        });

        const iconProps = mergeProps(
            {
                className: cx('icon')
            },
            ptm('icon')
        );
        const icon = props.icon || <ChevronUpIcon {...iconProps} />;
        const scrollIcon = IconUtils.getJSXIcon(icon, { ...iconProps }, { props });
        const scrollTopAriaLabel = ''; //localeOption('aria') ? localeOption('aria').scrollTop : undefined; @todo: check localeOption

        const transitionProps = mergeProps(
            {
                classNames: cx('transition'),
                in: visibleState,
                timeout: { enter: 150, exit: 150 },
                options: props.transitionOptions,
                unmountOnExit: true,
                onEnter,
                onEntered,
                onExited
            },
            ptm('transition')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={scrolltop}>
                <CSSTransition nodeRef={scrollElementRef} {...transitionProps}>
                    <Button
                        ref={scrollElementRef}
                        style={props.style}
                        className={classNames(cx('root'), props.className)}
                        icon={scrollIcon}
                        onClick={onClick}
                        aria-label={scrollTopAriaLabel}
                        unstyled={props.unstyled}
                        {...props.buttonProps}
                        {...ptmi('root')}
                    ></Button>
                </CSSTransition>
            </ComponentProvider>
        );
    })
);

ScrollTop.displayName = 'ScrollTop';
