import { isNotEmpty } from '@primeuix/utils';

class PrimeStyleSheet {
    _styles;
    _attrs;
    constructor({ attrs } = {}) {
        this._styles = new Map();
        this._attrs = attrs || {};
    }
    add(key, css) {
        if (isNotEmpty(css)) {
            const _attrs = Object.entries(this._attrs)
                .reduce((acc, [k, v]) => acc.push(`${k}="${v}"`) && acc, [])
                .join(' ');

            this._styles.set(key, {
                css,
                tag: `<style ${_attrs} data-primereact-style-id="${key}">${css}</style>`,
                element: (
                    <style {...this._attrs} data-primereact-style-id={key} key={key}>
                        {css}
                    </style>
                )
            });
        }
    }
    update() {
        // @todo
    }
    delete(key) {
        this._styles.delete(key);
    }
    clear() {
        this._styles.clear();
    }
    get(key) {
        return this._styles.get(key);
    }
    getAllCSS() {
        return [...this._styles.values()].map((style) => style.css).filter(String);
    }
    getAllTags() {
        return [...this._styles.values()].map((style) => style.tag).filter(String);
    }
    getAllElements() {
        return [...this._styles.values()].map((style) => style.element);
    }
    has(key) {
        return this._styles.has(key);
    }
}

export default PrimeStyleSheet;
