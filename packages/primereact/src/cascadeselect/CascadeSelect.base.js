import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/cascadeselect';
import { isNotEmpty } from '@primeuix/utils';
import { defaultProps } from './CascadeSelect.props';

export const useCascadeSelect = withComponent(
    ({ elementRef, id, props, parent, $primereact }) => {
        // state
        const [clicked, setClicked] = React.useState(false);
        const [focused, setFocused] = React.useState(false);
        const [focusedOptionInfo, setFocusedOptionInfo] = React.useState({ index: -1, level: 0, parentKey: '' });
        const [activeOptionPath, setActiveOptionPath] = React.useState([]);
        const [overlayVisible, setOverlayVisible] = React.useState(false);
        const [dirty, setDirty] = React.useState(false);
        const state = {
            clicked,
            focused,
            focusedOptionInfo,
            activeOptionPath,
            overlayVisible,
            dirty
        };

        // refs
        const searchValue = React.useRef('');
        const searchTimeout = React.useRef(null);

        // element refs
        const focusInputRef = React.useRef(null);
        const overlayRef = React.useRef(null);
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
        const getOptionLabel = (option) => {
            return props.optionLabel ? resolveFieldData(option, props.optionLabel) : option;
        };
        const getOptionValue = (option) => {
            return this.optionValue ? resolveFieldData(option, this.optionValue) : option;
        };
        const isOptionDisabled = (option) => {
            return this.optionDisabled ? resolveFieldData(option, this.optionDisabled) : false;
        };
        const getOptionGroupLabel = (optionGroup) => {
            return this.optionGroupLabel ? resolveFieldData(optionGroup, this.optionGroupLabel) : null;
        };
        const getOptionGroupChildren = (optionGroup, level) => {
            return isString(this.optionGroupChildren) ? resolveFieldData(optionGroup, this.optionGroupChildren) : resolveFieldData(optionGroup, this.optionGroupChildren[level]);
        };
        const isOptionGroup = (option, level) => {
            return Object.prototype.hasOwnProperty.call(option, this.optionGroupChildren[level]);
        };
        const getProccessedOptionLabel = (processedOption = {}) => {
            const grouped = this.isProccessedOptionGroup(processedOption);

            return grouped ? this.getOptionGroupLabel(processedOption.option, processedOption.level) : this.getOptionLabel(processedOption.option);
        };
        const isProccessedOptionGroup = (processedOption) => {
            return isNotEmpty(processedOption?.children);
        };
        const show = (isFocus) => {
            this.$emit('before-show');
            this.overlayVisible = true;
            this.activeOptionPath = this.hasSelectedOption ? this.findOptionPathByValue(this.modelValue) : this.activeOptionPath;

            if (this.hasSelectedOption && isNotEmpty(this.activeOptionPath)) {
                const processedOption = this.activeOptionPath[this.activeOptionPath.length - 1];

                this.focusedOptionInfo = { index: processedOption.index, level: processedOption.level, parentKey: processedOption.parentKey };
            } else {
                this.focusedOptionInfo = { index: this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : this.findSelectedOptionIndex(), level: 0, parentKey: '' };
            }

            isFocus && focus(this.$refs.focusInput);
        };
        const hide = (isFocus) => {
            const _hide = () => {
                this.$emit('before-hide');
                this.overlayVisible = false;
                this.clicked = false;
                this.activeOptionPath = [];
                this.focusedOptionInfo = { index: -1, level: 0, parentKey: '' };

                isFocus && focus(this.$refs.focusInput);
            };

            setTimeout(() => {
                _hide();
            }, 0); // For ScreenReaders
        };
        const onFocus = (event) => {
            if (this.disabled) {
                // For ScreenReaders
                return;
            }

            this.focused = true;
            this.$emit('focus', event);
        };
        const onBlur = (event) => {
            this.focused = false;
            this.focusedOptionInfo = { index: -1, level: 0, parentKey: '' };
            this.searchValue = '';
            this.$emit('blur', event);
        };
        const onKeyDown = (event) => {
            if (this.disabled || this.loading) {
                event.preventDefault();

                return;
            }

            const metaKey = event.metaKey || event.ctrlKey;

            switch (event.code) {
                case 'ArrowDown':
                    this.onArrowDownKey(event);
                    break;

                case 'ArrowUp':
                    this.onArrowUpKey(event);
                    break;

                case 'ArrowLeft':
                    this.onArrowLeftKey(event);
                    break;

                case 'ArrowRight':
                    this.onArrowRightKey(event);
                    break;

                case 'Home':
                    this.onHomeKey(event);
                    break;

                case 'End':
                    this.onEndKey(event);
                    break;

                case 'Space':
                    this.onSpaceKey(event);
                    break;

                case 'Enter':
                case 'NumpadEnter':
                    this.onEnterKey(event);
                    break;

                case 'Escape':
                    this.onEscapeKey(event);
                    break;

                case 'Tab':
                    this.onTabKey(event);
                    break;

                case 'PageDown':
                case 'PageUp':
                case 'Backspace':
                case 'ShiftLeft':
                case 'ShiftRight':
                    //NOOP
                    break;

                default:
                    if (!metaKey && isPrintableCharacter(event.key)) {
                        !this.overlayVisible && this.show();
                        this.searchOptions(event, event.key);
                    }

                    break;
            }

            this.clicked = false;
        };
        const onOptionChange = (event) => {
            const { originalEvent, processedOption, isFocus, isHide } = event;

            if (isEmpty(processedOption)) return;

            const { index, level, parentKey, children } = processedOption;
            const grouped = isNotEmpty(children);
            const root = isEmpty(processedOption.parent);
            const selected = this.isSelected(processedOption);

            if (selected) {
                const { index, key, level, parentKey } = processedOption;

                this.focusedOptionInfo = { index, level, parentKey };
                this.activeOptionPath = this.activeOptionPath.filter((p) => key !== p.key && key.startsWith(p.key));

                this.dirty = !root;
            } else {
                const activeOptionPath = this.activeOptionPath.filter((p) => p.parentKey !== parentKey);

                activeOptionPath.push(processedOption);

                this.focusedOptionInfo = { index, level, parentKey };
                this.activeOptionPath = activeOptionPath;
            }

            grouped ? this.onOptionGroupSelect(originalEvent, processedOption) : this.onOptionSelect(originalEvent, processedOption, isHide);
            isFocus && focus(this.$refs.focusInput);
        };
        const onOptionFocusChange = (event) => {
            if (this.focusOnHover) {
                const { originalEvent, processedOption } = event;
                const { index, level, parentKey } = processedOption;

                this.focusedOptionInfo = { index, level, parentKey };
                this.changeFocusedOptionIndex(originalEvent, index);
            }
        };
        const onOptionSelect = (event, processedOption, isHide = true) => {
            const value = this.getOptionValue(processedOption?.option);

            this.activeOptionPath.forEach((p) => (p.selected = true));
            this.updateModel(event, value);
            isHide && this.hide(true);
        };
        const onOptionGroupSelect = (event, processedOption) => {
            this.dirty = true;
            this.$emit('group-change', { originalEvent: event, value: processedOption.option });
        };
        const onContainerClick = (event) => {
            if (this.disabled || this.loading) {
                return;
            }

            if (!this.overlay || !this.overlay.contains(event.target)) {
                this.overlayVisible ? this.hide() : this.show();
                focus(this.$refs.focusInput);
            }

            this.clicked = true;
            this.$emit('click', event);
        };
        const onOverlayClick = (event) => {
            OverlayEventBus.emit('overlay-click', {
                originalEvent: event,
                target: this.$el
            });
        };
        const onOverlayKeyDown = (event) => {
            switch (event.code) {
                case 'Escape':
                    this.onEscapeKey(event);
                    break;

                default:
                    break;
            }
        };
        const onArrowDownKey = (event) => {
            if (!this.overlayVisible) {
                this.show();
            } else {
                const optionIndex = this.focusedOptionInfo.index !== -1 ? this.findNextOptionIndex(this.focusedOptionInfo.index) : this.clicked ? this.findFirstOptionIndex() : this.findFirstFocusedOptionIndex();

                this.changeFocusedOptionIndex(event, optionIndex);
            }

            event.preventDefault();
        };
        const onArrowUpKey = (event) => {
            if (event.altKey) {
                if (this.focusedOptionInfo.index !== -1) {
                    const processedOption = this.visibleOptions[this.focusedOptionInfo.index];
                    const grouped = this.isProccessedOptionGroup(processedOption);

                    !grouped && this.onOptionChange({ originalEvent: event, processedOption });
                }

                this.overlayVisible && this.hide();
                event.preventDefault();
            } else {
                const optionIndex = this.focusedOptionInfo.index !== -1 ? this.findPrevOptionIndex(this.focusedOptionInfo.index) : this.clicked ? this.findLastOptionIndex() : this.findLastFocusedOptionIndex();

                this.changeFocusedOptionIndex(event, optionIndex);

                !this.overlayVisible && this.show();
                event.preventDefault();
            }
        };
        const onArrowLeftKey = (event) => {
            if (this.overlayVisible) {
                const processedOption = this.visibleOptions[this.focusedOptionInfo.index];
                const parentOption = this.activeOptionPath.find((p) => p.key === processedOption?.parentKey);
                const matched = this.focusedOptionInfo.parentKey === '' || (parentOption && parentOption.key === this.focusedOptionInfo.parentKey);
                const root = isEmpty(processedOption?.parent);

                if (matched) {
                    this.activeOptionPath = this.activeOptionPath.filter((p) => p.parentKey !== this.focusedOptionInfo.parentKey);
                }

                if (!root) {
                    this.focusedOptionInfo = { index: -1, parentKey: parentOption ? parentOption.parentKey : '' };
                    this.searchValue = '';
                    this.onArrowDownKey(event);
                }

                event.preventDefault();
            }
        };
        const onArrowRightKey = (event) => {
            if (this.overlayVisible) {
                const processedOption = this.visibleOptions[this.focusedOptionInfo.index];
                const grouped = this.isProccessedOptionGroup(processedOption);

                if (grouped) {
                    const matched = this.activeOptionPath.some((p) => processedOption?.key === p.key);

                    if (matched) {
                        this.focusedOptionInfo = { index: -1, parentKey: processedOption?.key };
                        this.searchValue = '';
                        this.onArrowDownKey(event);
                    } else {
                        this.onOptionChange({ originalEvent: event, processedOption });
                    }
                }

                event.preventDefault();
            }
        };
        const onHomeKey = (event) => {
            this.changeFocusedOptionIndex(event, this.findFirstOptionIndex());

            !this.overlayVisible && this.show();
            event.preventDefault();
        };
        const onEndKey = (event) => {
            this.changeFocusedOptionIndex(event, this.findLastOptionIndex());

            !this.overlayVisible && this.show();
            event.preventDefault();
        };
        const onEnterKey = (event) => {
            if (!this.overlayVisible) {
                this.focusedOptionInfo.index !== -1; // reset
                this.onArrowDownKey(event);
            } else {
                if (this.focusedOptionInfo.index !== -1) {
                    const processedOption = this.visibleOptions[this.focusedOptionInfo.index];
                    const grouped = this.isProccessedOptionGroup(processedOption);

                    this.onOptionChange({ originalEvent: event, processedOption });
                    !grouped && this.hide();
                }
            }

            event.preventDefault();
        };
        const onSpaceKey = (event) => {
            this.onEnterKey(event);
        };
        const onEscapeKey = (event) => {
            this.overlayVisible && this.hide(true);
            event.preventDefault();
        };
        const onTabKey = (event) => {
            if (this.focusedOptionInfo.index !== -1) {
                const processedOption = this.visibleOptions[this.focusedOptionInfo.index];
                const grouped = this.isProccessedOptionGroup(processedOption);

                !grouped && this.onOptionChange({ originalEvent: event, processedOption });
            }

            this.overlayVisible && this.hide();
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
            setDirty(false);
            props.onHide?.();
        };
        const onOverlayExited = () => {
            ZIndex.clear(overlayRef.current);
        };
        const alignOverlay = () => {
            utils_alignOverlay(overlayRef.current, elementRef.current, props.appendTo || $primereact.config.appendTo);
        };
        const isOptionMatched = (processedOption) => {
            return this.isValidOption(processedOption) && this.getProccessedOptionLabel(processedOption)?.toLocaleLowerCase(this.searchLocale).startsWith(this.searchValue.toLocaleLowerCase(this.searchLocale));
        };
        const isValidOption = (processedOption) => {
            return isNotEmpty(processedOption) && !this.isOptionDisabled(processedOption.option);
        };
        const isValidSelectedOption = (processedOption) => {
            return this.isValidOption(processedOption) && this.isSelected(processedOption);
        };
        const isSelected = (processedOption) => {
            return this.activeOptionPath.some((p) => p.key === processedOption.key);
        };
        const findFirstOptionIndex = () => {
            return this.visibleOptions.findIndex((processedOption) => this.isValidOption(processedOption));
        };
        const findLastOptionIndex = () => {
            return findLastIndex(this.visibleOptions, (processedOption) => this.isValidOption(processedOption));
        };
        const findNextOptionIndex = (index) => {
            const matchedOptionIndex = index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex((processedOption) => this.isValidOption(processedOption)) : -1;

            return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
        };
        const findPrevOptionIndex = (index) => {
            const matchedOptionIndex = index > 0 ? findLastIndex(this.visibleOptions.slice(0, index), (processedOption) => this.isValidOption(processedOption)) : -1;

            return matchedOptionIndex > -1 ? matchedOptionIndex : index;
        };
        const findSelectedOptionIndex = () => {
            return this.visibleOptions.findIndex((processedOption) => this.isValidSelectedOption(processedOption));
        };
        const findFirstFocusedOptionIndex = () => {
            const selectedIndex = this.findSelectedOptionIndex();

            return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
        };
        const findLastFocusedOptionIndex = () => {
            const selectedIndex = this.findSelectedOptionIndex();

            return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
        };
        const findOptionPathByValue = (value, processedOptions, level = 0) => {
            processedOptions = processedOptions || (level === 0 && this.processedOptions);

            if (!processedOptions) return null;
            if (isEmpty(value)) return [];

            for (let i = 0; i < processedOptions.length; i++) {
                const processedOption = processedOptions[i];

                if (equals(value, this.getOptionValue(processedOption.option), this.equalityKey)) {
                    return [processedOption];
                }

                const matchedOptions = this.findOptionPathByValue(value, processedOption.children, level + 1);

                if (matchedOptions) {
                    matchedOptions.unshift(processedOption);

                    return matchedOptions;
                }
            }
        };
        const searchOptions = (event, char) => {
            this.searchValue = (this.searchValue || '') + char;

            let optionIndex = -1;
            let matched = false;

            if (isNotEmpty(this.searchValue)) {
                if (this.focusedOptionInfo.index !== -1) {
                    optionIndex = this.visibleOptions.slice(this.focusedOptionInfo.index).findIndex((processedOption) => this.isOptionMatched(processedOption));
                    optionIndex = optionIndex === -1 ? this.visibleOptions.slice(0, this.focusedOptionInfo.index).findIndex((processedOption) => this.isOptionMatched(processedOption)) : optionIndex + this.focusedOptionInfo.index;
                } else {
                    optionIndex = this.visibleOptions.findIndex((processedOption) => this.isOptionMatched(processedOption));
                }

                if (optionIndex !== -1) {
                    matched = true;
                }

                if (optionIndex === -1 && this.focusedOptionInfo.index === -1) {
                    optionIndex = this.findFirstFocusedOptionIndex();
                }

                if (optionIndex !== -1) {
                    this.changeFocusedOptionIndex(event, optionIndex);
                }
            }

            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }

            this.searchTimeout = setTimeout(() => {
                this.searchValue = '';
                this.searchTimeout = null;
            }, 500);

            return matched;
        };
        const changeFocusedOptionIndex = (event, index) => {
            if (this.focusedOptionInfo.index !== index) {
                this.focusedOptionInfo.index = index;
                this.scrollInView();

                if (this.selectOnFocus) {
                    this.onOptionChange({ originalEvent: event, processedOption: this.visibleOptions[index], isHide: false });
                }
            }
        };
        const scrollInView = (index = -1) => {
            this.$nextTick(() => {
                const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
                const element = findSingle(this.list, `li[id="${id}"]`);

                if (element) {
                    element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
                }
            });
        };
        const autoUpdateModel = () => {
            if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption) {
                this.focusedOptionInfo.index = this.findFirstFocusedOptionIndex();
                this.onOptionChange({ processedOption: this.visibleOptions[this.focusedOptionInfo.index], isHide: false });

                !this.overlayVisible && (this.focusedOptionInfo = { index: -1, level: 0, parentKey: '' });
            }
        };
        const updateModel = (event, value) => {
            this.$emit('update:modelValue', value);
            this.$emit('change', { originalEvent: event, value });
        };
        const createProcessedOptions = (options, level = 0, parent = {}, parentKey = '') => {
            const processedOptions = [];

            options &&
                options.forEach((option, index) => {
                    const key = (parentKey !== '' ? parentKey + '_' : '') + index;
                    const newOption = {
                        option,
                        index,
                        level,
                        key,
                        parent,
                        parentKey
                    };

                    newOption['children'] = this.createProcessedOptions(this.getOptionGroupChildren(option, level), level + 1, newOption, key);
                    processedOptions.push(newOption);
                });

            return processedOptions;
        };

        // computed
        const hasSelectedOption = isNotEmpty(props.value);
        const label = React.useMemo(() => {
            const label = this.placeholder || 'p-emptylabel';

            if (this.hasSelectedOption) {
                const activeOptionPath = this.findOptionPathByValue(this.modelValue);
                const processedOption = isNotEmpty(activeOptionPath) ? activeOptionPath[activeOptionPath.length - 1] : null;

                return processedOption ? this.getOptionLabel(processedOption.option) : label;
            }

            return label;
        }, []);
        const processedOptions = createProcessedOptions(props.options || []);
        const visibleOptions = React.useMemo(() => {
            const processedOption = this.activeOptionPath.find((p) => p.key === this.focusedOptionInfo.parentKey);

            return processedOption ? processedOption.children : processedOptions;
        }, []);
        const equalityKey = props.optionValue ? null : props.dataKey;
        const searchResultMessageText = isNotEmpty(visibleOptions) ? searchMessageText.replaceAll('{0}', visibleOptions.length) : emptySearchMessageText;
        const searchMessageText = props.searchMessage || this.$primevue.config.locale.searchMessage || '';
        const emptySearchMessageText = this.emptySearchMessage || this.$primevue.config.locale.emptySearchMessage || '';
        const emptyMessageText = this.emptyMessage || this.$primevue.config.locale.emptyMessage || '';
        const selectionMessageText = this.selectionMessage || this.$primevue.config.locale.selectionMessage || '';
        const emptySelectionMessageText = this.emptySelectionMessage || this.$primevue.config.locale.emptySelectionMessage || '';
        const selectedMessageText = this.hasSelectedOption ? this.selectionMessageText.replaceAll('{0}', '1') : this.emptySelectionMessageText;
        const focusedOptionId = this.focusedOptionInfo.index !== -1 ? `${this.id}${isNotEmpty(this.focusedOptionInfo.parentKey) ? '_' + this.focusedOptionInfo.parentKey : ''}_${this.focusedOptionInfo.index}` : null;
        const hasFluid = isEmpty(this.fluid) ? !!this.$pcFluid : this.fluid;

        // effects

        return {
            state,
            // refs
            searchValue: toValue(searchValue),
            // element refs
            focusInputRef,
            overlayRef,
            listRef,
            // methods
            getOptionLabel,
            getOptionValue,
            isOptionDisabled,
            getOptionGroupLabel,
            getOptionGroupChildren,
            isOptionGroup,
            getProccessedOptionLabel,
            isProccessedOptionGroup,
            show,
            hide,
            onFocus,
            onBlur,
            onKeyDown,
            onOptionChange,
            onOptionFocusChange,
            onOptionSelect,
            onOptionGroupSelect,
            onContainerClick,
            onOverlayClick,
            onOverlayKeyDown,
            onOverlayEnter,
            onOverlayEntered,
            onOverlayExit,
            onOverlayExited,
            alignOverlay,
            isOptionMatched,
            isValidOption,
            isValidSelectedOption,
            isSelected,
            findSelectedOptionIndex,
            findOptionPathByValue,
            searchOptions,
            changeFocusedOptionIndex,
            scrollInView,
            autoUpdateModel,
            updateModel,
            // computed
            hasSelectedOption,
            label,
            processedOptions,
            visibleOptions,
            equalityKey,
            searchResultMessageText,
            searchMessageText,
            emptySearchMessageText,
            emptyMessageText,
            selectionMessageText,
            emptySelectionMessageText,
            selectedMessageText,
            focusedOptionId,
            hasFluid
        };
    },
    defaultProps,
    style
);
