import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/listbox';
import { equals, getFirstFocusableElement, isElement, isPrintableCharacter } from '@primeuix/utils';
import * as React from 'react';
import { defaultProps } from './Listbox.props';

export const useListbox = withComponent(
    ({ elementRef, id, props, parent, $primereact }) => {
        // state
        const [focused, setFocused] = React.useState(false);
        const [focusedOptionIndex, setFocusedOptionIndex] = React.useState(-1);
        const [filterValue, setFilterValue] = React.useState('');
        const state = {
            focused,
            focusedOptionIndex,
            filterValue
        };

        // refs
        const optionTouched = React.useRef(false);
        const startRangeIndex = React.useRef(-1);
        const searchTimeout = React.useRef(null);
        const searchValue = React.useRef('');

        // element refs
        const firstHiddenFocusableElementRef = React.useRef(null);
        const lastHiddenFocusableElementRef = React.useRef(null);
        const virtualScrollerRef = React.useRef(null);
        const listRef = React.useRef(null);

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
            return (props.dataKey ? resolveFieldData(option, props.dataKey) : getOptionLabel(option)) + '_' + index;
        };
        const isOptionDisabled = (option) => {
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
        const onFirstHiddenFocus = () => {
            focus(listRef.current);

            const firstFocusableEl = getFirstFocusableElement(elementRef.current, ':not([data-p-hidden-focusable="true"])');

            lastHiddenFocusableElementRef.current.tabIndex = isElement(firstFocusableEl) ? undefined : -1;
            firstHiddenFocusableElementRef.current.tabIndex = -1;
        };
        const onLastHiddenFocus = (event) => {
            const relatedTarget = event.relatedTarget;

            if (relatedTarget === listRef.current) {
                const firstFocusableEl = getFirstFocusableElement(elementRef.current, ':not([data-p-hidden-focusable="true"])');

                focus(firstFocusableEl);
                firstHiddenFocusableElementRef.current.tabIndex = undefined;
            } else {
                focus(firstHiddenFocusableElementRef.current);
            }

            lastHiddenFocusableElementRef.current.tabIndex = -1;
        };
        const onFocusOut = (event) => {
            if (!elementRef.current.contains(event.relatedTarget) && lastHiddenFocusableElementRef.current && firstHiddenFocusableElementRef.current) {
                lastHiddenFocusableElementRef.current.tabIndex = firstHiddenFocusableElementRef.current.tabIndex = undefined;
            }
        };
        const onListFocus = (event) => {
            setFocused(true);
            setFocusedOptionIndex((prevFocusedOptionIndex) => (prevFocusedOptionIndex !== -1 ? prevFocusedOptionIndex : props.autoOptionFocus ? findFirstFocusedOptionIndex() : findSelectedOptionIndex()));
            autoUpdateModel();
            props.onFocus?.(event);
        };
        const onListBlur = (event) => {
            setFocused(false);
            setFocusedOptionIndex(-1);
            startRangeIndex.current = -1;
            searchValue.current = '';
            props.onBlur?.(event);
        };
        const onListKeyDown = (event) => {
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
                    onSpaceKey(event);
                    break;

                case 'Tab':
                    //NOOP
                    break;

                case 'ShiftLeft':
                case 'ShiftRight':
                    onShiftKey(event);
                    break;

                default:
                    if (props.multiple && event.code === 'KeyA' && metaKey) {
                        const value = visibleOptions.filter(isValidOption).map(getOptionValue);

                        updateModel(event, value);

                        event.preventDefault();
                        break;
                    }

                    if (!metaKey && isPrintableCharacter(event.key)) {
                        searchOptions(event, event.key);
                        event.preventDefault();
                    }

                    break;
            }
        };
        const onOptionSelect = (event, option, index = -1) => {
            if (props.disabled || isOptionDisabled(option)) {
                return;
            }

            props.multiple ? onOptionSelectMultiple(event, option) : onOptionSelectSingle(event, option);
            optionTouched.current = false;
            index !== -1 && setFocusedOptionIndex(index);
        };
        const onOptionMouseDown = (event, index) => {
            changeFocusedOptionIndex(event, index);
        };
        const onOptionMouseMove = (event, index) => {
            if (props.focusOnHover && focused) {
                changeFocusedOptionIndex(event, index);
            }
        };
        const onOptionTouchEnd = () => {
            if (props.disabled) {
                return;
            }

            optionTouched.current = true;
        };
        const onOptionDblClick = (event, option) => {
            props.onOptionDoubleClick?.({
                originalEvent: event,
                value: option
            });
        };
        const onOptionSelectSingle = (event, option) => {
            let selected = isSelected(option);
            let valueChanged = false;
            let value = null;
            let metaSelection = optionTouched.current ? false : props.metaKeySelection;

            if (metaSelection) {
                let metaKey = event && (event.metaKey || event.ctrlKey);

                if (selected) {
                    if (metaKey) {
                        value = null;
                        valueChanged = true;
                    }
                } else {
                    value = getOptionValue(option);
                    valueChanged = true;
                }
            } else {
                value = selected ? null : getOptionValue(option);
                valueChanged = true;
            }

            if (valueChanged) {
                updateModel(event, value);
            }
        };
        const onOptionSelectMultiple = (event, option) => {
            let selected = isSelected(option);
            let value = null;
            let metaSelection = optionTouched.current ? false : props.metaKeySelection;

            if (metaSelection) {
                let metaKey = event.metaKey || event.ctrlKey;

                if (selected) {
                    value = metaKey ? removeOption(option) : [getOptionValue(option)];
                } else {
                    value = metaKey ? props.value || [] : [];
                    value = [...value, getOptionValue(option)];
                }
            } else {
                value = selected ? removeOption(option) : [...(props.value || []), getOptionValue(option)];
            }

            updateModel(event, value);
        };
        const onOptionSelectRange = (event, start = -1, end = -1) => {
            start === -1 && (start = findNearestSelectedOptionIndex(end, true));
            end === -1 && (end = findNearestSelectedOptionIndex(start));

            if (start !== -1 && end !== -1) {
                const rangeStart = Math.min(start, end);
                const rangeEnd = Math.max(start, end);
                const value = this.visibleOptions
                    .slice(rangeStart, rangeEnd + 1)
                    .filter((option) => isValidOption(option))
                    .map((option) => getOptionValue(option));

                updateModel(event, value);
            }
        };
        const onFilterChange = (event) => {
            props.onFilter?.({ originalEvent: event, value: event.target.value });
            setFocusedOptionIndex(-1);
            startRangeIndex.current = -1;
        };
        const onFilterBlur = () => {
            setFocusedOptionIndex(-1);
            startRangeIndex.current = -1;
        };
        const onFilterKeyDown = (event) => {
            switch (event.code) {
                case 'ArrowDown':
                    onArrowDownKey(event);
                    break;

                case 'ArrowUp':
                    onArrowUpKey(event);
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

                case 'ShiftLeft':
                case 'ShiftRight':
                    onShiftKey(event);
                    break;

                default:
                    break;
            }
        };
        const onArrowDownKey = (event) => {
            const optionIndex = focusedOptionIndex !== -1 ? findNextOptionIndex(focusedOptionIndex) : findFirstFocusedOptionIndex();

            if (props.multiple && event.shiftKey) {
                onOptionSelectRange(event, startRangeIndex.current, optionIndex);
            }

            changeFocusedOptionIndex(event, optionIndex);
            event.preventDefault();
        };
        const onArrowUpKey = (event) => {
            const optionIndex = focusedOptionIndex !== -1 ? findPrevOptionIndex(focusedOptionIndex) : findLastFocusedOptionIndex();

            if (props.multiple && event.shiftKey) {
                onOptionSelectRange(event, optionIndex, startRangeIndex.current);
            }

            changeFocusedOptionIndex(event, optionIndex);
            event.preventDefault();
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

                if (props.multiple && event.shiftKey && metaKey) {
                    onOptionSelectRange(event, optionIndex, startRangeIndex.current);
                }

                changeFocusedOptionIndex(event, optionIndex);
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

                if (props.multiple && event.shiftKey && metaKey) {
                    onOptionSelectRange(event, startRangeIndex, optionIndex);
                }

                changeFocusedOptionIndex(event, optionIndex);
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
            if (focusedOptionIndex !== -1) {
                if (props.multiple && event.shiftKey) onOptionSelectRange(event, focusedOptionIndex);
                else onOptionSelect(event, visibleOptions[focusedOptionIndex]);
            }
        };
        const onSpaceKey = (event) => {
            event.preventDefault();
            onEnterKey(event);
        };
        const onShiftKey = () => {
            startRangeIndex.current = focusedOptionIndex;
        };
        const isOptionMatched = (option) => {
            return isValidOption(option) && isString(getOptionLabel(option)) && getOptionLabel(option)?.toLocaleLowerCase(props.filterLocale).startsWith(searchValue.current.toLocaleLowerCase(props.filterLocale));
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

            if (props.multiple) return (props.value || []).some((value) => isEquals(value, optionValue));
            else return isEquals(props.value, optionValue);
        };
        const findFirstOptionIndex = () => {
            return visibleOptions.findIndex(isValidOption);
        };
        const findLastOptionIndex = () => {
            return findLastIndex(visibleOptions, isValidOption);
        };
        const findNextOptionIndex = (index) => {
            const matchedOptionIndex = index < visibleOptions.length - 1 ? visibleOptions.slice(index + 1).findIndex(isValidOption) : -1;

            return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
        };
        const findPrevOptionIndex = (index) => {
            const matchedOptionIndex = index > 0 ? findLastIndex(visibleOptions.slice(0, index), isValidOption) : -1;

            return matchedOptionIndex > -1 ? matchedOptionIndex : index;
        };
        const findSelectedOptionIndex = () => {
            if (hasSelectedOption) {
                if (props.multiple) {
                    for (let index = props.value.length - 1; index >= 0; index--) {
                        const value = props.value[index];
                        const matchedOptionIndex = visibleOptions.findIndex((option) => isValidSelectedOption(option) && isEquals(value, getOptionValue(option)));

                        if (matchedOptionIndex > -1) return matchedOptionIndex;
                    }
                } else {
                    return visibleOptions.findIndex((option) => isValidSelectedOption(option));
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
        const searchOptions = (event, char) => {
            searchValue.current = (searchValue.current || '') + char;

            let optionIndex = -1;
            let matched = false;

            if (isNotEmpty(searchValue)) {
                if (focusedOptionIndex !== -1) {
                    optionIndex = visibleOptions.slice(focusedOptionIndex).findIndex(isOptionMatched);
                    optionIndex = optionIndex === -1 ? visibleOptions.slice(0, focusedOptionIndex).findIndex(isOptionMatched) : optionIndex + focusedOptionIndex;
                } else {
                    optionIndex = visibleOptions.findIndex(isOptionMatched);
                }

                if (optionIndex !== -1) {
                    matched = true;
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

            return matched;
        };
        const removeOption = (option) => {
            return props.value.filter((val) => !equals(val, getOptionValue(option), equalityKey));
        };
        const changeFocusedOptionIndex = (event, index) => {
            if (focusedOptionIndex !== index) {
                setFocusedOptionIndex(index);
                scrollInView();

                if (props.selectOnFocus && !props.multiple) {
                    onOptionSelect(event, visibleOptions[index], false);
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
                onOptionSelect(null, visibleOptions[newFocusedOptionIndex]);
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

            return filterValue ? FilterService.filter(options, props.searchFields, filterValue, props.filterMatchMode, props.filterLocale) : options;
        }, []);
        const hasSelectedOption = isNotEmpty(props.value);
        const equalityKey = props.optionValue ? null : props.dataKey;
        const searchFields = props.filterFields || [props.optionLabel];
        const filterResultMessageText = isNotEmpty(visibleOptions) ? filterMessageText.replaceAll('{0}', visibleOptions.length) : emptyFilterMessageText;
        const filterMessageText = props.filterMessage || $primereact.config.locale.searchMessage || '';
        const emptyFilterMessageText = props.emptyFilterMessage || $primereact.config.locale.emptySearchMessage || $primereact.config.locale.emptyFilterMessage || '';
        const emptyMessageText = props.emptyMessage || $primereact.config.locale.emptyMessage || '';
        const selectionMessageText = props.selectionMessage || $primereact.config.locale.selectionMessage || '';
        const emptySelectionMessageText = props.emptySelectionMessage || $primereact.config.locale.emptySelectionMessage || '';
        const selectedMessageText = hasSelectedOption ? selectionMessageText.replaceAll('{0}', props.multiple ? props.value.length : '1') : emptySelectionMessageText;
        const focusedOptionId = focusedOptionIndex !== -1 ? `${id}_${focusedOptionIndex}` : null;
        const ariaSetSize = visibleOptions.filter((option) => !isOptionGroup(option)).length;
        const virtualScrollerDisabled = !props.virtualScrollerOptions;

        // effects

        return {
            state,
            // refs
            searchValue: toValue(searchValue),
            // element refs
            firstHiddenFocusableElementRef,
            lastHiddenFocusableElementRef,
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
            onOptionSelectSingle,
            onOptionSelectMultiple,
            onOptionSelectRange,
            onFilterChange,
            onFilterBlur,
            onFilterKeyDown,
            isOptionMatched,
            isValidOption,
            isValidSelectedOption,
            isEquals,
            isSelected,
            findSelectedOptionIndex,
            searchOptions,
            removeOption,
            changeFocusedOptionIndex,
            scrollInView,
            autoUpdateModel,
            updateModel,
            // computed
            visibleOptions,
            hasSelectedOption,
            equalityKey,
            searchFields,
            filterResultMessageText,
            filterMessageText,
            emptyFilterMessageText,
            emptyMessageText,
            selectionMessageText,
            emptySelectionMessageText,
            selectedMessageText,
            focusedOptionId,
            ariaSetSize,
            virtualScrollerDisabled
        };
    },
    defaultProps,
    style
);
