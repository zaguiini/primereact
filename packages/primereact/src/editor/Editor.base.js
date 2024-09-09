import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/editor';
import { defaultProps } from './Editor.props';

export const useEditor = createSafeComponent(defaultProps, style);
