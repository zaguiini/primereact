import { FilterService } from '@primereact/core/api';
import { withComponent } from '@primereact/core/component';
import { useEventListener, useMountEffect, useOverlayListener, useUnmountEffect, useUpdateEffect } from '@primereact/hooks';
import { style } from '@primereact/styles/select';
import {
    addStyle,
    equals,
    findLastIndex,
    findSingle,
    focus,
    getFirstFocusableElement,
    getFocusableElements,
    getLastFocusableElement,
    isAndroid,
    isEmpty,
    isNotEmpty,
    isPrintableCharacter,
    isString,
    resolveFieldData,
    alignOverlay as utils_alignOverlay,
    ZIndex
} from '@primeuix/utils';
import { OverlayService } from 'primereact/overlayservice';
import { toValue } from 'primereact/utils';
import * as React from 'react';
import { defaultProps } from './Select.props';

export const useSelect = withComponent(
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
        const isModelValueChanged = React.useRef(false);

        // element refs
        const focusInputRef = React.useRef(null);
        const clearIconRef = React.useRef(null);
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
        const show = (isFocus) => {
            props.onBeforeShow?.();
            setOverlayVisible(true);
            setFocusedOptionIndex((prevFocusedOptionIndex) => (prevFocusedOptionIndex !== -1 ? prevFocusedOptionIndex : props.autoOptionFocus ? findFirstFocusedOptionIndex() : props.editable ? -1 : findSelectedOptionIndex()));

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
                setFocusedOptionIndex((prevFocusedOptionIndex) => (prevFocusedOptionIndex !== -1 ? prevFocusedOptionIndex : props.autoOptionFocus ? findFirstFocusedOptionIndex() : props.editable ? -1 : findSelectedOptionIndex()));
                scrollInView(focusedOptionIndex);
            }

            props.onFocus?.(event);
        };
        const onBlur = (event) => {
            setClicked(false);
            setFocused(false);
            setFocusedOptionIndex(-1);
            searchValue.current = '';
            props.onBlur?.(event);
        };
        const onKeyDown = (event) => {
            if (props.disabled || isAndroid()) {
                event.preventDefault();

                return;
            }

            const metaKey = event.metaKey || event.ctrlKey;

            switch (event.code) {
                case 'ArrowDown':
                    onArrowDownKey(event);
                    break;

                case 'ArrowUp':
                    onArrowUpKey(event, props.editable);
                    break;

                case 'ArrowLeft':
                case 'ArrowRight':
                    onArrowLeftKey(event, props.editable);
                    break;

                case 'Home':
                    onHomeKey(event, props.editable);
                    break;

                case 'End':
                    onEndKey(event, props.editable);
                    break;

                case 'PageDown':
                    onPageDownKey(event);
                    break;

                case 'PageUp':
                    onPageUpKey(event);
                    break;

                case 'Space':
                    onSpaceKey(event, props.editable);
                    break;

                case 'Enter':
                case 'NumpadEnter':
                    onEnterKey(event);
                    break;

                case 'Escape':
                    onEscapeKey(event);
                    break;

                case 'Tab':
                    onTabKey(event);
                    break;

                case 'Backspace':
                    onBackspaceKey(event, props.editable);
                    break;

                case 'ShiftLeft':
                case 'ShiftRight':
                    //NOOP
                    break;

                default:
                    if (!metaKey && isPrintableCharacter(event.key)) {
                        !overlayVisible && show();
                        !props.editable && searchOptions(event, event.key);
                    }

                    break;
            }

            setClicked(false);
        };
        const onEditableInput = (event) => {
            const value = event.target.value;

            searchValue.current = '';
            const matched = searchOptions(event, value);

            !matched && setFocusedOptionIndex(-1);

            updateModel(event, value);

            !overlayVisible && isNotEmpty(value) && show();
        };
        const onContainerClick = (event) => {
            if (props.disabled || props.loading) {
                return;
            }

            if (event.target.tagName === 'INPUT' || event.target.getAttribute('data-pc-section') === 'clearicon' || event.target.closest('[data-pc-section="clearicon"]')) {
                return;
            } else if (!overlayRef.current?.contains(event.target)) {
                overlayVisible ? hide(true) : show(true);
            }

            setClicked(true);
        };
        const onClearClick = (event) => {
            updateModel(event, null);
            props.resetFilterOnClear && setFilterValue('');
        };
        const onFirstHiddenFocus = (event) => {
            const focusableEl = event.relatedTarget === focusInputRef.current ? getFirstFocusableElement(overlayRef.current, ':not([data-p-hidden-focusable="true"])') : focusInputRef.current;

            focus(focusableEl);
        };
        const onLastHiddenFocus = (event) => {
            const focusableEl = event.relatedTarget === focusInputRef.current ? getLastFocusableElement(overlayRef.current, ':not([data-p-hidden-focusable="true"])') : focusInputRef.current;

            focus(focusableEl);
        };
        const onOptionSelect = (event, option, isHide = true) => {
            const value = getOptionValue(option);

            updateModel(event, value);
            isHide && hide(true);
        };
        const onOptionMouseMove = (event, index) => {
            if (props.focusOnHover) {
                changeFocusedOptionIndex(event, index);
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
            // Check if the event is part of a text composition process (e.g., for Asian languages).
            // If event.isComposing is true, it means the user is still composing text and the input is not finalized.
            if (event.isComposing) return;

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
                props.editable && changeFocusedOptionIndex(event, findSelectedOptionIndex());
            } else {
                const optionIndex = focusedOptionIndex !== -1 ? findNextOptionIndex(focusedOptionIndex) : clicked ? findFirstOptionIndex() : findFirstFocusedOptionIndex();

                changeFocusedOptionIndex(event, optionIndex);
            }

            event.preventDefault();
        };
        const onArrowUpKey = (event, pressedInInputText = false) => {
            if (event.altKey && !pressedInInputText) {
                if (focusedOptionIndex !== -1) {
                    onOptionSelect(event, visibleOptions[focusedOptionIndex]);
                }

                overlayVisible && hide();
                event.preventDefault();
            } else {
                const optionIndex = focusedOptionIndex !== -1 ? findPrevOptionIndex(focusedOptionIndex) : clicked ? findLastOptionIndex() : findLastFocusedOptionIndex();

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
                changeFocusedOptionIndex(event, findFirstOptionIndex());

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
                changeFocusedOptionIndex(event, findLastOptionIndex());

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
                    onOptionSelect(event, visibleOptions[focusedOptionIndex]);
                }

                hide();
            }

            event.preventDefault();
        };
        const onSpaceKey = (event, pressedInInputText = false) => {
            !pressedInInputText && onEnterKey(event);
        };
        const onEscapeKey = (event) => {
            overlayVisible && hide(true);
            event.preventDefault();
            event.stopPropagation(); //@todo will be changed next versions
        };
        const onTabKey = (event, pressedInInputText = false) => {
            if (!pressedInInputText) {
                if (overlayVisible && hasFocusableElements()) {
                    focus(firstHiddenFocusableElementOnOverlayRef.current);

                    event.preventDefault();
                } else {
                    if (focusedOptionIndex !== -1) {
                        onOptionSelect(event, visibleOptions[focusedOptionIndex]);
                    }

                    overlayVisible && hide(props.filter);
                }
            }
        };
        const onBackspaceKey = (event, pressedInInputText = false) => {
            if (pressedInInputText) {
                !overlayVisible && show();
            }
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
        const hasFocusableElements = () => {
            return getFocusableElements(overlayRef.current, ':not([data-p-hidden-focusable="true"])').length > 0;
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
        const equalityKey = React.useMemo(() => {
            // @todo
            return props.optionValue ? null : props.dataKey;
        }, [props.dataKey, props.optionValue]);
        const isSelected = (option) => {
            return equals(props.value, getOptionValue(option), equalityKey);
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
            return hasSelectedOption ? visibleOptions.findIndex(isValidSelectedOption) : -1;
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
        const changeFocusedOptionIndex = (event, index) => {
            if (focusedOptionIndex !== index) {
                setFocusedOptionIndex(index);
                scrollInView();

                if (props.selectOnFocus) {
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
        const searchFields = React.useMemo(() => {
            return props.filterFields || [props.optionLabel];
        }, [props.filterFields, props.optionLabel]);
        const visibleOptions = React.useMemo(() => {
            const options = props.optionGroupLabel ? flatOptions(props.options) : props.options || [];

            if (filterValue) {
                const filteredOptions = FilterService.filter(options, searchFields, filterValue, props.filterMatchMode, props.filterLocale);

                if (props.optionGroupLabel) {
                    const optionGroups = options || [];
                    const filtered = [];

                    optionGroups.forEach((group) => {
                        const groupChildren = getOptionGroupChildren(group);
                        const filteredItems = groupChildren.filter((item) => filteredOptions.includes(item));

                        if (filteredItems.length > 0) filtered.push({ ...group, [props.optionGroupChildren]: [...filteredItems] });
                    });

                    return flatOptions(filtered);
                }

                return filteredOptions;
            }

            return options;
        }, [props.optionGroupLabel, props.optionGroupChildren, searchFields, props.filterMatchMode, props.filterLocale, props.options, filterValue]);
        const hasSelectedOption = React.useMemo(() => {
            return isNotEmpty(props.value);
        }, [props.value]);
        const selectedOption = React.useMemo(() => {
            // @todo: NEW
            return visibleOptions[findSelectedOptionIndex()];
        }, [props.value]);
        const label = React.useMemo(() => {
            return selectedOption ? getOptionLabel(selectedOption) : props.placeholder || 'p-emptylabel';
        }, [props.placeholder, props.value]);
        const editableInputValue = React.useMemo(() => {
            return selectedOption ? getOptionLabel(selectedOption) : props.value || '';
        }, [props.value]);

        const filterMessageText = React.useMemo(() => {
            return props.filterMessage || $primereact.config.locale?.searchMessage || '';
        }, []);
        const filterResultMessageText = React.useMemo(() => {
            return isNotEmpty(visibleOptions) ? filterMessageText.replaceAll('{0}', visibleOptions.length) : props.emptyFilterMessageText;
        }, []);
        const emptyFilterMessageText = React.useMemo(() => {
            return props.emptyFilterMessage || $primereact.config.locale?.emptySearchMessage || $primereact.config.locale?.emptyFilterMessage || '';
        }, []);
        const emptyMessageText = React.useMemo(() => {
            return props.emptyMessage || $primereact.config.locale?.emptyMessage || '';
        }, []);
        const selectionMessageText = React.useMemo(() => {
            return props.selectionMessage || $primereact.config.locale?.selectionMessage || '';
        }, []);
        const emptySelectionMessageText = React.useMemo(() => {
            return props.emptySelectionMessage || $primereact.config.locale?.emptySelectionMessage || '';
        }, []);
        const selectedMessageText = React.useMemo(() => {
            return hasSelectedOption ? selectionMessageText.replaceAll('{0}', '1') : props.emptySelectionMessageText;
        }, []);
        const focusedOptionId = React.useMemo(() => {
            return focusedOptionIndex !== -1 ? `${id}_${focusedOptionIndex}` : null;
        }, [id, focusedOptionIndex]);
        const ariaSetSize = React.useMemo(() => {
            return visibleOptions.filter((option) => !isOptionGroup(option)).length;
        }, []);
        const isClearIconVisible = React.useMemo(() => {
            return props.showClear && props.value != null && isNotEmpty(props.options);
        }, []);
        const virtualScrollerDisabled = React.useMemo(() => {
            return !props.virtualScrollerOptions;
        }, []);
        const hasFluid = React.useMemo(() => {
            return isEmpty(props.fluid) ? !!parent.$pc.Fluid : props.fluid;
        }, []);

        // effects
        useMountEffect(() => {
            bindLabelClickListener();

            return () => unbindLabelClickListener();
        });

        useUpdateEffect(() => {
            isModelValueChanged.current = true;
        }, [props.value]);

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
            elementRef,
            focusInputRef,
            clearIconRef,
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
            onEditableInput,
            onContainerClick,
            onClearClick,
            onFirstHiddenFocus,
            onLastHiddenFocus,
            onOptionSelect,
            onOptionMouseMove,
            onFilterChange,
            onFilterKeyDown,
            onFilterBlur,
            onOverlayClick,
            onOverlayKeyDown,
            onOverlayEnter,
            onOverlayEntered,
            onOverlayExit,
            onOverlayExited,
            hasFocusableElements,
            isOptionMatched,
            isValidOption,
            isValidSelectedOption,
            isSelected,
            findSelectedOptionIndex,
            searchOptions,
            changeFocusedOptionIndex,
            scrollInView,
            autoUpdateModel,
            updateModel,
            // computed
            visibleOptions,
            hasSelectedOption,
            selectedOption,
            label,
            editableInputValue,
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
            isClearIconVisible,
            virtualScrollerDisabled,
            hasFluid
        };
    },
    defaultProps,
    style
);
