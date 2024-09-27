import { Component, ComponentProvider } from '@primereact/core/component';
import { classNames, focus, mergeProps } from '@primeuix/utils';
import { TerminalService } from 'primereact/terminalservice';
import * as React from 'react';
import { useTerminal } from './Terminal.base';

export const Terminal = React.memo(
    React.forwardRef((inProps, inRef) => {
        const [commandTextState, setCommandTextState] = React.useState('');
        const [commandsState, setCommandsState] = React.useState([]);
        const [indexState, setIndexState] = React.useState(0);
        const [emittedTextState, setEmittedTextState] = React.useState('');
        const state = {
            commandText: commandTextState,
            commands: commandsState,
            index: indexState,
            emittedText: emittedTextState
        };

        const terminal = useTerminal(inProps, inRef, state);
        const { props, ptm, ptmi, cx, ref } = terminal;

        const inputRef = React.useRef(null);
        const isEmitted = React.useRef(false);

        const promptProps = mergeProps(
            {
                className: cx('promptLabel')
            },
            ptm('prompt')
        );

        const onClick = () => {
            focus(inputRef.current);
        };

        const onInputChange = (event) => {
            setCommandTextState(event.target.value);
        };

        const onInputKeyDown = (event) => {
            switch (event.code) {
                case 'ArrowUp':
                    if (commandsState && commandsState.length) {
                        const prevIndex = indexState - 1 < 0 ? commandsState.length - 1 : indexState - 1;
                        const command = commandsState[prevIndex];

                        setIndexState(prevIndex);
                        setCommandTextState(command.text);
                    }

                    break;

                case 'Enter':
                case 'NumpadEnter':
                    if (commandTextState) {
                        let newCommands = [...commandsState];

                        newCommands.push({ text: commandTextState });

                        setIndexState((prevIndex) => prevIndex + 1);
                        setCommandTextState('');
                        setCommandsState(newCommands);
                        setEmittedTextState(commandTextState);
                        isEmitted.current = true;
                    }

                    break;

                default:
                    break;
            }
        };

        React.useEffect(() => {
            const response = (res) => {
                if (commandsState && commandsState.length > 0) {
                    let commands = [...commandsState];

                    commands[commands.length - 1].response = res;

                    setCommandsState(commands);
                }
            };

            const clear = () => {
                setCommandsState([]);
                setIndexState(0);
            };

            TerminalService.on('response', response);
            TerminalService.on('clear', clear);

            return () => {
                TerminalService.off('response', response);
                TerminalService.off('clear', clear);
            };
        }, [commandsState]);

        React.useEffect(() => {
            if (isEmitted.current) {
                TerminalService.emit('command', emittedTextState);
                isEmitted.current = false;
            }

            ref.current.scrollTop = ref.current.scrollHeight;
        });

        const createPromptContainer = () => {
            const commandTextProps = mergeProps(
                {
                    ref: inputRef,
                    value: commandTextState,
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
                    <input {...commandTextProps} />
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
            const content = commandsState.map(createCommand);
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
                id: props.id,
                ref,
                style: props.style,
                className: classNames(cx('root'), props.className),
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
