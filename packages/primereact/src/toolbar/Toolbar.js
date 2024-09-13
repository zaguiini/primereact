import { ComponentProvider } from '@primereact/core/component';
import { useMergeProps } from '@primereact/hooks';
import * as React from 'react';
import { PrimeReactContext } from '../api/Api';
import { ObjectUtils, classNames } from '../utils/Utils';
import { useToolbar } from './Toolbar.base';
import { ToolbarBase } from './ToolbarBase';

export const Toolbar = React.memo(
    React.forwardRef((inProps, inRef) => {
        const toolbar = useToolbar(inProps, inRef);
        const { props, ptm, ptmi, cx, ref } = toolbar;

        const mergeProps = useMergeProps();
        const context = React.useContext(PrimeReactContext);
        const props = ToolbarBase.getProps(inProps, context);
        const elementRef = React.useRef(null);
        const start = ObjectUtils.getJSXElement(props.left || props.start, props);
        const center = ObjectUtils.getJSXElement(props.center, props);
        const end = ObjectUtils.getJSXElement(props.right || props.end, props);
        const { ptm, cx, isUnstyled } = ToolbarBase.setMetaData({
            props
        });

        useHandleStyle(ToolbarBase.css.styles, isUnstyled, { name: 'toolbar' });

        React.useImperativeHandle(ref, () => ({
            props,
            getElement: () => elementRef.current
        }));

        const startProps = mergeProps(
            {
                className: cx('start')
            },
            ptm('start')
        );

        const centerProps = mergeProps(
            {
                className: cx('center')
            },
            ptm('center')
        );

        const endProps = mergeProps(
            {
                className: cx('end')
            },
            ptm('end')
        );

        const rootProps = mergeProps(
            {
                id: props.id,
                ref: elementRef,
                style: props.style,
                className: classNames(props.className, cx('root')),
                role: 'toolbar'
            },
            ToolbarBase.getOtherProps(props),
            ptm('root')
        );

        return (
            <ComponentProvider value={toolbar}>
                <div {...rootProps}>
                    <div {...startProps}>{start}</div>
                    <div {...centerProps}>{center}</div>
                    <div {...endProps}>{end}</div>
                </div>
            </ComponentProvider>
        );
    })
);

Toolbar.displayName = 'Toolbar';
