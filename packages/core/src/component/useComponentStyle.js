import { PrimeReactContext } from '@primereact/core/config';
import { Theme, ThemeService } from '@primeuix/styled';
import { classNames, setAttribute, uuid } from '@primeuix/utils';
import { getKeyValue } from '@primeuix/utils/object';
import * as React from 'react';
import { ComponentContext } from './Component.context';
import { withComponentStyle } from './withComponentStyle';

const Base = {
    _loadedStyleNames: new Set(),
    getLoadedStyleNames() {
        return this._loadedStyleNames;
    },
    isStyleNameLoaded(name) {
        return this._loadedStyleNames.has(name);
    },
    setLoadedStyleName(name) {
        this._loadedStyleNames.add(name);
    },
    deleteLoadedStyleName(name) {
        this._loadedStyleNames.delete(name);
    },
    clearLoadedStyleNames() {
        this._loadedStyleNames.clear();
    }
};

// @todo: use @primereact/styles/base
const BaseStyle = {
    theme: ({ dt }) => `
* {
    box-sizing: border-box;
}

/* Non vue overlay animations */
.p-connected-overlay {
    opacity: 0;
    transform: scaleY(0.8);
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-visible {
    opacity: 1;
    transform: scaleY(1);
}

.p-connected-overlay-hidden {
    opacity: 0;
    transform: scaleY(1);
    transition: opacity 0.1s linear;
}

/* Vue based overlay animations */
.p-connected-overlay-enter-from {
    opacity: 0;
    transform: scaleY(0.8);
}

.p-connected-overlay-leave-to {
    opacity: 0;
}

.p-connected-overlay-enter-active {
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-leave-active {
    transition: opacity 0.1s linear;
}

/* Toggleable Content */
.p-toggleable-content-enter-from,
.p-toggleable-content-leave-to {
    max-height: 0;
}

.p-toggleable-content-enter-to,
.p-toggleable-content-leave-from {
    max-height: 1000px;
}

.p-toggleable-content-leave-active {
    overflow: hidden;
    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);
}

.p-toggleable-content-enter-active {
    overflow: hidden;
    transition: max-height 1s ease-in-out;
}

.p-disabled,
.p-disabled * {
    cursor: default;
    pointer-events: none;
    user-select: none;
}

.p-disabled,
.p-component:disabled {
    opacity: ${dt('disabled.opacity')};
}

.pi {
    font-size: ${dt('icon.size')};
}

.p-icon {
    width: ${dt('icon.size')};
    height: ${dt('icon.size')};
}

.p-overlay-mask {
    background: ${dt('mask.background')};
    color: ${dt('mask.color')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-overlay-mask-enter {
    animation: p-overlay-mask-enter-animation ${dt('mask.transition.duration')} forwards;
}

.p-overlay-mask-leave {
    animation: p-overlay-mask-leave-animation ${dt('mask.transition.duration')} forwards;
}

@keyframes p-overlay-mask-enter-animation {
    from {
        background: transparent;
    }
    to {
        background: ${dt('mask.background')};
    }
}
@keyframes p-overlay-mask-leave-animation {
    from {
        background: ${dt('mask.background')};
    }
    to {
        background: transparent;
    }
}
`,

    css: ({ dt }) => `
.p-hidden-accessible {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.p-hidden-accessible input,
.p-hidden-accessible select {
    transform: scale(0);
}

.p-overflow-hidden {
    overflow: hidden;
    padding-right: ${dt('scrollbar.width')};
}
`,
    classes: {},
    inlineStyles: {}
};

function useCSS(cssMap = {}) {
    const config = React.useContext(PrimeReactContext);

    if (typeof window === 'undefined') {
        /*Object.entries(cssMap).forEach(([key, value]) => {
            config?.sheet?.add(key, value.css);
        });*/
    }

    React.useInsertionEffect(() => {
        config?.sheet?._styles?.forEach((value, key) => {
            const styleElement = document.head.querySelector(`style[data-primereact-style-id="${key}"]`) || document.createElement('style');

            if (!styleElement.isConnected) {
                //setAttributes(styleElement, value.styleOptions);
                value.first ? document.head.prepend(styleElement) : document.head.appendChild(styleElement);
                setAttribute(styleElement, 'data-primereact-style-id', key);
                //styleRef.current.onload = (event: React.ReactEventHandler<HTMLStyleElement>) => onStyleLoaded?.(event, { name: styleNameRef.current });
                //onStyleMounted?.(styleNameRef.current);
            }

            styleElement.textContent = value.css;
        });
    });
    //return rule;
}

