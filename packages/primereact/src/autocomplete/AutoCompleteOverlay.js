import { CSSTransition } from 'primereact/csstransition';
import { Portal } from 'primereact/portal';
import { Ripple } from 'primereact/ripple';
import { VirtualScroller } from 'primereact/virtualscroller';
import * as React from 'react';

export const AutoCompleteOverlay = React.memo(
    React.forwardRef((inProps, inRef) => {
        const { overlay } = inProps;
        const {
            props,
            state,
            ptm,
            cx,
            id,
            // element refs
            overlayRef,
            virtualScrollerRef,
            listRef,
            // methods
            getOptionIndex,
            getOptionLabel,
            isOptionDisabled,
            isOptionGroup,
            getOptionGroupLabel,
            getAriaPosInset,
            onOptionSelect,
            onOptionMouseMove,
            onOverlayClick,
            onOverlayKeyDown,
            onOverlayEnter,
            onOverlayEntered,
            onOverlayExit,
            onOverlayExited,
            isSelected,
            // computed
            visibleOptions,
            searchResultMessageText,
            selectedMessageText,
            listAriaLabel,
            ariaSetSize,
            virtualScrollerDisabled
        } = overlay;

        const getPTItemOptions = (option, itemOptions, index, key) => {
            return ptm(key, {
                context: {
                    option,
                    index,
                    selected: isSelected(option),
                    focused: state.focusedOptionIndex === getOptionIndex(index, itemOptions),
                    disabled: isOptionDisabled(option)
                }
            });
        };

        const createHiddenSelectedMessage = () => {
            const hiddenSelectedMessageProps = mergeProps(
                {
                    role: 'status',
                    'aria-live': 'polite',
                    className: 'p-hidden-accessible',
                    'data-p-hidden-accessible': true
                },
                ptm('hiddenSelectedMessage')
            );

            return <span {...hiddenSelectedMessageProps}>{selectedMessageText}</span>;
        };

        const createEmptyMessage = (items) => {
            const commonEmptyMessageProps = mergeProps(
                {
                    className: cx('emptyMessage'),
                    role: 'option',
                    'data-p-hidden-accessible': true
                },
                ptm('emptyMessage')
            );

            if (isEmpty(items)) {
                return <li {...commonEmptyMessageProps}>{resolve(props.emptySearchMessage) || searchResultMessageText}</li>;
            }

            return null;
        };

        const createListItem = (option, options) => {
            const { itemSize, index, optionGroup, getItemOptions } = options;

            if (isOptionGroup(option)) {
                const optionGroupLabelProps = mergeProps({ className: cx('optionGroupLabel') }, ptm('optionGroupLabel'));
                const content = resolve(props.optionGroupTemplate, { option: optionGroup, index }) || <span {...optionGroupLabelProps}>{getOptionGroupLabel(optionGroup)}</span>;

                const optionGroupProps = mergeProps(
                    {
                        id: id + '_' + index,
                        style: { height: itemSize ? itemSize + 'px' : undefined },
                        className: cx('optionGroup'),
                        role: 'option'
                    },
                    ptm('optionGroup')
                );

                return <li {...optionGroupProps}>{content}</li>;
            }

            const selected = isSelected(option);
            const disabled = isOptionDisabled(option);
            const label = getOptionLabel(option);

            const optionLabelProps = mergeProps(
                {
                    className: cx('optionLabel')
                },
                ptm('optionLabel')
            );

            const content = resolve(props.optionTemplate, { option, selected, index }) || <span {...optionLabelProps}>{label}</span>;

            const optionProps = mergeProps(
                {
                    id: id + '_' + index,
                    className: classNames(cx('option', { option, i: index, getItemOptions })), // @todo: focusedOption ??
                    style: { height: itemSize ? itemSize + 'px' : undefined },
                    role: 'option',
                    'aria-label': label,
                    'aria-selected': selected,
                    'aria-disabled': disabled,
                    'aria-setsize': ariaSetSize,
                    'aria-posinset': getAriaPosInset(index),
                    onClick: (event) => onOptionSelect(event, option),
                    onMouseMove: (event) => onOptionMouseMove(event, index),
                    'data-p-selected': selected,
                    'data-p-focused': state.focusedOptionIndex === index,
                    'data-p-disabled': disabled
                },
                getPTItemOptions(option, getItemOptions, index, 'option')
            );

            return (
                <li {...optionProps}>
                    {content}
                    <Ripple />
                </li>
            );
        };

        const createListContent = (options) => {
            const { contentRef, style, className, children: content, items } = options;
            //listRef.current = contentRef.current; @todo

            const emptyMessage = createEmptyMessage(items);

            const listProps = mergeProps(
                {
                    id: id + '_list',
                    style,
                    className: classNames(cx('list'), className),
                    role: 'listbox',
                    'aria-label': listAriaLabel
                },
                ptm('list')
            );

            return (
                <ul {...listProps} ref={listRef}>
                    {content}
                    {emptyMessage}
                </ul>
            );
        };

        const createList = () => {
            return (
                <VirtualScroller
                    {...props.virtualScrollerOptions}
                    ref={virtualScrollerRef}
                    items={visibleOptions}
                    style={{ ...props.virtualScrollerOptions?.style, ...{ height: props.scrollHeight } }}
                    tabIndex={-1}
                    disabled={virtualScrollerDisabled}
                    autoSize={true}
                    contentTemplate={createListContent}
                    itemTemplate={createListItem}
                    loadingTemplate={props.loader}
                    pt={ptm('virtualScroller')}
                />
            );
        };

        const header = resolve(props.header, { value: props.value, suggestions: visibleOptions, instance: overlay });
        const list = createList();
        const footer = resolve(props.footer, { value: props.value, suggestions: visibleOptions, instance: overlay });
        const hiddenSelectedMessage = createHiddenSelectedMessage();

        const overlayProps = mergeProps(
            {
                id: `${id}_overlay`,
                style: { ...props.overlayStyle, 'max-height': virtualScrollerDisabled ? props.scrollHeight : '' },
                className: classNames(cx('overlay'), props.overlayClassName),
                onClick: onOverlayClick,
                onKeyDown: onOverlayKeyDown
            },
            ptm('overlay')
        );

        const transitionProps = mergeProps(
            {
                classNames: 'p-connected-overlay',
                in: state.overlayVisible,
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
            <Portal appendTo={props.appendTo}>
                <CSSTransition {...transitionProps} nodeRef={overlayRef}>
                    <div {...overlayProps} ref={overlayRef}>
                        {header}
                        {list}
                        {footer}
                        {hiddenSelectedMessage}
                    </div>
                </CSSTransition>
            </Portal>
        );
    })
);

AutoCompleteOverlay.displayName = 'AutoCompleteOverlay';
