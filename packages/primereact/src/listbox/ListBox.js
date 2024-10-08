import { Component, ComponentProvider } from '@primereact/core/component';
import { Icon } from '@primereact/icons/base';
import { BlankIcon } from '@primereact/icons/blank';
import { CheckIcon } from '@primereact/icons/check';
import { SearchIcon } from '@primereact/icons/search';
import { classNames, isNotEmpty } from '@primeuix/utils';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Ripple } from 'primereact/ripple';
import { Tooltip } from 'primereact/tooltip';
import { VirtualScroller } from 'primereact/virtualscroller';
import * as React from 'react';
import { useListbox } from './ListBox.base';

export const ListBox = React.memo(
    React.forwardRef((inProps, inRef) => {
        const listbox = useListbox(inProps, inRef);
        const {
            id,
            props,
            state,
            ptm,
            ptmi,
            cx,
            // element refs
            elementRef,
            firstHiddenFocusableElementRef,
            lastHiddenFocusableElementRef,
            virtualScrollerRef,
            listRef,
            // methods
            getOptionIndex,
            getOptionLabel,
            isOptionDisabled,
            isOptionGroup,
            getOptionGroupLabel,
            getAriaPosInset,
            onFirstHiddenFocus,
            onLastHiddenFocus,
            onFocusOut,
            onListFocus,
            onListBlur,
            onListKeyDown,
            onOptionSelect,
            onOptionMouseDown,
            onOptionMouseMove,
            onOptionTouchEnd,
            onOptionDblClick,
            onFilterChange,
            onFilterBlur,
            onFilterKeyDown,
            isSelected,
            // computed
            visibleOptions,
            filterResultMessageText,
            emptyFilterMessageText,
            emptyMessageText,
            selectedMessageText,
            focusedOptionId,
            ariaSetSize,
            virtualScrollerDisabled
        } = listbox;

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

        const createLastHiddenFocusable = () => {
            const lastHiddenFocusableProps = mergeProps(
                {
                    role: 'presentation',
                    'aria-hidden': true,
                    className: 'p-hidden-accessible p-hidden-focusable',
                    tabIndex: !props.disabled ? props.tabIndex : -1,
                    onFocus: onLastHiddenFocus,
                    'data-p-hidden-accessible': true,
                    'data-p-hidden-focusable': true
                },
                ptm('hiddenLastFocusableEl')
            );

            return <span {...lastHiddenFocusableProps} ref={lastHiddenFocusableElementRef}></span>;
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

        const createHiddenEmptyMessage = () => {
            if (isEmpty(props.options)) {
                const hiddenEmptyMessageProps = mergeProps(
                    {
                        role: 'status',
                        'aria-live': 'polite',
                        className: 'p-hidden-accessible',
                        'data-p-hidden-accessible': true
                    },
                    ptm('hiddenEmptyMessage')
                );

                return <span {...hiddenEmptyMessageProps}>{emptyMessageText}</span>;
            }

            return null;
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
                if (state.filterValue) {
                    return <li {...commonEmptyMessageProps}>{resolve(props.emptyFilter, listbox) || emptyFilterMessageText}</li>;
                }

                return <li {...commonEmptyMessageProps}>{resolve(props.emptyMessage, listbox) || emptyMessageText}</li>;
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

            const checkmarkKey = selected ? 'optionCheckIcon' : 'optionBlankIcon';
            const checkmark = <Icon pIf={props.checkmark} as={selected ? <CheckIcon /> : <BlankIcon />} {...mergeProps({ className: cx(checkmarkKey) }, ptm(checkmarkKey))} />;

            const optionProps = mergeProps(
                {
                    id: id + '_' + index,
                    className: classNames(cx('option', { option, focusedOption: index })), // @todo: focusedOption ??
                    style: { height: itemSize ? itemSize + 'px' : undefined },
                    role: 'option',
                    'aria-label': label,
                    'aria-selected': selected,
                    'aria-disabled': disabled,
                    'aria-setsize': ariaSetSize,
                    'aria-posinset': getAriaPosInset(index),
                    onClick: (event) => onOptionSelect(event, option),
                    onMouseDown: (event) => onOptionMouseDown(event, index),
                    onMouseMove: (event) => onOptionMouseMove(event, index),
                    onTouchEnd: onOptionTouchEnd,
                    onDblClick: (event) => onOptionDblClick(event, option),
                    'data-p-selected': selected,
                    'data-p-focused': state.focusedOptionIndex === index,
                    'data-p-disabled': disabled
                },
                getPTItemOptions(option, getItemOptions, index, 'option')
            );

            return (
                <li {...optionProps}>
                    {checkmark}
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
                    tabIndex: -1,
                    role: 'listbox',
                    'aria-multiselectable': 'multiple',
                    'aria-label': props.ariaLabel,
                    'aria-labelledby': props.ariaLabelledby,
                    'aria-activedescendant': state.focused ? focusedOptionId : undefined,
                    'aria-disabled': props.disabled,
                    onFocus: onListFocus,
                    onBlur: onListBlur,
                    onKeyDown: onListKeyDown
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
            const listContainerProps = mergeProps(
                {
                    style: { maxHeight: virtualScrollerDisabled ? props.scrollHeight : '' },
                    className: cx('listContainer')
                },
                ptm('listContainer')
            );

            const onLazyLoad = (event) => props.virtualScrollerOptions.onLazyLoad?.({ ...event, ...{ filter: props.filterValue } });

            return (
                <div {...listContainerProps}>
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
                        onLazyLoad={onLazyLoad}
                        pt={ptm('virtualScroller')}
                    />
                </div>
            );
        };

        const createFilter = () => {
            if (props.filter) {
                const hiddenFilterResultProps = mergeProps(
                    {
                        role: 'status',
                        'aria-live': 'polite',
                        className: 'p-hidden-accessible',
                        'data-p-hidden-accessible': true
                    },
                    ptm('hiddenFilterResult')
                );

                const filterProps = mergeProps(
                    {
                        className: cx('header')
                    },
                    ptm('header')
                );

                return (
                    <div {...filterProps}>
                        <IconField unstyled={props.unstyled} pt={ptm('pcFilterContainer')}>
                            <InputText
                                ref={filterInputRef}
                                type="text"
                                value={state.filterValue || ''}
                                className={cx('pcFilter')}
                                placeholder={props.filterPlaceholder}
                                variant={props.variant}
                                unstyled={props.unstyled}
                                tabIndex={!props.disabled && !state.focused ? props.tabIndex : -1}
                                role="searchbox"
                                autoComplete="off"
                                aria-owns={id + '_list'}
                                aria-activedescendant={focusedOptionId}
                                onKeyDown={onFilterKeyDown}
                                onBlur={onFilterBlur}
                                onChange={onFilterChange}
                                pt={ptm('pcFilter')}
                            />
                            <InputIcon unstyled={props.unstyled} pt={ptm('pcFilterIconContainer')}>
                                <Icon as={props.filterIcon || <SearchIcon />} {...ptm('filterIcon')} />
                            </InputIcon>
                        </IconField>
                        <span {...hiddenFilterResultProps}>{filterResultMessageText}</span>
                    </div>
                );
            }

            return null;
        };

        const createHeader = () => {
            if (props.header) {
                const header = resolve(props.header, { value: props.value, options: visibleOptions });

                return <div className={cx('header')}>{header}</div>;
            }

            return null;
        };

        const createFirstHiddenFocusable = () => {
            const firstHiddenFocusableProps = mergeProps(
                {
                    role: 'presentation',
                    'aria-hidden': true,
                    className: 'p-hidden-accessible p-hidden-focusable',
                    tabIndex: !props.disabled ? props.tabIndex : -1,
                    onFocus: onFirstHiddenFocus,
                    'data-p-hidden-accessible': true,
                    'data-p-hidden-focusable': true
                },
                ptm('hiddenFirstFocusableEl')
            );

            return <span {...firstHiddenFocusableProps} ref={firstHiddenFocusableElementRef}></span>;
        };

        const firstHiddenFocusable = createFirstHiddenFocusable();
        const header = createHeader();
        const filter = createFilter();
        const list = createList();
        const footer = resolve(props.footer, { value: props.value, options: visibleOptions });
        const hiddenEmptyMessage = createHiddenEmptyMessage();
        const hiddenSelectedMessage = createHiddenSelectedMessage();
        const lastHiddenFocusable = createLastHiddenFocusable();

        const rootProps = mergeProps(
            {
                id,
                className: cx('root'),
                onFocusOut
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={listbox}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {firstHiddenFocusable}
                    {header}
                    {filter}
                    {list}
                    {footer}
                    {hiddenEmptyMessage}
                    {hiddenSelectedMessage}
                    {lastHiddenFocusable}
                </Component>
                <Tooltip pIf={isNotEmpty(props.tooltip)} target={elementRef} content={props.tooltip} pt={ptm('tooltip')} {...props.tooltipOptions} />
            </ComponentProvider>
        );
    })
);

ListBox.displayName = 'ListBox';
