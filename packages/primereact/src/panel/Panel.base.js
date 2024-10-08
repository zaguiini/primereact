import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/panel';
import { isString } from '@primeuix/utils';
import * as React from 'react';
import { defaultProps } from './Panel.props';

export const usePanel = withComponent(
    ({ props }) => {
        const [collapsedState, setCollapsedState] = React.useState(props.collapsed);
        const collapsed = props.toggleable ? (props.onToggle ? props.collapsed : collapsedState) : false;
        const state = {
            collapsed
        };

        // element refs
        const contentRef = React.useRef(null);

        // methods
        const toggle = (event) => {
            if (!props.toggleable) {
                return;
            }

            collapsed ? expand(event) : collapse(event);

            props.onToggle?.({
                originalEvent: event,
                value: !collapsed
            });
        };
        const expand = (event) => {
            if (!props.onToggle) {
                setCollapsedState(false);
            }

            props.onExpand?.(event);
        };
        const collapse = (event) => {
            if (!props.onToggle) {
                setCollapsedState(true);
            }

            props.onCollapse?.(event);
        };
        const onButtonClick = (event) => {
            toggle(event);
            event.preventDefault();
        };

        // computed
        const buttonAriaLabel = props.toggleButtonProps?.ariaLabel ? props.toggleButtonProps.ariaLabel : isString(props.header) && props.header;

        return {
            state,
            // element refs
            contentRef,
            // methods
            toggle,
            expand,
            collapse,
            onButtonClick,
            // computed
            buttonAriaLabel
        };
    },
    defaultProps,
    style
);
