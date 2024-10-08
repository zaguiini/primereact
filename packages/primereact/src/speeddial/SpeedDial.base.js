import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/speeddial';
import { $dt } from '@primeuix/styled';
import { find, findSingle, focus, isAttributeNotEquals } from '@primeuix/utils';
import { defaultProps } from './SpeedDial.props';

export const useSpeedDial = withComponent(
    ({ elementRef, props }) => {
        // states
        const [visibleState, setVisibleState] = React.useState(false);
        const [focused, setFocused] = React.useState(false);
        const [focusedOptionIndex, setFocusedOptionIndex] = React.useState(-1);
        const visible = props.onVisibleChange ? props.visible : visibleState;
        const state = {
            visible,
            focused,
            focusedOptionIndex
        };

        // refs
        const isItemClicked = React.useRef(false);

        // element refs
        const listRef = React.useRef(null);

        // bindings
        useEventListener({
            type: 'click',
            listener: (event) => {
                if (!isItemClicked.current && isOutsideClicked(event)) {
                    hide();
                }

                isItemClicked.current = false;
            },
            when: props.hideOnClickOutside && visible
        });

        // methods
        const show = () => {
            props.onVisibleChange ? props.onVisibleChange(true) : setVisibleState(true);
            props.onShow?.();
        };
        const hide = () => {
            props.onVisibleChange ? props.onVisibleChange(false) : setVisibleState(false);
            props.onHide?.();
        };
        const onFocus = () => {
            setFocused(true);
        };
        const onBlur = () => {
            setFocused(false);
            setFocusedOptionIndex(-1);
        };
        const onClick = (event) => {
            visible ? hide() : show();
            props.onClick?.(event);

            isItemClicked.current = true;
        };
        const onItemClick = (event, item) => {
            item.command?.({ originalEvent: event, item });
            hide();

            isItemClicked.current = true;
            event.preventDefault();
        };
        const onKeyDown = (event) => {
            switch (event.code) {
                case 'ArrowDown':
                    onArrowDown(event);
                    break;

                case 'ArrowUp':
                    onArrowUp(event);
                    break;

                case 'ArrowLeft':
                    onArrowLeft(event);
                    break;

                case 'ArrowRight':
                    onArrowRight(event);
                    break;

                case 'Enter':
                case 'NumpadEnter':
                case 'Space':
                    onEnterKey(event);
                    break;

                case 'Escape':
                    onEscapeKey(event);
                    break;

                case 'Home':
                    onHomeKey(event);
                    break;

                case 'End':
                    onEndKey(event);
                    break;

                default:
                    break;
            }
        };
        const onTogglerKeydown = (event) => {
            switch (event.code) {
                case 'ArrowDown':
                case 'ArrowLeft':
                    onTogglerArrowDown(event);

                    break;

                case 'ArrowUp':
                case 'ArrowRight':
                    onTogglerArrowUp(event);

                    break;

                case 'Escape':
                    onEscapeKey();

                    break;

                default:
                    break;
            }
        };
        const onTogglerArrowUp = (event) => {
            setFocused(true);
            focus(listRef.current);

            show();
            navigatePrevItem(event);

            event.preventDefault();
        };
        const onTogglerArrowDown = (event) => {
            setFocused(true);
            focus(listRef.current);

            show();
            navigateNextItem(event);

            event.preventDefault();
        };
        const onEnterKey = (event) => {
            const items = find(elementRef.current, '[data-pc-section="menuitem"]');
            const itemIndex = [...items].findIndex((item) => item.id === focusedOptionIndex);
            const buttonEl = findSingle(elementRef.current, 'button');

            onItemClick(event, props.options[itemIndex]);
            onBlur(event);

            buttonEl && focus(buttonEl);
        };
        const onEscapeKey = () => {
            hide();

            const buttonEl = findSingle(elementRef.current, 'button');

            buttonEl && focus(buttonEl);
        };
        const onArrowUp = (event) => {
            const direction = props.direction;

            if (direction === 'up') {
                navigateNextItem(event);
            } else if (direction === 'down') {
                navigatePrevItem(event);
            } else {
                navigateNextItem(event);
            }
        };
        const onArrowDown = (event) => {
            const direction = props.direction;

            if (direction === 'up') {
                navigatePrevItem(event);
            } else if (direction === 'down') {
                navigateNextItem(event);
            } else {
                navigatePrevItem(event);
            }
        };
        const onArrowLeft = (event) => {
            const direction = props.direction;
            const leftValidDirections = ['left', 'up-right', 'down-left'];
            const rightValidDirections = ['right', 'up-left', 'down-right'];

            if (leftValidDirections.includes(direction)) {
                navigateNextItem(event);
            } else if (rightValidDirections.includes(direction)) {
                navigatePrevItem(event);
            } else {
                navigatePrevItem(event);
            }
        };
        const onArrowRight = (event) => {
            const direction = props.direction;
            const leftValidDirections = ['left', 'up-right', 'down-left'];
            const rightValidDirections = ['right', 'up-left', 'down-right'];

            if (leftValidDirections.includes(direction)) {
                navigatePrevItem(event);
            } else if (rightValidDirections.includes(direction)) {
                navigateNextItem(event);
            } else {
                navigateNextItem(event);
            }
        };
        const onEndKey = (event) => {
            event.preventDefault();

            setFocusedOptionIndex(-1);
            navigatePrevItem(event, -1);
        };
        const onHomeKey = (event) => {
            event.preventDefault();

            setFocusedOptionIndex(-1);
            navigateNextItem(event, -1);
        };
        const navigateNextItem = (event, index = null) => {
            const optionIndex = findNextOptionIndex(index || focusedOptionIndex);

            changeFocusedOptionIndex(optionIndex);

            event.preventDefault();
        };
        const navigatePrevItem = (event, index = null) => {
            const optionIndex = findPrevOptionIndex(index || focusedOptionIndex);

            changeFocusedOptionIndex(optionIndex);

            event.preventDefault();
        };
        const changeFocusedOptionIndex = (index) => {
            const items = find(elementRef.current, '[data-pc-section="menuitem"]');
            const filteredItems = [...items].filter((item) => isAttributeNotEquals(findSingle(item, 'a'), 'data-p-disabled', true));

            if (filteredItems[index]) {
                setFocusedOptionIndex(filteredItems[index].getAttribute('id'));
            }
        };
        const findPrevOptionIndex = (index) => {
            const items = find(elementRef.current, '[data-pc-section="menuitem"]');
            const filteredItems = [...items].filter((item) => isAttributeNotEquals(findSingle(item, 'a'), 'data-p-disabled', true));
            const newIndex = index === -1 ? filteredItems[filteredItems.length - 1].id : index;
            let matchedOptionIndex = filteredItems.findIndex((link) => link.getAttribute('id') === newIndex);

            matchedOptionIndex = index === -1 ? filteredItems.length - 1 : matchedOptionIndex - 1;

            return matchedOptionIndex;
        };
        const findNextOptionIndex = (index) => {
            const items = find(elementRef.current, '[data-pc-section="menuitem"]');
            const filteredItems = [...items].filter((item) => isAttributeNotEquals(findSingle(item, 'a'), 'data-p-disabled', true));
            const newIndex = index === -1 ? filteredItems[0].id : index;
            let matchedOptionIndex = filteredItems.findIndex((link) => link.getAttribute('id') === newIndex);

            matchedOptionIndex = index === -1 ? 0 : matchedOptionIndex + 1;

            return matchedOptionIndex;
        };
        const isOutsideClicked = (event) => {
            return elementRef.current && !(elementRef.current.isSameNode(event.target) || elementRef.current.contains(event.target));
        };
        const isItemActive = (id) => {
            return focusedOptionIndex === id;
        };
        const focusedOptionId = () => {
            return focusedOptionIndex !== -1 ? focusedOptionIndex : null;
        };
        const calculateTransitionDelay = (index) => {
            const length = props.options.length;

            return (visible ? index : length - index - 1) * props.transitionDelay;
        };
        const calculatePointStyle = (index) => {
            const type = props.type;

            if (type !== 'linear') {
                const length = props.options.length;
                const radius = props.radius || length * 20;

                if (type === 'circle') {
                    const step = (2 * Math_PI) / length;

                    return {
                        left: `calc(${radius * Math.cos(step * index)}px + ${$dt('item.diff.x', '0px').variable})`,
                        top: `calc(${radius * Math.sin(step * index)}px + ${$dt('item.diff.y', '0px').variable})`
                    };
                } else if (type === 'semi-circle') {
                    const direction = props.direction;
                    const step = Math_PI / (length - 1);
                    const x = `calc(${radius * Math.cos(step * index)}px + ${$dt('item.diff.x', '0px').variable})`;
                    const y = `calc(${radius * Math.sin(step * index)}px + ${$dt('item.diff.y', '0px').variable})`;

                    if (direction === 'up') {
                        return { left: x, bottom: y };
                    } else if (direction === 'down') {
                        return { left: x, top: y };
                    } else if (direction === 'left') {
                        return { right: y, top: x };
                    } else if (direction === 'right') {
                        return { left: y, top: x };
                    }
                } else if (type === 'quarter-circle') {
                    const direction = props.direction;
                    const step = Math_PI / (2 * (length - 1));
                    const x = `calc(${radius * Math.cos(step * index)}px + ${$dt('item.diff.x', '0px').variable})`;
                    const y = `calc(${radius * Math.sin(step * index)}px + ${$dt('item.diff.y', '0px').variable})`;

                    if (direction === 'up-left') {
                        return { right: x, bottom: y };
                    } else if (direction === 'up-right') {
                        return { left: x, bottom: y };
                    } else if (direction === 'down-left') {
                        return { right: y, top: x };
                    } else if (direction === 'down-right') {
                        return { left: y, top: x };
                    }
                }
            }

            return {};
        };

        // effects
        useMountEffect(() => {
            if (props.type !== 'linear') {
                const button = findSingle(elementRef.current, '[data-pc-name="pcbutton"]');
                const firstItem = findSingle(listRef.current, '[data-pc-section="item"]');

                if (button && firstItem) {
                    const wDiff = Math.abs(button.offsetWidth - firstItem.offsetWidth);
                    const hDiff = Math.abs(button.offsetHeight - firstItem.offsetHeight);

                    listRef.current.style.setProperty($dt('item.diff.x').name, `${wDiff / 2}px`);
                    listRef.current.style.setProperty($dt('item.diff.y').name, `${hDiff / 2}px`);
                }
            }
        });

        return {
            state,
            // element refs
            listRef,
            // methods
            show,
            hide,
            onFocus,
            onBlur,
            onClick,
            onItemClick,
            onKeyDown,
            onTogglerKeydown,
            isItemActive,
            focusedOptionId,
            calculateTransitionDelay,
            calculatePointStyle
        };
    },
    defaultProps,
    style
);