export const useComponentStyle = withComponentStyle(({ props, attrs, state, style, $style }, ref) => {
    const config = React.useContext(PrimeReactContext);
    const parent = React.useContext(ComponentContext);
    const name = props.__TYPE;
    // @todo
    const instance = {
        ref,
        name,
        props,
        attrs,
        state,
        parent
    };
    // @todo
    const $params = {
        instance: ref,
        props,
        state,
        attrs,
        parent
    };

    // computed values
    const $isUnstyled = React.useMemo(() => (props.unstyled !== undefined ? props.unstyled : config?.unstyled), [props, config]);
    const $attrSelector = React.useMemo(() => uuid('pc'), []);
    const $styleOptions = React.useMemo(() => ({ nonce: config?.csp?.nonce }), [config]);

    const _loadStyles = () => {
        const _load = () => {
            _loadGlobalStyles();
            _loadThemeStyles();
        };

        _load();
        //_themeChangeListener(_load);
    };

    const _loadCoreStyles = () => {
        const _load = () => {
            if (!Base.isStyleNameLoaded('base')) {
                $style.loadCSS(BaseStyle.css, { name: 'base' });
                Base.setLoadedStyleName('base');
            }

            if (!Base.isStyleNameLoaded(style?.name) && style?.name) {
                $style.loadCSS(style.css);
                Base.setLoadedStyleName(style.name);
            }
        };

        _load();
        //_themeChangeListener(_load);
    };

    const _loadGlobalStyles = () => {
        /*
         * @todo Add self custom css support;
         * <Panel :pt="{ css: `...` }" .../>
         *
         * const selfCSS = this._getPTClassValue(this.pt, 'css', this.$params);
         * const defaultCSS = this._getPTClassValue(this.defaultPT, 'css', this.$params);
         * const mergedCSS = mergeProps(selfCSS, defaultCSS);
         * isNotEmpty(mergedCSS?.class) && this.$css.loadCustomStyle(mergedCSS?.class);
         */
        //const globalCSS = this._useGlobalPT(this._getOptionValue, 'global.css', this.$params);
        //isNotEmpty(globalCSS) && BaseStyle.load(globalCSS, { name: 'global', ...this.$styleOptions });
    };

    const _loadThemeStyles = () => {
        if ($isUnstyled) return;

        // common
        if (!Theme.isStyleNameLoaded('common')) {
            const { primitive, semantic } = $style?.getCommonTheme() || {}; // @todo

            $style.load(primitive?.css, { name: 'primitive-variables' });
            $style.load(semantic?.css, { name: 'semantic-variables' });
            $style._loadTheme(BaseStyle?.theme, { name: 'global-style' }); // @todo

            Theme.setLoadedStyleName('common');
        }

        // component
        if (!Theme.isStyleNameLoaded(style?.name) && style?.name) {
            const { css } = $style?.getComponentTheme?.() || {};

            $style?.load(css, { name: `${style?.name}-variables` });
            $style?.loadTheme({ name: `${style?.name}-style` });

            Theme.setLoadedStyleName(style?.name);
        }

        // layer order
        if (!Theme.isStyleNameLoaded('layer-order')) {
            const layerOrder = $style?.getLayerOrderThemeCSS?.();

            $style.load(layerOrder, { name: 'layer-order', first: true });

            Theme.setLoadedStyleName('layer-order');
        }
    };

    const _themeChangeListener = (callback = () => {}) => {
        Base.clearLoadedStyleNames();
        ThemeService.on('theme:change', callback);
    };

    if (!$isUnstyled) {
        _loadCoreStyles();
        _loadStyles();
    }

    useCSS();

    // exposed methods
    const cx = (key = '', params = {}) => {
        return !$isUnstyled ? classNames(getKeyValue(style.classes, key, { ...$params, ...params })) : undefined;
    };

    const sx = (key = '', when = true, params = {}) => {
        if (when) {
            const self = getKeyValue(style.inlineStyles, key, { ...$params, ...params });
            const base = {}; //getKeyValue(BaseComponentStyle.inlineStyles, key, { ...this.$params, ...params }); // @todo

            return { ...base, ...self };
        }

        return undefined;
    };

    return {
        cx,
        sx,
        isUnstyled: $isUnstyled
    };
});
