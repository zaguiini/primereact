import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/autocomplete';
import { equals, focus, isNotEmpty, resolveFieldData, alignOverlay as utils_alignOverlay } from '@primeuix/utils';
import { defaultProps } from './AutoComplete.props';

export const useAutoComplete = withComponent(
    ({ elementRef, id, props, parent, $primereact }) => {
        // states
        const [clicked, setClicked] = React.useState(false);
        const [focused, setFocused] = React.useState(false);
        const [focusedOptionIndex, setFocusedOptionIndex] = React.useState(-1);
        const [focusedMultipleOptionIndex, setFocusedMultipleOptionIndex] = React.useState(-1);
        const [overlayVisible, setOverlayVisible] = React.useState(false);
        const [searching, setSearching] = React.useState(false);
        const state = {
            clicked,
            focused,
            focusedOptionIndex,
            focusedMultipleOptionIndex,
            overlayVisible,
            searching
        };

        // refs
        const searchTimeout = React.useRef(null);
        const dirty = React.useRef(false);

        // element refs
        const focusInputRef = React.useRef(null);
        const multiContainerRef = React.useRef(null);
        const dropdownButtonRef = React.useRef(null);
        const overlayRef = React.useRef(null);
        const virtualScrollerRef = React.useRef(null);
        const listRef = React.useRef(null);

        // bindings
        const [bindOverlayListener, unbindOverlayListener] = useOverlayListener({
            target: elementRef,
            overlay: overlayRef,
            listener: (event, { type, valid }) => {
                if (valid) {
                    type === 'outside' ? !isInputClicked(event) && !isDropdownClicked(event) && hide() : hide();
                }
            },
            when: overlayVisible
        });

        const [bindLabelClickListener, unbindLabelClickListener] = useEventListener({
            target: `label[for="${props.inputId}"]`,
            type: 'click',
            listener: () => {
                focus(props.multiple ? focusInputRef.current : focusInputRef.current.$el);
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
            return option; // TODO: The 'optionValue' properties can be added.
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
            dirty.current = true;
            setOverlayVisible(true);
            setFocusedOptionIndex((prevFocusedOptionIndex) => (prevFocusedOptionIndex !== -1 ? prevFocusedOptionIndex : props.autoOptionFocus ? findFirstFocusedOptionIndex() : -1));
            isFocus && focus(props.multiple ? focusInputRef.current : focusInputRef.current.$el);
        };
        const hide = (isFocus) => {
            const _hide = () => {
                props.onBeforeHide?.();
                dirty.current = isFocus;
                setOverlayVisible(false);
                setClicked(false);
                setFocusedOptionIndex(-1);

                isFocus && focus(props.multiple ? focusInputRef.current : focusInputRef.current.$el);
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

            if (!dirty.current && props.completeOnFocus) {
                search(event, event.target.value, 'focus');
            }

            dirty.current = true;
            setFocused(true);

            if (overlayVisible) {
                setFocusedOptionIndex((prevFocusedOptionIndex) => (prevFocusedOptionIndex !== -1 ? prevFocusedOptionIndex : overlayVisible && props.autoOptionFocus ? findFirstFocusedOptionIndex() : -1));
                scrollInView(focusedOptionIndex);
            }

            props.onFocus?.(event);
        };
        const onBlur = (event) => {
            dirty.current = false;
            setFocused(false);
            setFocusedOptionIndex(-1);
            props.onBlur?.(event);
        };
        const onKeyDown = (event) => {
            if (props.disabled) {
                event.preventDefault();

                return;
            }

            switch (event.code) {
                case 'ArrowDown':
                    onArrowDownKey(event);
                    break;

                case 'ArrowUp':
                    onArrowUpKey(event);
                    break;

                case 'ArrowLeft':
                    onArrowLeftKey(event);
                    break;

                case 'ArrowRight':
                    onArrowRightKey(event);
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
                    onEnterKey(event);
                    break;

                case 'Escape':
                    onEscapeKey(event);
                    break;

                case 'Tab':
                    onTabKey(event);
                    break;

                case 'Backspace':
                    onBackspaceKey(event);
                    break;

                case 'ShiftLeft':
                case 'ShiftRight':
                    //NOOP
                    break;

                default:
                    break;
            }

            setClicked(false);
        };
        const onInput = (event) => {
            if (props.typeahead) {
                if (searchTimeout.current) {
                    clearTimeout(searchTimeout.current);
                }

                let query = event.target.value;

                if (!props.multiple) {
                    updateModel(event, query);
                }

                if (query.length === 0) {
                    hide();
                    props.onClear?.(event);
                } else {
                    if (query.length >= props.minLength) {
                        setFocusedOptionIndex(-1);

                        searchTimeout.current = setTimeout(() => {
                            search(event, query, 'input');
                        }, props.delay);
                    } else {
                        hide();
                    }
                }
            }
        };
        const onChange = (event) => {
            if (props.forceSelection) {
                let valid = false;

                // when forceSelection is on, prevent called twice onOptionSelect()
                if (visibleOptions && !props.multiple) {
                    let value = props.multiple ? focusInputRef.current.value : focusInputRef.current.$el.value;
                    const matchedValue = visibleOptions.find((option) => isOptionMatched(option, value || ''));

                    if (matchedValue !== undefined) {
                        valid = true;
                        !isSelected(matchedValue) && onOptionSelect(event, matchedValue);
                    }
                }

                if (!valid) {
                    if (props.multiple) focusInputRef.current.value = '';
                    else focusInputRef.current.$el.value = '';
                    props.onClear?.(event);
                    !props.multiple && updateModel(event, null);
                }
            }
        };
        const onMultipleContainerFocus = () => {
            if (props.disabled) {
                // For ScreenReaders
                return;
            }

            setFocused(true);
        };
        const onMultipleContainerBlur = () => {
            setFocusedMultipleOptionIndex(-1);
            setFocused(false);
        };
        const onMultipleContainerKeyDown = (event) => {
            if (props.disabled) {
                event.preventDefault();

                return;
            }

            switch (event.code) {
                case 'ArrowLeft':
                    onArrowLeftKeyOnMultiple(event);
                    break;

                case 'ArrowRight':
                    onArrowRightKeyOnMultiple(event);
                    break;

                case 'Backspace':
                    onBackspaceKeyOnMultiple(event);
                    break;

                default:
                    break;
            }
        };
        const onContainerClick = (event) => {
            setClicked(true);

            if (props.disabled || searching || props.loading || isInputClicked(event) || isDropdownClicked(event)) {
                return;
            }

            if (!overlayRef.current?.contains(event.target)) {
                focus(props.multiple ? focusInputRef.current : focusInputRef.current.$el);
            }
        };
        const onDropdownClick = (event) => {
            let query = undefined;

            if (overlayVisible) {
                hide(true);
            } else {
                let target = props.multiple ? focusInputRef.current : focusInputRef.current.$el;

                focus(target);
                query = target.value;

                if (props.dropdownMode === 'blank') search(event, '', 'dropdown');
                else if (props.dropdownMode === 'current') search(event, query, 'dropdown');
            }

            props.onDropdownClick?.({ originalEvent: event, query });
        };
        const onOptionSelect = (event, option, isHide = true) => {
            const value = getOptionValue(option);

            if (props.multiple) {
                focusInputRef.current.value = '';

                if (!isSelected(option)) {
                    updateModel(event, [...(props.value || []), value]);
                }
            } else {
                updateModel(event, value);
            }

            props.onOptionSelect?.({ originalEvent: event, value: option });

            isHide && hide(true);
        };
        const onOptionMouseMove = (event, index) => {
            if (props.focusOnHover) {
                changeFocusedOptionIndex(event, index);
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
                return;
            }

            const optionIndex = focusedOptionIndex !== -1 ? findNextOptionIndex(focusedOptionIndex) : clicked ? findFirstOptionIndex() : findFirstFocusedOptionIndex();

            changeFocusedOptionIndex(event, optionIndex);

            event.preventDefault();
        };
        const onArrowUpKey = (event) => {
            if (!overlayVisible) {
                return;
            }

            if (event.altKey) {
                if (focusedOptionIndex !== -1) {
                    onOptionSelect(event, visibleOptions[focusedOptionIndex]);
                }

                overlayVisible && hide();
                event.preventDefault();
            } else {
                const optionIndex = focusedOptionIndex !== -1 ? findPrevOptionIndex(focusedOptionIndex) : clicked ? findLastOptionIndex() : findLastFocusedOptionIndex();

                changeFocusedOptionIndex(event, optionIndex);

                event.preventDefault();
            }
        };
        const onArrowLeftKey = (event) => {
            const target = event.currentTarget;

            setFocusedOptionIndex(-1);

            if (props.multiple) {
                if (isEmpty(target.value) && hasSelectedOption) {
                    focus(multiContainerRef.current);
                    setFocusedMultipleOptionIndex(props.value.length - 1);
                } else {
                    event.stopPropagation(); // To prevent onArrowLeftKeyOnMultiple method
                }
            }
        };
        const onArrowRightKey = (event) => {
            setFocusedOptionIndex(-1);

            props.multiple && event.stopPropagation(); // To prevent onArrowRightKeyOnMultiple method
        };
        const onHomeKey = (event) => {
            const { currentTarget } = event;
            const len = currentTarget.value.length;

            currentTarget.setSelectionRange(0, event.shiftKey ? len : 0);
            setFocusedOptionIndex(-1);

            event.preventDefault();
        };
        const onEndKey = (event) => {
            const { currentTarget } = event;
            const len = currentTarget.value.length;

            currentTarget.setSelectionRange(event.shiftKey ? 0 : len, len);
            setFocusedOptionIndex(-1);

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
            if (!props.typeahead) {
                if (props.multiple) {
                    updateModel(event, [...(props.value || []), event.target.value]);
                    focusInputRef.current.value = '';
                }
            } else {
                if (!overlayVisible) {
                    setFocusedOptionIndex(-1); // reset
                    onArrowDownKey(event);
                } else {
                    if (focusedOptionIndex !== -1) {
                        onOptionSelect(event, visibleOptions[focusedOptionIndex]);
                    }

                    hide();
                }
            }
        };
        const onEscapeKey = (event) => {
            overlayVisible && hide(true);
            event.preventDefault();
        };
        const onTabKey = (event) => {
            if (focusedOptionIndex !== -1) {
                onOptionSelect(event, visibleOptions[focusedOptionIndex]);
            }

            overlayVisible && hide();
        };
        const onBackspaceKey = (event) => {
            if (props.multiple) {
                if (isNotEmpty(props.value) && !focusInputRef.current.value) {
                    const removedValue = props.value[props.value.length - 1];
                    const newValue = props.value.slice(0, -1);

                    updateModel(event, newValue);
                    props.onOptionUnselect?.({ originalEvent: event, value: removedValue });
                }

                event.stopPropagation(); // To prevent onBackspaceKeyOnMultiple method
            }
        };
        const onArrowLeftKeyOnMultiple = () => {
            setFocusedMultipleOptionIndex((prevFocusedMultipleOptionIndex) => (prevFocusedMultipleOptionIndex < 1 ? 0 : prevFocusedMultipleOptionIndex - 1));
        };
        const onArrowRightKeyOnMultiple = () => {
            const newFocusedMultipleOptionIndex = focusedMultipleOptionIndex + 1;
            setFocusedMultipleOptionIndex(newFocusedMultipleOptionIndex);

            if (newFocusedMultipleOptionIndex > props.value.length - 1) {
                setFocusedMultipleOptionIndex(-1);
                focus(focusInputRef.current);
            }
        };
        const onBackspaceKeyOnMultiple = (event) => {
            if (focusedMultipleOptionIndex !== -1) {
                removeOption(event, focusedMultipleOptionIndex);
            }
        };
        const onOverlayEnter = () => {
            ZIndex.set('overlay', overlayRef.current, $primereact.config.zIndex.overlay);

            addStyle(overlayRef.current, { position: 'absolute', top: '0', left: '0' });
            alignOverlay();
            scrollInView();
        };
        const onOverlayEntered = () => {
            bindOverlayListener();

            props.onShow?.();
        };
        const onOverlayExit = () => {
            unbindOverlayListener();

            props.onHide?.();
        };
        const onOverlayExited = () => {
            ZIndex.clear(overlayRef.current);
        };
        const alignOverlay = () => {
            const target = props.multiple ? multiContainerRef.current : focusInputRef.current.$el;

            utils_alignOverlay(overlayRef.current, target, props.appendTo || $primereact.config.appendTo);
        };
        const isInputClicked = (event) => {
            if (props.multiple) return event.target === multiContainerRef.current || multiContainerRef.current.contains(event.target);
            else return event.target === focusInputRef.current.$el;
        };
        const isDropdownClicked = (event) => {
            return dropdownButtonRef.current ? event.target === dropdownButtonRef.current || dropdownButtonRef.current.contains(event.target) : false;
        };
        const isOptionMatched = (option, value) => {
            return isValidOption(option) && getOptionLabel(option)?.toLocaleLowerCase(props.searchLocale) === value.toLocaleLowerCase(props.searchLocale);
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

            return props.multiple ? (props.value || []).some((value) => isEquals(value, optionValue)) : isEquals(props.value, getOptionValue(option));
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
            return hasSelectedOption ? visibleOptions.findIndex((option) => isValidSelectedOption(option)) : -1;
        };
        const findFirstFocusedOptionIndex = () => {
            const selectedIndex = findSelectedOptionIndex();

            return selectedIndex < 0 ? findFirstOptionIndex() : selectedIndex;
        };
        const findLastFocusedOptionIndex = () => {
            const selectedIndex = findSelectedOptionIndex();

            return selectedIndex < 0 ? findLastOptionIndex() : selectedIndex;
        };
        const search = (event, query, source) => {
            //allow empty string but not undefined or null
            if (query === undefined || query === null) {
                return;
            }

            //do not search blank values on input change
            if (source === 'input' && query.trim().length === 0) {
                return;
            }

            setSearching(true);
            props.completeMethod?.({ originalEvent: event, query });
        };
        const removeOption = (event, index) => {
            const removedOption = props.value[index];
            const value = props.value.filter((_, i) => i !== index).map((option) => getOptionValue(option));

            updateModel(event, value);
            props.onOptionUnselect?.({ originalEvent: event, value: removedOption });
            dirty.current = true;
            focus(props.multiple ? focusInputRef.current : focusInputRef.current.$el);
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
            setTimeout(() => {
                const id = index !== -1 ? `${id}_${index}` : focusedOptionId;
                const element = findSingle(listRef.current, `li[id="${id}"]`);

                if (element) {
                    element.scrollIntoView?.({ block: 'nearest', inline: 'start' });
                } else if (!virtualScrollerDisabled) {
                    virtualScrollerRef.current?.scrollToIndex(index !== -1 ? index : focusedOptionIndex);
                }
            }, 1);
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
            return props.optionGroupLabel ? flatOptions(props.suggestions) : props.suggestions || [];
        }, [props.suggestions, props.optionGroupLabel]);
        const inputValue = React.useMemo(() => {
            if (isNotEmpty(props.value)) {
                if (typeof props.value === 'object') {
                    const label = getOptionLabel(props.modelValue);

                    return label != null ? label : props.value;
                } else {
                    return props.value;
                }
            } else {
                return '';
            }
        }, [props.value, props.optionLabel]);
        const hasSelectedOption = isNotEmpty(props.value);
        const equalityKey = props.dataKey; // TODO: The 'optionValue' properties can be added.
        const searchResultMessageText = isNotEmpty(visibleOptions) && overlayVisible ? searchMessageText.replaceAll('{0}', visibleOptions.length) : emptySearchMessageText;
        const searchMessageText = props.searchMessage || $primereact.config.locale.searchMessage || '';
        const emptySearchMessageText = props.emptySearchMessage || $primereact.config.locale.emptySearchMessage || '';
        const selectionMessageText = props.selectionMessage || $primereact.config.locale.selectionMessage || '';
        const emptySelectionMessageText = props.emptySelectionMessage || $primereact.config.locale.emptySelectionMessage || '';
        const selectedMessageText = hasSelectedOption ? selectionMessageText.replaceAll('{0}', props.multiple ? props.value.length : '1') : emptySelectionMessageText;
        const listAriaLabel = $primereact.config.locale.aria ? $primereact.config.locale.aria.listLabel : undefined;
        const focusedOptionId = focusedOptionIndex !== -1 ? `${id}_${focusedOptionIndex}` : null;
        const focusedMultipleOptionId = focusedMultipleOptionIndex !== -1 ? `${id}_multiple_option_${focusedMultipleOptionIndex}` : null;
        const ariaSetSize = visibleOptions.filter((option) => !isOptionGroup(option)).length;
        const virtualScrollerDisabled = !props.virtualScrollerOptions;
        const hasFluid = isEmpty(props.fluid) ? !!parent.$pc.Fluid : props.fluid;

        // effects
        useMountEffect(() => {
            autoUpdateModel();
            bindLabelClickListener();

            return () => unbindLabelClickListener();
        });

        useUpdateEffect(() => {
            if (searching) {
                show();
                setFocusedOptionIndex(overlayVisible && props.autoOptionFocus ? findFirstFocusedOptionIndex() : -1);
                setSearching(false);
            }

            autoUpdateModel();
        }, [props.suggestions]);

        useUpdateEffect(() => {
            if (overlayVisible) {
                // @todo
                scrollInView(focusedOptionIndex);
                alignOverlay();
            }
        }, [focusedOptionIndex, overlayVisible]);

        useUnmountEffect(() => {
            ZIndex.clear(overlayRef.current);
        });

        return {
            state,
            // element refs
            focusInputRef,
            multiContainerRef,
            dropdownButtonRef,
            overlayRef,
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
            onInput,
            onChange,
            onMultipleContainerFocus,
            onMultipleContainerBlur,
            onMultipleContainerKeyDown,
            onContainerClick,
            onDropdownClick,
            onOptionSelect,
            onOptionMouseMove,
            onOverlayClick,
            onOverlayKeyDown,
            onOverlayEnter,
            onOverlayEntered,
            onOverlayExit,
            onOverlayExited,
            isOptionMatched,
            isValidOption,
            isValidSelectedOption,
            isEquals,
            isSelected,
            findSelectedOptionIndex,
            search,
            removeOption,
            changeFocusedOptionIndex,
            scrollInView,
            autoUpdateModel,
            updateModel,
            // computed
            visibleOptions,
            inputValue,
            hasSelectedOption,
            equalityKey,
            searchResultMessageText,
            searchMessageText,
            emptySearchMessageText,
            selectionMessageText,
            emptySelectionMessageText,
            selectedMessageText,
            listAriaLabel,
            focusedOptionId,
            focusedMultipleOptionId,
            ariaSetSize,
            virtualScrollerDisabled,
            hasFluid
        };
    },
    defaultProps,
    style
);
