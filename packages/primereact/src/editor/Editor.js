import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useEditor } from './Editor.base';

export const Editor = React.memo(
    React.forwardRef((inProps, inRef) => {
        const editor = useEditor(inProps, inRef);
        const {
            props,
            ptm,
            ptmi,
            cx,
            id,
            // element refs
            elementRef,
            contentRef,
            toolbarRef
        } = editor;

        const createToolbarHeader = () => {
            const toolbarProps = mergeProps(
                {
                    ref: toolbarRef,
                    className: cx('toolbar')
                },
                ptm('toolbar')
            );

            if (props.showHeader === false) {
                return null;
            } else if (props.headerTemplate) {
                return <div {...toolbarProps}>{props.headerTemplate}</div>;
            }

            const getMergeProps = (params, key) => mergeProps(params, ptm(key));

            const formatsProps = mergeProps({ className: 'ql-formats' }, ptm('formats'));

            return (
                <div {...toolbarProps}>
                    <span {...formatsProps}>
                        <select {...getMergeProps({ className: 'ql-header', defaultValue: '0' }, 'header')}>
                            <option {...getMergeProps({ value: '1' }, 'option')}>Heading</option>
                            <option {...getMergeProps({ value: '2' }, 'option')}>Subheading</option>
                            <option {...getMergeProps({ value: '0' }, 'option')}>Normal</option>
                        </select>
                        <select {...getMergeProps({ className: 'ql-font' }, 'font')}>
                            <option {...getMergeProps(undefined, 'option')} />
                            <option {...getMergeProps({ value: 'serif' }, 'option')} />
                            <option {...getMergeProps({ value: 'monospace' }, 'option')} />
                        </select>
                    </span>
                    <span {...formatsProps}>
                        <button {...getMergeProps({ type: 'button', className: 'ql-bold', 'aria-label': 'Bold' }, 'bold')} />
                        <button {...getMergeProps({ type: 'button', className: 'ql-italic', 'aria-label': 'Italic' }, 'italic')} />
                        <button {...getMergeProps({ type: 'button', className: 'ql-underline', 'aria-label': 'Underline' }, 'underline')} />
                    </span>
                    <span {...formatsProps}>
                        <select {...getMergeProps({ className: 'ql-color' }, 'color')} />
                        <select {...getMergeProps({ className: 'ql-background' }, 'background')} />
                    </span>
                    <span {...formatsProps}>
                        <button {...getMergeProps({ type: 'button', className: 'ql-list', value: 'ordered', 'aria-label': 'Ordered List' }, 'list')} />
                        <button {...getMergeProps({ type: 'button', className: 'ql-list', value: 'bullet', 'aria-label': 'Unordered List' }, 'list')} />
                        <select {...getMergeProps({ className: 'ql-align' }, 'select')}>
                            <option {...getMergeProps({ defaultValue: true }, 'option')} />
                            <option {...getMergeProps({ value: 'center' }, 'option')} />
                            <option {...getMergeProps({ value: 'right' }, 'option')} />
                            <option {...getMergeProps({ value: 'justify' }, 'option')} />
                        </select>
                    </span>
                    <span {...formatsProps}>
                        <button {...getMergeProps({ type: 'button', className: 'ql-link', 'aria-label': 'Insert Link' }, 'link')} />
                        <button {...getMergeProps({ type: 'button', className: 'ql-image', 'aria-label': 'Insert Image' }, 'image')} />
                        <button {...getMergeProps({ type: 'button', className: 'ql-code-block', 'aria-label': 'Insert Code Block' }, 'codeBlock')} />
                    </span>
                    <span {...formatsProps}>
                        <button {...getMergeProps({ type: 'button', className: 'ql-clean', 'aria-label': 'Remove Styles' }, 'clean')} />
                    </span>
                </div>
            );
        };

        const createContent = () => {
            const contentProps = mergeProps(
                {
                    className: cx('content')
                },
                ptm('content')
            );

            return <div {...contentProps} ref={contentRef} />;
        };

        const header = createToolbarHeader();
        const content = createContent();

        const rootProps = mergeProps(
            {
                id,
                className: cx('root')
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={editor}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {header}
                    {content}
                </Component>
            </ComponentProvider>
        );
    })
);

Editor.displayName = 'Editor';
