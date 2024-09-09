import { classNames, resolve } from '@primeuix/utils';
import * as React from 'react';

export default class IconUtils {
    static getJSXIcon(icon, iconProps = {}, options = {}) {
        let content = null;

        if (icon !== null) {
            const iconType = typeof icon;
            const className = classNames(iconProps.className, iconType === 'string' && icon);

            content = <span {...iconProps} className={className} />;

            if (iconType !== 'string') {
                const defaultContentOptions = {
                    iconProps: iconProps,
                    element: content,
                    ...options
                };

                return resolve(icon, defaultContentOptions);
            }
        }

        return content;
    }
}
