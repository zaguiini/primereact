import { withComponent } from '@primereact/core/component';
import { style } from '@primereact/styles/terminal';
import { focus, toValue } from '@primeuix/utils';
import { TerminalService } from 'primereact/terminalservice';
import * as React from 'react';
import { defaultProps } from './Terminal.props';

export const useTerminal = withComponent(
    () => {
        // states
        const [commandText, setCommandText] = React.useState('');
        const [commands, setCommands] = React.useState([]);
        const [index, setIndex] = React.useState(0);
        const [emittedText, setEmittedText] = React.useState('');
        const state = {
            commandText,
            commands,
            index,
            emittedText
        };

        // refs
        const isEmitted = React.useRef(false);

        // element refs
        const inputRef = React.useRef(null);

        // methods
        const onClick = () => {
            focus(inputRef.current);
        };
        const onInputChange = (event) => {
            setCommandText(event.target.value);
        };
        const onInputKeyDown = (event) => {
            switch (event.code) {
                case 'ArrowUp':
                    if (commands && commands.length) {
                        const prevIndex = index - 1 < 0 ? commands.length - 1 : index - 1;
                        const command = commands[prevIndex];

                        setIndex(prevIndex);
                        setCommandText(command.text);
                    }

                    break;

                case 'Enter':
                case 'NumpadEnter':
                    if (commandText) {
                        let newCommands = [...commands];

                        newCommands.push({ text: commandText });

                        setIndex((prevIndex) => prevIndex + 1);
                        setCommandText('');
                        setCommands(newCommands);
                        setEmittedText(commandText);
                        isEmitted.current = true;
                    }

                    break;

                default:
                    break;
            }
        };

        // effects
        React.useEffect(() => {
            const response = (res) => {
                if (commands && commands.length > 0) {
                    let commands = [...commands];

                    commands[commands.length - 1].response = res;

                    setCommands(commands);
                }
            };

            const clear = () => {
                setCommands([]);
                setIndex(0);
            };

            TerminalService.on('response', response);
            TerminalService.on('clear', clear);

            return () => {
                TerminalService.off('response', response);
                TerminalService.off('clear', clear);
            };
        }, [commands]);

        React.useEffect(() => {
            if (isEmitted.current) {
                TerminalService.emit('command', emittedText);
                isEmitted.current = false;
            }

            ref.current.scrollTop = ref.current.scrollHeight;
        });

        return {
            state,
            // refs
            isEmitted: toValue(isEmitted),
            // element refs
            inputRef,
            // methods
            onClick,
            onInputChange,
            onInputKeyDown
        };
    },
    defaultProps,
    style
);
