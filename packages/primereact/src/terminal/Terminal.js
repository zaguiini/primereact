import { Component, ComponentProvider } from '@primereact/core/component';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';
import { useTerminal } from './Terminal.base';

export const Terminal = React.memo(
    React.forwardRef((inProps, inRef) => {
        const terminal = useTerminal(inProps, inRef);
        const {
            id,
            props,
            state,
            ptm,
            ptmi,
            cx,
            // element refs
            elementRef,
            inputRef,
            // methods
            onClick,
            onInputChange,
            onInputKeyDown
        } = terminal;

        const promptProps = mergeProps(
            {
                className: cx('promptLabel')
            },
            ptm('prompt')
        );

        const createPromptContainer = () => {
            const commandTextProps = mergeProps(
                {
                    value: state.commandText,
                    type: 'text',
                    className: cx('promptValue'),
                    autoComplete: 'off',
                    onChange: onInputChange,
                    onKeyDown: onInputKeyDown
                },
                ptm('commandText')
            );

            const containerProps = mergeProps(
                {
                    className: cx('prompt')
                },
                ptm('container')
            );

            return (
                <div {...containerProps}>
                    <span {...promptProps}>{props.prompt}</span>
                    <input {...commandTextProps} ref={inputRef} />
                </div>
            );
        };

        const createCommand = (command, index) => {
            const { text, response } = command;
            const key = text + '_' + index;
            const responseProps = mergeProps(
                {
                    className: cx('commandResponse'),
                    'aria-live': 'polite'
                },
                ptm('response')
            );
            const commandProps = mergeProps(
                {
                    className: cx('commandValue')
                },
                ptm('command')
            );
            const commandsProps = mergeProps({ className: cx('command') }, ptm('commands'));

            return (
                <div {...commandsProps} key={key}>
                    <span {...promptProps}>{props.prompt}</span>
                    <span {...commandProps}>{text}</span>
                    <div {...responseProps}>{response}</div>
                </div>
            );
        };

        const createContent = () => {
            const content = state.commands.map(createCommand);
            const contentProps = mergeProps(
                {
                    className: cx('commandList')
                },
                ptm('content')
            );

            return <div {...contentProps}>{content}</div>;
        };

        const createWelcomeMessage = () => {
            if (props.welcomeMessage) {
                const welcomeMessageProps = mergeProps(
                    {
                        className: cx('welcomeMessage')
                    },
                    ptm('welcomeMessage')
                );

                return <div {...welcomeMessageProps}>{props.welcomeMessage}</div>;
            }

            return null;
        };

        const welcomeMessage = createWelcomeMessage();
        const content = createContent();
        const prompt = createPromptContainer();

        const rootProps = mergeProps(
            {
                id,
                className: cx('root'),
                onClick
            },
            ptmi('root')
        );

        return (
            <ComponentProvider pIf={props.pIf} value={terminal}>
                <Component as={props.as || 'div'} {...rootProps} ref={elementRef}>
                    {welcomeMessage}
                    {content}
                    {prompt}
                </Component>
            </ComponentProvider>
        );
    })
);

Terminal.displayName = 'Terminal';
