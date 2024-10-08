import { Component, ComponentProvider } from '@primereact/core/component';
import { Icon } from '@primereact/icons/base';
import { MinusIcon } from '@primereact/icons/minus';
import { PlusIcon } from '@primereact/icons/plus';
import { classNames, resolve } from '@primeuix/utils';
import { Button } from 'primereact/button';
import * as React from 'react';
import { useSpeedDial } from './SpeedDial.base';

export const SpeedDial = React.memo(
    React.forwardRef((inProps, inRef) => {
        const speeddial = useSpeedDial(inProps, inRef);
        const {
            id,
            props,
            state,
            ptm,
            ptmi,
            cx,
            // element refs
            elementRef,
            listRef,
            // methods
            onFocus,
            onBlur,
            onClick,
            onItemClick,
            onKeyDown,
            onTogglerKeydown,
            isItemActive,
            calculateTransitionDelay,
            calculatePointStyle
        } = speeddial;

        const listId = id + '_list';

        const getPTOptions = (id, key) => {
            return ptm(key, {
                context: {
                    active: isItemActive(id),
                    hidden: !state.visible
                }
            });
        };

        const getItemStyle = (index) => {
            const transitionDelay = calculateTransitionDelay(index);
            const pointStyle = calculatePointStyle(index);

            return {
                transitionDelay: `${transitionDelay}ms`,
                ...pointStyle
            };
        };

        const createMask = () => {
            if (props.mask) {
                const maskProps = mergeProps(
                    {
                        style: props.maskStyle,
                        className: classNames(cx('mask'), props.maskClassName)
                    },
                    ptm('mask')
                );

                return <div {...maskProps} />;
            }

            return null;
        };

        const createItem = (item, index) => {
            if (!isItemVisible(item)) {
                return null;
            }

            const itemId = `${id}_${index}`;
            const icon = <Icon as={props.itemIconTemplate || item.icon} options={{ item, index }} {...getPTOptions(itemId, 'actionIcon')} />;
            const content = resolve(props.itemTemplate, { item, index, toggleCallback: (event) => onItemClick(event, item) }, speeddial) || (
                <Button
                    className={classNames(cx('pcAction', { item }))}
                    icon={icon}
                    tabIndex={-1}
                    disabled={props.disabled}
                    unstyled={props.unstyled}
                    tooltip={item.label}
                    tooltipOptions={{ ...props.tooltipOptions, ...{ disabled: !props.tooltipOptions } }}
                    role="menuitem"
                    aria-label={item.label}
                    onClick={(event) => onItemClick(event, item)}
                    {...props.actionButtonProps}
                    pt={getPTOptions(itemId, 'pcAction')}
                />
            );

            const itemProps = mergeProps(
                {
                    id: itemId,
                    style: getItemStyle(index),
                    className: cx('item', { id: listId }),
                    role: 'none',
                    'data-p-active': isItemActive(listId)
                },
                getPTOptions(listId, 'item')
            );

            return (
                <li {...itemProps} key={itemId}>
                    {content}
                </li>
            );
        };

        const createItems = () => {
            return props.options ? props.options.map(createItem) : null;
        };

        const createList = () => {
            const items = createItems();

            const listProps = mergeProps(
                {
                    id: listId,
                    style: sx('list'),
                    className: cx('list'),
                    tabIndex: '-1',
                    role: 'menu',
                    'aria-activedescendant': state.focused ? focusedOptionId() : undefined,
                    onFocus,
                    onKeyDown,
                    onBlur
                },
                ptm('list')
            );

            return (
                <ul {...listProps} ref={listRef}>
                    {items}
                </ul>
            );
        };

        const createDefaultButton = () => {
            const showIconVisible = (!state.visible && !!props.showIcon) || !props.hideIcon;
            const hideIconVisible = state.visible && !!props.hideIcon;
            const icon = <Icon as={showIconVisible ? props.showIcon || <PlusIcon /> : hideIconVisible ? props.hideIcon || <MinusIcon /> : null} {...ptm('pcButton')?.['icon']} />;

            return (
                <Button
                    style={props.buttonStyle}
                    className={classNames(cx('pcButton'), props.buttonClassName)}
                    disabled={props.disabled}
                    icon={icon}
                    aria-expanded={state.visible}
                    aria-haspopup={true}
                    aria-controls={listId}
                    aria-label={props.ariaLabel}
                    aria-labelledby={props.ariaLabelledby}
                    unstyled={props.unstyled}
                    onClick={onClick}
                    onKeyDown={onTogglerKeydown}
                    {...buttonProps}
                    pt={ptm('pcButton')}
                />
            );
        };

        const createButton = () => {
            return resolve(props.buttonTemplate, { onClick, visible: state.visible }, speeddial) || createDefaultButton();
        };

        const button = createButton();
        const list = createList();
        const mask = createMask();

        const rootProps = mergeProps(
            {
                id,
                style: sx('root'),
                className: cx('root')
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={speeddial}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {button}
                    {list}
                </Component>
                {mask}
            </ComponentProvider>
        );
    })
);

SpeedDial.displayName = 'SpeedDial';
