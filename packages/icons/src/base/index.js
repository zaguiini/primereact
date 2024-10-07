import { useComponent, withComponent } from '@primereact/core/component';
import { classNames, isEmpty, isNotEmpty, isString, mergeProps, resolve } from '@primeuix/utils';
import * as React from 'react';

const style = {
    name: 'icon',
    css: `
.p-icon {
    display: inline-block;
    vertical-align: baseline;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
    `
};

export const useIcon = withComponent(
    ({ props, attrs, ref }) => {
        const instance = useComponent({ props, attrs, style }, ref);

        const pti = () => {
            const isLabelEmpty = isEmpty(props.label);

            return mergeProps(
                {
                    ...(!instance.isUnstyled && {
                        className: classNames([
                            'p-icon',
                            {
                                'p-icon-spin': props.spin
                            }
                        ])
                    }),
                    role: !isLabelEmpty ? 'img' : undefined,
                    'aria-label': !isLabelEmpty ? props.label : undefined,
                    'aria-hidden': isEmpty(attrs.tabIndex) && isLabelEmpty
                },
                attrs
            );
        };

        return {
            ...instance,
            pti
        };
    },
    { spin: false }
);

export const Icon = React.forwardRef((inProps, inRef) => {
    // @todo
    const icon = useIcon(inProps, inRef); // const context = React.useContext(ComponentContext) || {};

    if (inProps.pIf === false) return null;

    const { as, pIf, instance = icon, children, options = {}, className, ...rest } = inProps || {};
    const IconComponent = isString(as) ? <i /> : resolve(as, { ...rest, ...options }, instance);

    if (React.isValidElement(IconComponent)) {
        return React.cloneElement(IconComponent, {
            className: classNames(className, isString(as) && as),
            ...rest
        });
    }

    return isNotEmpty(IconComponent) ? <IconComponent /> : null;
});
