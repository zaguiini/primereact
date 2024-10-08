import { withComponent } from '@primereact/core/component';
import { useEventListener, useMountEffect, useOverlayListener, useUnmountEffect, useUpdateEffect } from '@primereact/hooks';
import { style } from '@primereact/styles/multiselect';
import { equals, getFocusableElements, toValue, alignOverlay as utils_alignOverlay } from '@primeuix/utils';
import { OverlayService } from 'primereact/overlayservice';
import * as React from 'react';
import { defaultProps } from './MultiSelect.props';

export const useMultiSelect = withComponent(
    ({ elementRef, id, props, parent, $primereact }) => {
        // states
        const [clicked, setClicked] = React.useState(false);
        const [focused, setFocused] = React.useState(false);
        const [focusedOptionIndex, setFocusedOptionIndex] = React.useState(-1);
        const [filterValue, setFilterValue] = React.useState('');
        const [overlayVisible, setOverlayVisible] = React.useState(false);
        const state = {
            clicked,
            focused,
            focusedOptionIndex,
            filterValue,
            overlayVisible
        };

        // refs
        const searchValue = React.useRef('');
        const searchTimeout = React.useRef(null);
        const startRangeIndex = React.useRef(-1);

        // element refs
        const focusInputRef = React.useRef(null);
        const overlayRef = React.useRef(null);
        const filterInputRef = React.useRef(null);
        const firstHiddenFocusableElementOnOverlayRef = React.useRef(null);
        const lastHiddenFocusableElementOnOverlayRef = React.useRef(null);
        const virtualScrollerRef = React.useRef(null);
        const listRef = React.useRef(null);

        // bindings
        const [bindOverlayListener, unbindOverlayListener] = useOverlayListener({
            target: elementRef,
            overlay: overlayRef,
            listener: (event, { type, valid }) => {
                valid && hide();
            },
            when: overlayVisible
        });

        const [bindLabelClickListener, unbindLabelClickListener] = useEventListener({
            target: `label[for="${props.inputId}"]`,
            type: 'click',
            listener: () => {
                focus(focusInputRef.current);
            }
        });

        // methods
        const getOptionIndex = (index, fn) => {
            return virtualScrollerDisabled ? index : fn && fn(index)['index'];
        };
        const getOptionLabel = (option) => {
            return props.optionLabel ? resolveFieldData(option, props.optionLabel) : option;
        };
        const getOptionValue = (option) => {
            return props.optionValue ? resolveFieldData(option, props.optionValue) : option;
        };
        const getOptionRenderKey = (option, index) => {
            return props.dataKey ? resolveFieldData(option, props.dataKey) : getOptionLabel(option) + `_${index}`;
        };
        const isOptionDisabled = (option) => {
            if (maxSelectionLimitReached && !isSelected(option)) {
                return true;
            }

            return props.optionDisabled ? resolveFieldData(option, props.optionDisabled) : false;
        };
        const isOptionGroup = (option) => {
            return props.optionGroupLabel && option.optionGroup && option.group;
        };
        const getOptionGroupLabel = (optionGroup) => {
            return resolveFieldData(optionGroup, props.optionGroupLabel);
        };
        const getOptionGroupChildren = (optionGroup) => {
            return resolveFieldData(optionGroup, props.optionGroupChildren);
        };
        const getAriaPosInset = (index) => {
            return (props.optionGroupLabel ? index - visibleOptions.slice(0, index).filter((option) => isOptionGroup(option)).length : index) + 1;
        };
        const show = (isFocus) => {
            props.onBeforeShow?.();
            setOverlayVisible(true);
            setFocusedOptionIndex((prevFocusedOptionIndex) => (prevFocusedOptionIndex !== -1 ? prevFocusedOptionIndex : props.autoOptionFocus ? findFirstFocusedOptionIndex() : findSelectedOptionIndex()));

            isFocus && focus(focusInputRef.current);
        };
        const hide = (isFocus) => {
            const _hide = () => {
                props.onBeforeHide?.();
                setOverlayVisible(false);
                setClicked(false);
                setFocusedOptionIndex(-1);
                searchValue.current = '';

                props.resetFilterOnHide && setFilterValue('');
                isFocus && focus(focusInputRef.current);
            };

            setTimeout(() => {
                _hide();
            }, 0); // For ScreenReaders
        };
        const onFocus = (event) => {
            if (props.disabled) {
                // For ScreenReaders
                return;
            }

            setFocused(true);

            if (overlayVisible) {
                setFocusedOptionIndex((prevFocusedOptionIndex) => (prevFocusedOptionIndex !== -1 ? prevFocusedOptionIndex : props.autoOptionFocus ? findFirstFocusedOptionIndex() : findSelectedOptionIndex()));
                scrollInView(focusedOptionIndex);
            }
        };
        const onBlur = (event) => {
            setClicked(false);
            setFocused(false);
            setFocusedOptionIndex(-1);
            searchValue.current = '';
            props.onBlur?.(event);
        };
        const onKeyDown = (event) => {
            if (props.disabled) {
                event.preventDefault();

                return;
            }

            const metaKey = event.metaKey || event.ctrlKey;

            switch (event.code) {
                case 'ArrowDown':
                    onArrowDownKey(event);
                    break;

                case 'ArrowUp':
                    onArrowUpKey(event);
                    break;

                case 'Home':
                    onHomeKey(event);
                    break;

                case 'End':
                    onEndKey(event);
                    break;

                case 'PageDown':
                    onPageDownKey(event);
                    break;

                case 'PageUp':
                    onPageUpKey(event);
                    break;

                case 'Enter':
                case 'NumpadEnter':
                case 'Space':
                    onEnterKey(event);
                    break;

                case 'Escape':
                    onEscapeKey(event);
                    break;

                case 'Tab':
                    onTabKey(event);
                    break;

                case 'ShiftLeft':
                case 'ShiftRight':
                    onShiftKey(event);
                    break;

                default:
                    if (event.code === 'KeyA' && metaKey) {
                        const value = visibleOptions.filter((option) => isValidOption(option)).map((option) => getOptionValue(option));

                        updateModel(event, value);

                        event.preventDefault();
                        break;
                    }

                    if (!metaKey && isPrintableCharacter(event.key)) {
                        !overlayVisible && show();
                        searchOptions(event);
                        event.preventDefault();
                    }

                    break;
            }

            setClicked(false);
        };
        const onContainerClick = (event) => {
            if (props.disabled || props.loading) {
                return;
            }

            if (!overlayRef.current?.contains(event.target)) {
                overlayVisible ? hide(true) : show(true);
            }

            setClicked(false);
        };
        const onFirstHiddenFocus = (event) => {
            const focusableEl = event.relatedTarget === focusInputRef.current ? getFirstFocusableElement(overlayRef.current, ':not([data-p-hidden-focusable="true"])') : focusInputRef.current;

            focus(focusableEl);
        };
        const onLastHiddenFocus = (event) => {
            const focusableEl = event.relatedTarget === focusInputRef.current ? getLastFocusableElement(overlayRef.current, ':not([data-p-hidden-focusable="true"])') : focusInputRef.current;

            focus(focusableEl);
        };
        const onOptionSelect = (event, option, index = -1, isFocus = false) => {
            if (props.disabled || isOptionDisabled(option)) {
                return;
            }

            let selected = isSelected(option);
            let value = null;

            if (selected) value = props.value.filter((val) => !equals(val, getOptionValue(option), equalityKey));
            else value = [...(props.value || []), getOptionValue(option)];

            updateModel(event, value);
            index !== -1 && setFocusedOptionIndex(index);
            isFocus && focus(focusInputRef.current);
        };
        const onOptionMouseMove = (event, index) => {
            if (props.focusOnHover) {
                changeFocusedOptionIndex(event, index);
            }
        };
        const onOptionSelectRange = (event, start = -1, end = -1) => {
            start === -1 && (start = findNearestSelectedOptionIndex(end, true));
            end === -1 && (end = findNearestSelectedOptionIndex(start));

            if (start !== -1 && end !== -1) {
                const rangeStart = Math.min(start, end);
                const rangeEnd = Math.max(start, end);
                const value = visibleOptions
                    .slice(rangeStart, rangeEnd + 1)
                    .filter((option) => isValidOption(option))
                    .map((option) => getOptionValue(option));

                updateModel(event, value);
            }
        };
        const onFilterChange = (event) => {
            const value = event.target.value;

            setFilterValue(value);
            setFocusedOptionIndex(-1);
            props.onFilter?.({ originalEvent: event, value });

            !virtualScrollerDisabled && virtualScrollerRef.current?.scrollToIndex(0);
        };
        const onFilterKeyDown = (event) => {
            switch (event.code) {
                case 'ArrowDown':
                    onArrowDownKey(event);
                    break;

                case 'ArrowUp':
                    onArrowUpKey(event, true);
                    break;

                case 'ArrowLeft':
                case 'ArrowRight':
                    onArrowLeftKey(event, true);
                    break;

                case 'Home':
                    onHomeKey(event, true);
                    break;

                case 'End':
                    onEndKey(event, true);
                    break;

                case 'Enter':
                case 'NumpadEnter':
                    onEnterKey(event);
                    break;

                case 'Escape':
                    onEscapeKey(event);
                    break;

                case 'Tab':
                    onTabKey(event, true);
                    break;

                default:
                    break;
            }
        };
        const onFilterBlur = () => {
            setFocusedOptionIndex(-1);
        };
        const onFilterUpdated = () => {
            // @todo
            if (overlayVisible) {
                alignOverlay();
            }
        };
        const onOverlayClick = (event) => {
            OverlayService.emit('overlay-click', {
                originalEvent: event,
                target: elementRef.current
            });
        };
        const onOverlayKeyDown = (event) => {
            switch (event.code) {
                case 'Escape':
                    onEscapeKey(event);
                    break;

                default:
                    break;
            }
        };
        const onArrowDownKey = (event) => {
            if (!overlayVisible) {
                show();
            } else {
                const optionIndex = focusedOptionIndex !== -1 ? findNextOptionIndex(focusedOptionIndex) : clicked ? findFirstOptionIndex() : findFirstFocusedOptionIndex();

                if (event.shiftKey) {
                    onOptionSelectRange(event, startRangeIndex.current, optionIndex);
                }

                changeFocusedOptionIndex(event, optionIndex);
            }

            event.preventDefault();
        };
        const onArrowUpKey = (event, pressedInInputText = false) => {
            if (event.altKey && !pressedInInputText) {
                if (focusedOptionIndex !== -1) {
                    onOptionSelect(event, visibleOptions[focusedOptionIndex]);
                }

                overlayVisible && this.hide();
                event.preventDefault();
            } else {
                const optionIndex = focusedOptionIndex !== -1 ? findPrevOptionIndex(focusedOptionIndex) : clicked ? findLastOptionIndex() : findLastFocusedOptionIndex();

                if (event.shiftKey) {
                    onOptionSelectRange(event, optionIndex, startRangeIndex.current);
                }

                changeFocusedOptionIndex(event, optionIndex);

                !overlayVisible && show();
                event.preventDefault();
            }
        };
        const onArrowLeftKey = (event, pressedInInputText = false) => {
            pressedInInputText && setFocusedOptionIndex(-1);
        };
        const onHomeKey = (event, pressedInInputText = false) => {
            if (pressedInInputText) {
                const target = event.currentTarget;

                if (event.shiftKey) {
                    target.setSelectionRange(0, event.target.selectionStart);
                } else {
                    target.setSelectionRange(0, 0);
                    setFocusedOptionIndex(-1);
                }
            } else {
                let metaKey = event.metaKey || event.ctrlKey;
                let optionIndex = findFirstOptionIndex();

                if (event.shiftKey && metaKey) {
                    onOptionSelectRange(event, optionIndex, startRangeIndex.current);
                }

                changeFocusedOptionIndex(event, optionIndex);

                !overlayVisible && show();
            }

            event.preventDefault();
        };
        const onEndKey = (event, pressedInInputText = false) => {
            if (pressedInInputText) {
                const target = event.currentTarget;

                if (event.shiftKey) {
                    target.setSelectionRange(event.target.selectionStart, target.value.length);
                } else {
                    const len = target.value.length;

                    target.setSelectionRange(len, len);
                    setFocusedOptionIndex(-1);
                }
            } else {
                let metaKey = event.metaKey || event.ctrlKey;
                let optionIndex = findLastOptionIndex();

                if (event.shiftKey && metaKey) {
                    onOptionSelectRange(event, startRangeIndex.current, optionIndex);
                }

                changeFocusedOptionIndex(event, optionIndex);

                !overlayVisible && show();
            }

            event.preventDefault();
        };
        const onPageUpKey = (event) => {
            scrollInView(0);
            event.preventDefault();
        };
        const onPageDownKey = (event) => {
            scrollInView(visibleOptions.length - 1);
            event.preventDefault();
        };
        const onEnterKey = (event) => {
            if (!overlayVisible) {
                setFocusedOptionIndex(-1); // reset
                onArrowDownKey(event);
            } else {
                if (focusedOptionIndex !== -1) {
                    if (event.shiftKey) onOptionSelectRange(event, focusedOptionIndex);
                    else onOptionSelect(event, visibleOptions[focusedOptionIndex]);
                }
            }

            event.preventDefault();
        };
        const onEscapeKey = (event) => {
            overlayVisible && hide(true);
            event.preventDefault();
        };
        const onTabKey = (event, pressedInInputText = false) => {
            if (!pressedInInputText) {
                if (overlayVisible && hasFocusableElements()) {
                    focus(event.shiftKey ? lastHiddenFocusableElementOnOverlayRef.current : firstHiddenFocusableElementOnOverlayRef.current);

                    event.preventDefault();
                } else {
                    if (focusedOptionIndex !== -1) {
                        onOptionSelect(event, visibleOptions[focusedOptionIndex]);
                    }

                    overlayVisible && hide(props.filter);
                }
            }
        };
        const onShiftKey = () => {
            startRangeIndex.current = focusedOptionIndex;
        };
        const onOverlayEnter = () => {
            ZIndex.set('overlay', overlayRef.current, $primereact.config.zIndex.overlay);

            addStyle(overlayRef.current, { position: 'absolute', top: '0', left: '0' });
            alignOverlay();
            scrollInView();

            props.autoFilterFocus && focus(filterInputRef.current);
        };
        const onOverlayEntered = () => {
            bindOverlayListener();

            props.onShow?.();
        };
        const onOverlayExit = () => {
            unbindOverlayListener();

            props.autoFilterFocus && props.filter && focus(focusInputRef.current);
            props.onHide?.();
        };
        const onOverlayExited = () => {
            ZIndex.clear(overlayRef.current);
        };
        const alignOverlay = () => {
            utils_alignOverlay(overlayRef.current, elementRef.current, props.appendTo || $primereact.config.appendTo);
        };
        const getLabelByValue = (value) => {
            const options = props.optionGroupLabel ? flatOptions(props.options) : props.options || [];
            const matchedOption = options.find((option) => !isOptionGroup(option) && equals(getOptionValue(option), value, equalityKey));

            return matchedOption ? getOptionLabel(matchedOption) : null;
        };
        const getSelectedItemsLabel = () => {
            let pattern = /{(.*?)}/;
            const selectedItemsLabel = props.selectedItemsLabel || $primereact.config.locale.selectionMessage;

            if (pattern.test(selectedItemsLabel)) {
                return selectedItemsLabel.replace(selectedItemsLabel.match(pattern)[0], props.value.length + '');
            }

            return selectedItemsLabel;
        };
        const onToggleAll = (event) => {
            if (props.selectAll !== null) {
                props.onSelectAllChange?.({ originalEvent: event, checked: !allSelected });
            } else {
                const value = allSelected ? [] : visibleOptions.filter((option) => isValidOption(option)).map((option) => getOptionValue(option));

                updateModel(event, value);
            }
        };
        const removeOption = (event, optionValue) => {
            event.stopPropagation();
            let value = props.value.filter((val) => !equals(val, optionValue, equalityKey));

            updateModel(event, value);
        };
        const clearFilter = () => {
            filterValue.current = null;
        };
        const hasFocusableElements = () => {
            return getFocusableElements(overlayRef.current, ':not([data-p-hidden-focusable="true"])').length > 0;
        };
        const isOptionMatched = (option) => {
            return isValidOption(option) && typeof getOptionLabel(option) === 'string' && getOptionLabel(option)?.toLocaleLowerCase(props.filterLocale).startsWith(searchValue.current.toLocaleLowerCase(props.filterLocale));
        };
        const isValidOption = (option) => {
            return isNotEmpty(option) && !(isOptionDisabled(option) || isOptionGroup(option));
        };
        const isValidSelectedOption = (option) => {
            return isValidOption(option) && isSelected(option);
        };
        const isEquals = (value1, value2) => {
            return equals(value1, value2, equalityKey);
        };
        const isSelected = (option) => {
            const optionValue = getOptionValue(option);

            return (props.value || []).some((value) => isEquals(value, optionValue));
        };
        const findFirstOptionIndex = () => {
            return visibleOptions.findIndex((option) => isValidOption(option));
        };
        const findLastOptionIndex = () => {
            return findLastIndex(visibleOptions, (option) => isValidOption(option));
        };
        const findNextOptionIndex = (index) => {
            const matchedOptionIndex = index < visibleOptions.length - 1 ? visibleOptions.slice(index + 1).findIndex((option) => isValidOption(option)) : -1;

            return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
        };
        const findPrevOptionIndex = (index) => {
            const matchedOptionIndex = index > 0 ? findLastIndex(visibleOptions.slice(0, index), (option) => isValidOption(option)) : -1;

            return matchedOptionIndex > -1 ? matchedOptionIndex : index;
        };
        const findSelectedOptionIndex = () => {
            if (hasSelectedOption) {
                for (let index = props.value.length - 1; index >= 0; index--) {
                    const value = props.value[index];
                    const matchedOptionIndex = visibleOptions.findIndex((option) => isValidSelectedOption(option) && isEquals(value, getOptionValue(option)));

                    if (matchedOptionIndex > -1) return matchedOptionIndex;
                }
            }

            return -1;
        };
        const findFirstSelectedOptionIndex = () => {
            return hasSelectedOption ? visibleOptions.findIndex((option) => isValidSelectedOption(option)) : -1;
        };
        const findLastSelectedOptionIndex = () => {
            return hasSelectedOption ? findLastIndex(visibleOptions, (option) => isValidSelectedOption(option)) : -1;
        };
        const findNextSelectedOptionIndex = (index) => {
            const matchedOptionIndex = hasSelectedOption && index < visibleOptions.length - 1 ? visibleOptions.slice(index + 1).findIndex((option) => isValidSelectedOption(option)) : -1;

            return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : -1;
        };
        const findPrevSelectedOptionIndex = (index) => {
            const matchedOptionIndex = hasSelectedOption && index > 0 ? findLastIndex(visibleOptions.slice(0, index), (option) => isValidSelectedOption(option)) : -1;

            return matchedOptionIndex > -1 ? matchedOptionIndex : -1;
        };
        const findNearestSelectedOptionIndex = (index, firstCheckUp = false) => {
            let matchedOptionIndex = -1;

            if (hasSelectedOption) {
                if (firstCheckUp) {
                    matchedOptionIndex = findPrevSelectedOptionIndex(index);
                    matchedOptionIndex = matchedOptionIndex === -1 ? findNextSelectedOptionIndex(index) : matchedOptionIndex;
                } else {
                    matchedOptionIndex = findNextSelectedOptionIndex(index);
                    matchedOptionIndex = matchedOptionIndex === -1 ? findPrevSelectedOptionIndex(index) : matchedOptionIndex;
                }
            }

            return matchedOptionIndex > -1 ? matchedOptionIndex : index;
        };
        const findFirstFocusedOptionIndex = () => {
            const selectedIndex = findSelectedOptionIndex();

            return selectedIndex < 0 ? findFirstOptionIndex() : selectedIndex;
        };
        const findLastFocusedOptionIndex = () => {
            const selectedIndex = findSelectedOptionIndex();

            return selectedIndex < 0 ? findLastOptionIndex() : selectedIndex;
        };
        const searchOptions = (event) => {
            searchValue.current = (searchValue.current || '') + event.key;

            let optionIndex = -1;

            if (isNotEmpty(searchValue.current)) {
                if (focusedOptionIndex !== -1) {
                    optionIndex = visibleOptions.slice(focusedOptionIndex).findIndex((option) => isOptionMatched(option));
                    optionIndex = optionIndex === -1 ? visibleOptions.slice(0, focusedOptionIndex).findIndex((option) => isOptionMatched(option)) : optionIndex + focusedOptionIndex;
                } else {
                    optionIndex = visibleOptions.findIndex((option) => isOptionMatched(option));
                }

                if (optionIndex === -1 && focusedOptionIndex === -1) {
                    optionIndex = findFirstFocusedOptionIndex();
                }

                if (optionIndex !== -1) {
                    changeFocusedOptionIndex(event, optionIndex);
                }
            }

            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }

            searchTimeout.current = setTimeout(() => {
                searchValue.current = '';
                searchTimeout.current = null;
            }, 500);
        };
        const changeFocusedOptionIndex = (event, index) => {
            if (focusedOptionIndex !== index) {
                setFocusedOptionIndex(index);
                scrollInView();

                if (props.selectOnFocus) {
                    onOptionSelect(event, visibleOptions[index]);
                }
            }
        };
        const scrollInView = (index = -1) => {
            const itemId = index !== -1 ? `${id}_${index}` : focusedOptionId;
            const element = findSingle(listRef.current, `li[id="${itemId}"]`);

            if (element) {
                element.scrollIntoView?.({ block: 'nearest', inline: 'start' });
            } else if (!virtualScrollerDisabled) {
                virtualScrollerRef.current?.scrollToIndex(index !== -1 ? index : focusedOptionIndex);
            }
        };
        const autoUpdateModel = () => {
            if (props.selectOnFocus && props.autoOptionFocus && !hasSelectedOption) {
                const newFocusedOptionIndex = findFirstFocusedOptionIndex();

                setFocusedOptionIndex(newFocusedOptionIndex);
                onOptionSelect(null, visibleOptions[newFocusedOptionIndex], false);
            }
        };
        const updateModel = (event, value) => {
            props.onChange?.({
                originalEvent: event,
                value,
                stopPropagation: () => {
                    event.stopPropagation();
                },
                preventDefault: () => {
                    event.preventDefault();
                },
                target: {
                    id,
                    value
                }
            });
        };
        const flatOptions = (options) => {
            return (options || []).reduce((result, option, index) => {
                result.push({ optionGroup: option, group: true, index });

                const optionGroupChildren = getOptionGroupChildren(option);

                optionGroupChildren && optionGroupChildren.forEach((o) => result.push(o));

                return result;
            }, []);
        };

        // computed
        const visibleOptions = React.useMemo(() => {
            const options = props.optionGroupLabel ? flatOptions(props.options) : props.options || [];

            if (filterValue.current) {
                const filteredOptions = FilterService.filter(options, props.searchFields, filterValue.current, props.filterMatchMode, props.filterLocale);

                if (props.optionGroupLabel) {
                    const optionGroups = props.options || [];
                    const filtered = [];

                    optionGroups.forEach((group) => {
                        const groupChildren = getOptionGroupChildren(group);
                        const filteredItems = groupChildren.filter((item) => filteredOptions.includes(item));

                        if (filteredItems.length > 0) filtered.push({ ...group, [typeof props.optionGroupChildren === 'string' ? props.optionGroupChildren : 'items']: [...filteredItems] });
                    });

                    return flatOptions(filtered);
                }

                return filteredOptions;
            }

            return options;
        }, []);
        const label = React.useMemo(() => {
            // TODO: Refactor
            let label;

            if (props.value && props.value.length) {
                if (isNotEmpty(props.maxSelectedLabels) && props.value.length > props.maxSelectedLabels) {
                    return getSelectedItemsLabel();
                } else {
                    label = '';

                    for (let i = 0; i < props.value.length; i++) {
                        if (i !== 0) {
                            label += ', ';
                        }

                        label += getLabelByValue(props.value[i]);
                    }
                }
            } else {
                label = props.placeholder;
            }

            return label;
        }, []);
        const chipSelectedItems = isNotEmpty(props.maxSelectedLabels) && props.value && props.value.length > props.maxSelectedLabels;
        const allSelected = props.selectAll !== null ? props.selectAll : isNotEmpty(visibleOptions) && visibleOptions.every((option) => isOptionGroup(option) || isOptionDisabled(option) || isSelected(option));
        const hasSelectedOption = isNotEmpty(props.value);
        const equalityKey = props.optionValue ? null : props.dataKey;
        const searchFields = props.filterFields || [props.optionLabel];
        const maxSelectionLimitReached = props.selectionLimit && props.value && props.value.length === props.selectionLimit;
        const filterResultMessageText = isNotEmpty(props.value) ? filterMessageText.replaceAll('{0}', visibleOptions.length) : emptyFilterMessageText;
        const filterMessageText = props.filterMessage || $primereact.config.locale.searchMessage || '';
        const emptyFilterMessageText = props.emptyFilterMessage || $primereact.config.locale.emptySearchMessage || $primereact.config.locale.emptyFilterMessage || '';
        const emptyMessageText = props.emptyMessage || $primereact.config.locale.emptyMessage || '';
        const selectionMessageText = props.selectionMessage || $primereact.config.locale.selectionMessage || '';
        const emptySelectionMessageText = props.emptySelectionMessage || $primereact.config.locale.emptySelectionMessage || '';
        const selectedMessageText = hasSelectedOption ? selectionMessageText.replaceAll('{0}', props.value.length) : emptySelectionMessageText;
        const focusedOptionId = focusedOptionIndex !== -1 ? `${id}_${focusedOptionIndex}` : null;
        const ariaSetSize = visibleOptions.filter((option) => !isOptionGroup(option)).length;
        const toggleAllAriaLabel = $primereact.config.locale.aria ? $primereact.config.locale.aria[allSelected ? 'selectAll' : 'unselectAll'] : undefined;
        const listAriaLabel = $primereact.config.locale.aria ? $primereact.config.locale.aria.listLabel : undefined;
        const virtualScrollerDisabled = !props.virtualScrollerOptions;
        const hasFluid = isEmpty(props.fluid) ? !!parent.$pc.Fluid : props.fluid;

        // effects
        useMountEffect(() => {
            autoUpdateModel();
            bindLabelClickListener();

            return () => unbindLabelClickListener();
        });

        useUpdateEffect(() => {
            autoUpdateModel();
        }, [props.options]);

        useUpdateEffect(() => {
            if (overlayVisible) {
                // @todo
                scrollInView(focusedOptionIndex);
                alignOverlay();
            }

            //isModelValueChanged.current = false;
        }, [focusedOptionIndex, overlayVisible]);

        useUnmountEffect(() => {
            ZIndex.clear(overlayRef.current);
        });

        return {
            state,
            // refs
            searchValue: toValue(searchValue),
            // element refs
            focusInputRef,
            overlayRef,
            filterInputRef,
            firstHiddenFocusableElementOnOverlayRef,
            lastHiddenFocusableElementOnOverlayRef,
            virtualScrollerRef,
            listRef,
            // methods
            getOptionIndex,
            getOptionLabel,
            getOptionValue,
            getOptionRenderKey,
            isOptionDisabled,
            isOptionGroup,
            getOptionGroupLabel,
            getOptionGroupChildren,
            getAriaPosInset,
            show,
            hide,
            onFocus,
            onBlur,
            onKeyDown,
            onContainerClick,
            onFirstHiddenFocus,
            onLastHiddenFocus,
            onOptionSelect,
            onOptionMouseMove,
            onOptionSelectRange,
            onFilterChange,
            onFilterKeyDown,
            onFilterBlur,
            onFilterUpdated,
            onOverlayClick,
            onOverlayKeyDown,
            onOverlayEnter,
            onOverlayEntered,
            onOverlayExit,
            onOverlayExited,
            alignOverlay,
            getLabelByValue,
            getSelectedItemsLabel,
            onToggleAll,
            removeOption,
            clearFilter,
            hasFocusableElements,
            isOptionMatched,
            isValidOption,
            isValidSelectedOption,
            isEquals,
            isSelected,
            findFirstOptionIndex,
            findLastOptionIndex,
            findNextOptionIndex,
            findPrevOptionIndex,
            findSelectedOptionIndex,
            findFirstSelectedOptionIndex,
            findLastSelectedOptionIndex,
            findNextSelectedOptionIndex,
            findPrevSelectedOptionIndex,
            findNearestSelectedOptionIndex,
            findFirstFocusedOptionIndex,
            findLastFocusedOptionIndex,
            searchOptions,
            changeFocusedOptionIndex,
            scrollInView,
            autoUpdateModel,
            updateModel,
            // computed
            visibleOptions,
            label,
            chipSelectedItems,
            allSelected,
            hasSelectedOption,
            equalityKey,
            searchFields,
            maxSelectionLimitReached,
            filterResultMessageText,
            filterMessageText,
            emptyFilterMessageText,
            emptyMessageText,
            selectionMessageText,
            emptySelectionMessageText,
            selectedMessageText,
            focusedOptionId,
            ariaSetSize,
            toggleAllAriaLabel,
            listAriaLabel,
            virtualScrollerDisabled,
            hasFluid
        };
    },
    defaultProps,
    style
);
