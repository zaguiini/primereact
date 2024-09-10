import { useComponent, withComponent } from '@primereact/core/component';
import { classNames, isEmpty } from '@primeuix/utils';

export const useIcon = withComponent((props, attrs, ref) => {
    const { isUnstyled } = useComponent({ props }, ref);

    const pti = () => {
        const isLabelEmpty = isEmpty(props.label);

        return {
            ...(!isUnstyled && {
                className: classNames([
                    'p-icon',
                    {
                        'p-icon-spin': props.spin
                    }
                ])
            }),
            role: !isLabelEmpty ? 'img' : undefined,
            'aria-label': !isLabelEmpty ? props.label : undefined,
            'aria-hidden': isEmpty(attrs.tabIndex) && isLabelEmpty,
            ...attrs
        };
    };

    return {
        pti
    };
}, {});
