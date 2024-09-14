import { ComponentProvider } from '@primereact/core/component';
import * as React from 'react';
import { classNames, ObjectUtils } from '../utils/Utils';
import { useFloatLabel } from './FloatLabel.base';
import { FloatLabelBase } from './FloatLabelBase';

export const FloatLabel = React.memo(
    React.forwardRef((inProps, inRef) => {
        const floatlabel = useFloatLabel(inProps, inRef);
        const { props, ptm, ptmi, cx, ref } = floatlabel;

        const elementRef = React.useRef(ref);

        React.useEffect(() => {
            ObjectUtils.combinedRefs(elementRef, ref);
        }, [elementRef, ref]);

        const rootProps = mergeProps(
            {
                ref: elementRef,
                className: classNames(cx('root'))
            },
            FloatLabelBase.getOtherProps(props),
            ptm('root')
        );

        return (
            <ComponentProvider value={floatlabel}>
                <span {...rootProps}>{props.children}</span>
            </ComponentProvider>
        );
    })
);

FloatLabel.displayName = 'FloatLabel';
