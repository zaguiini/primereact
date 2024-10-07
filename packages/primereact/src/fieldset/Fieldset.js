import { Component, ComponentProvider } from '@primereact/core/component';
import { MinusIcon } from '@primereact/icons/minus';
import { PlusIcon } from '@primereact/icons/plus';
import { mergeProps } from '@primeuix/utils';
import { CSSTransition } from 'primereact/csstransition';
import * as React from 'react';
import { useFieldset } from './Fieldset.base';

export const Fieldset = React.forwardRef((inProps, inRef) => {
    const fieldset = useFieldset(inProps, inRef);
    const {
        id,
        props,
        state,
        ptm,
        ptmi,
        cx,
        // element refs
        elementRef,
        contentRef,
        // methods
        onButtonClick,
        // computed
        buttonAriaLabel
    } = fieldset;

    const headerId = id + '_header';
    const contentId = id + '_content';

    const createContent = () => {
        const content = resolve(props.template || props.children, fieldset);

        const contentProps = mergeProps(
            {
                className: cx('content')
            },
            ptm('content')
        );

        const contentContainerProps = mergeProps(
            {
                id: contentId,
                className: cx('contentContainer'),
                role: 'region',
                'aria-labelledby': headerId
            },
            ptm('contentContainer')
        );

        const transitionProps = mergeProps(
            {
                classNames: cx('transition'),
                timeout: { enter: 1000, exit: 450 },
                in: !state.collapsed,
                unmountOnExit: true,
                options: props.transitionOptions
            },
            ptm('transition')
        );

        return (
            <CSSTransition {...transitionProps} nodeRef={contentRef}>
                <div {...toggleableProps} ref={contentRef}>
                    <div {...contentContainerProps}>
                        <div {...contentProps}>{content}</div>
                    </div>
                </div>
            </CSSTransition>
        );
    };

    const createLegendContent = () => {
        const legend = resolve(props.legend, fieldset);

        const legendLabelProps = mergeProps(
            {
                id: headerId,
                className: cx('legendLabel')
            },
            ptm('legendLabel')
        );

        const toggleIcon = resolve(props.toggleIconTemplate, panel) || <Icon as={state.collapsed ? props.expandIcon || <PlusIcon /> : props.collapseIcon || <MinusIcon />} />;

        return props.toggleable ? (
            <Button
                id={headerId}
                className={cx('pcToggleButton')}
                label={legend}
                icon={toggleIcon}
                unstyled={props.unstyled}
                aria-label={buttonAriaLabel}
                aria-controls={contentId}
                aria-expanded={!state.collapsed}
                onClick={onButtonClick}
                {...props.toggleButtonProps}
                pt={ptm('pcToggleButton')}
            />
        ) : (
            <span {...legendLabelProps}>{legend}</span>
        );
    };

    const createLegend = () => {
        const content = resolve(props.legendTemplate, fieldset) || createLegendContent();
        const legendProps = mergeProps(
            {
                className: cx('legend')
            },
            ptm('legend')
        );

        return <legend {...legendProps}>{content}</legend>;
    };

    const legend = createLegend();
    const content = createContent();

    const rootProps = mergeProps(
        {
            id,
            className: cx('root')
        },
        ptmi('root')
    );

    return (
        <ComponentProvider pIf={props.pIf} value={fieldset}>
            <Component as={props.as || 'fieldset'} {...rootProps} ref={elementRef}>
                {legend}
                {content}
            </Component>
        </ComponentProvider>
    );
});

Fieldset.displayName = 'Fieldset';
