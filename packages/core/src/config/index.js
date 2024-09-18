'use client'; // @todo: remove this
import { FilterMatchMode } from '@primereact/core/api';
import { Theme } from '@primeuix/styled';
import React, { useState } from 'react';

export const PrimeReactContext = React.createContext();

// @todo: remove this
export { default as PrimeStyleSheet } from './PrimeStyleSheet';

export const PrimeReactProvider = (props) => {
    const propsValue = props.value || {};

    const [theme, setTheme] = useState(propsValue.theme);
    const [ripple, setRipple] = useState(propsValue.ripple || false);
    const [inputStyle, setInputStyle] = useState(propsValue.inputStyle); // @todo: remove this
    const [inputVariant, setInputVariant] = useState(propsValue.inputVariant);
    const [locale, setLocale] = useState(propsValue.locale || 'en');
    const [appendTo, setAppendTo] = useState(propsValue.appendTo || null);
    const [styleContainer, setStyleContainer] = useState(propsValue.styleContainer || null);
    const [cssTransition, setCssTransition] = useState(propsValue.cssTransition || true);
    const [autoZIndex, setAutoZIndex] = useState(propsValue.autoZIndex || true);
    const [hideOverlaysOnDocumentScrolling, setHideOverlaysOnDocumentScrolling] = useState(propsValue.hideOverlaysOnDocumentScrolling || false);
    const [nonce, setNonce] = useState(propsValue.nonce || null);
    const [nullSortOrder, setNullSortOrder] = useState(propsValue.nullSortOrder || 1);
    const [zIndex, setZIndex] = useState(
        propsValue.zIndex || {
            modal: 1100,
            overlay: 1000,
            menu: 1000,
            tooltip: 1100,
            toast: 1200
        }
    );
    const [ptOptions, setPtOptions] = useState(
        propsValue.ptOptions || {
            mergeSections: true,
            mergeProps: true
        }
    );
    const [pt, setPt] = useState(propsValue.pt || undefined);
    const [unstyled, setUnstyled] = useState(propsValue.unstyled || false);
    const [filterMatchModeOptions, setFilterMatchModeOptions] = useState(
        propsValue.filterMatchModeOptions || {
            text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
            numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
            date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
        }
    );

    const changeTheme = (currentTheme, newTheme, linkElementId, callback) => {
        const linkElement = document.getElementById(linkElementId);

        if (!linkElement) {
            throw Error(`Element with id ${linkElementId} not found.`);
        }

        const newThemeUrl = linkElement.getAttribute('href').replace(currentTheme, newTheme);
        const newLinkElement = document.createElement('link');

        newLinkElement.setAttribute('rel', 'stylesheet');
        newLinkElement.setAttribute('id', linkElementId);
        newLinkElement.setAttribute('href', newThemeUrl);
        newLinkElement.addEventListener('load', () => {
            if (callback) {
                callback();
            }
        });

        linkElement.parentNode?.replaceChild(newLinkElement, linkElement);
    };

    React.useEffect(() => {
        if (propsValue.theme) {
            setTheme(propsValue.theme);
        }
    }, [propsValue.theme]);

    Theme.setTheme(theme);

    const value = {
        theme,
        setTheme,
        changeTheme,
        ripple,
        setRipple,
        inputStyle,
        setInputStyle,
        inputVariant,
        setInputVariant,
        locale,
        setLocale,
        appendTo,
        setAppendTo,
        styleContainer,
        setStyleContainer,
        cssTransition,
        setCssTransition,
        autoZIndex,
        setAutoZIndex,
        hideOverlaysOnDocumentScrolling,
        setHideOverlaysOnDocumentScrolling,
        nonce,
        setNonce,
        nullSortOrder,
        setNullSortOrder,
        zIndex,
        setZIndex,
        ptOptions,
        setPtOptions,
        pt,
        setPt,
        filterMatchModeOptions,
        setFilterMatchModeOptions,
        unstyled,
        setUnstyled,
        sheet: props.sheet
    };

    return <PrimeReactContext.Provider value={value}>{props.children}</PrimeReactContext.Provider>;
};
